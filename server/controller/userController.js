// import User from "../models/user.model.js";
// import { Webhook } from 'svix'
// export const clerkWebhooks = async (req, res) => {
//     try {
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         await whook.verify(JSON.stringify(req.body), {
//             "svix-id": req.headers["svix-id"],
//             "svix-timestamp": req.headers["svix-timestamp"],
//             "svix-signature": req.headers["svix-signature"]
//         });

//         const { data, type } = req.body;

//         switch(type) {
//             case "user.created": {
//                 const userData = {
//                     clerkUserId: data.id,
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     imageUrl: data.image_url
//                 }

//                 await User.create(userData);
//                 res.json({})
//                 break
//             }

//             case "user.updated": {
//                  const userData = {
//                     email: data.email_addresses[0].email_address,
//                     firstName: data.first_name,
//                     lastName: data.last_name,
//                     imageUrl: data.image_url
//                 }

//                 await User.findByIdAndUpdate({ clerkUserId: data.id }, userData);
//                 res.json({})
//                 break;
//             }

//             case "user.deleted": {
//                 await User.findOneAndDelete({ clerkUserId: data.id });
//                 res.json({});
//                 break;
//             }

//             default: 
//                 break;
//         }
//     } catch (error) {
//         res.status(400).json({error: error.message});
//     }
// }




import User from "../models/user.model.js";
import { Webhook } from "svix";

export const clerkWebhooks = async (req, res) => {
  try {
    // Validate environment variable
    if (!process.env.CLERK_WEBHOOK_SECRET) {
      throw new Error("CLERK_WEBHOOK_SECRET is not defined");
    }

    // Verify webhook
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);
    await whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    // Extract type and data
    const { data, type } = req.body;

    // Validate required fields
    if (!data?.id || !data?.email_addresses?.length) {
      return res.status(400).json({ error: "Invalid webhook data" });
    }

    console.log(`Received webhook: ${type}, User ID: ${data.id}`);

    switch (type) {
      case "user.created": {
        try {
          // Check for existing user
          const existingUser = await User.findOne({ clerkUserId: data.id });
          if (existingUser) {
            return res.json({ status: "user already exists" });
          }

          const userData = {
            clerkUserId: data.id,
            email: data.email_addresses[0].email_address,
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            imageUrl: data.image_url || "",
          };
          await User.create(userData);
          return res.json({ status: "success" });
        } catch (err) {
          console.error("Error creating user:", err);
          return res.status(500).json({ error: "Failed to create user" });
        }
      }

      case "user.updated": {
        try {
          const userData = {
            email: data.email_addresses[0].email_address,
            firstName: data.first_name || "",
            lastName: data.last_name || "",
            imageUrl: data.image_url || "",
          };
          const updatedUser = await User.findOneAndUpdate(
            { clerkUserId: data.id },
            userData,
            { new: true }
          );
          if (!updatedUser) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.json({ status: "success" });
        } catch (err) {
          console.error("Error updating user:", err);
          return res.status(500).json({ error: "Failed to update user" });
        }
      }

      case "user.deleted": {
        try {
          const deletedUser = await User.findOneAndDelete({ clerkUserId: data.id });
          if (!deletedUser) {
            return res.status(404).json({ error: "User not found" });
          }
          return res.json({ status: "success" });
        } catch (err) {
          console.error("Error deleting user:", err);
          return res.status(500).json({ error: "Failed to delete user" });
        }
      }

      default:
        return res.status(400).json({ error: "Unknown webhook type" });
    }
  } catch (error) {
    console.error("Webhook error:", error);
    if (error.name === "WebhookVerificationError") {
      return res.status(401).json({ error: "Invalid webhook signature" });
    }
    return res.status(500).json({ error: "Internal server error" });
  }
};
import React, { useState } from "react";
import { Button } from "./ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from "./ui/dialog";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs";

export default function AuthComponent() {
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    imageUrl: "",
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      const file = files[0];
      try {
        const imageUrl = URL.createObjectURL(file);
        setFormData((prevData) => ({
          ...prevData,
          imageUrl,
        }));
        setUploadedImage(file);
        e.target.value = "";
      } catch (error) {
        console.error("Error creating object URL:", error);
      }
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant={"outline"}>Login</Button>
      </DialogTrigger>
      <DialogContent>
        <Tabs defaultValue="login" className="m-5">
          <TabsList className="w-full">
            <TabsTrigger value="login" className="">
              Log In
            </TabsTrigger>
            <TabsTrigger value="signup" className="">
              Sign Up
            </TabsTrigger>
          </TabsList>
          <TabsContent value="login">
            <div className="py-4">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Sign in to Prodexa AI</h2>
                <p className="text-sm text-muted-foreground">
                  Please enter your credentials to log in.
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleLoginSubmit}>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" placeholder="Enter your email.." required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password" className="mt-2">
                    Password
                  </Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password.."
                    required
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    Log In
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </TabsContent>
          <TabsContent value="signup">
            <div className="py-2">
              <div className="mb-4">
                <h2 className="text-xl font-semibold">Create an account</h2>
                <p className="text-sm text-muted-foreground">
                  Enter your email below to create your account.
                </p>
              </div>
              <form className="space-y-4" onSubmit={handleSignupSubmit}>
                <div className="flex justify-center">
                  <input
                    type="file"
                    id="fileInput"
                    name="imageUrl"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <label
                    htmlFor="fileInput"
                    className="cursor-pointer w-24 h-24 rounded-full border-2 border-dashed border-gray-400 flex items-center justify-center transition duration-300 ease-in-out hover:bg-gray-100"
                    aria-label="Upload Image"
                  >
                    {uploadedImage ? (
                      <img
                        src={formData.imageUrl}
                        alt="Uploaded"
                        className="w-full h-full object-cover rounded-full"
                      />
                    ) : (
                      <span className="text-gray-400 text-center">
                        Upload Image
                      </span>
                    )}
                  </label>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="firstName">FirstName</Label>
                  <Input id="firstName" placeholder="Enter your FirstName.." required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="lastName">LastName</Label>
                  <Input id="lastName" placeholder="Enter your LastName.." required />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email.."
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password.."
                    required
                  />
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">
                    Sign Up
                  </Button>
                </DialogFooter>
              </form>
            </div>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

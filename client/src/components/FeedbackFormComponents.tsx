import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { MessageSquareText } from "lucide-react";
import { Textarea } from "./ui/textarea";

export default function FeedbackFormComponents() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <MessageSquareText className="h-4 w-4" />
          Feedback Form
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Feedback Form</DialogTitle>
          <DialogDescription>
            Please provide your feedback below.
          </DialogDescription>
        </DialogHeader>
        <form>
          <div className="flex flex-col gap-4">
            <Label htmlFor="feedback">Feedback</Label>
            <Textarea
              rows={10}
              id="feedback"
              placeholder="Your feedback here..."
              className="mb-4"
            />
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

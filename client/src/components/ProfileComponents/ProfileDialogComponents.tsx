import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useAppSelector } from "@/hooks/hooks";
import type { ReactNode } from "react";
import { Button } from "../ui/button";


interface ProfileDialogComponentsProps {
  triggerButton: ReactNode;
}

export default function ProfileDialogComponents({ triggerButton }: ProfileDialogComponentsProps) {
  const { user } = useAppSelector((state) => state.auth);
  return (
     <Dialog>
      <DialogTrigger asChild>
        {triggerButton}
      </DialogTrigger>
      <DialogContent className="bg-[#212126] md:min-w-3xl sm:min-w-xl">
        <DialogHeader>
          <DialogTitle>
            Profile Details
          </DialogTitle>
          <DialogDescription>
            User profile information and update options.
          </DialogDescription>
        </DialogHeader>
        <div>
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <img className="w-16 h-16 rounded-full border-2 shadow-2xl" src={user?.imageUrl || ""} alt="User Profile Picture"/>
              <div>
                <h3 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h3>
                <p className="text-sm text-muted-foreground">{user?.email}</p>
              </div>
            </div>
            <Button variant={"outline"}>
              Edit Profile
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

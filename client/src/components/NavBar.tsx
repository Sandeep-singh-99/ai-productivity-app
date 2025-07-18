import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import { LayoutDashboard } from "lucide-react";
import { BrainCircuit } from "lucide-react";
import AuthComponent from "./AuthComponent";
import { useAppSelector } from "@/hooks/hooks";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function NavBar() {
  const { isAuthenticated, user } = useAppSelector((state) => state.auth);
  return (
    <header className="fixed top-0 w-full border-b bg-background/80 backdrop-blur-md z-50 supports-[backdrop-filter]:bg-background/60">
      <nav className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to={"/"}>
          <span className="bg-clip-text font-bold text-2xl flex items-center gap-2">
            <BrainCircuit /> Prodexa AI
          </span>
        </Link>

        <div className="flex flex-row items-center space-x-2 md:space-x-4">
          <Link to={"/home/dashboard"}>
            <Button variant={"outline"} className="md:flex">
              <LayoutDashboard className="h-4 w-4" />
              <span className="hidden md:block">Dashboard Insights</span>
            </Button>
          </Link>

         {
          isAuthenticated ? (
            <div>
              <Avatar>
                <AvatarImage src={user?.imageUrl || ""} alt="User Avatar" />
                <AvatarFallback>CN</AvatarFallback>
              </Avatar>
            </div>
          ) : (
             <AuthComponent />
          )
         }
        </div>
      </nav>
    </header>
  );
}

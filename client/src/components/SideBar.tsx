import { useState } from "react";
import {
  BrainCircuit,
  Eraser,
  FilePen,
  Hash,
  Home,
  Image,
  LayoutDashboard,
  Scissors,
  ScrollText,
  UsersRound,
} from "lucide-react";
import { Link } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { Button } from "./ui/button";

const SideBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      {/* Mobile Sidebar */}
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button variant="outline" className="md:hidden m-4">
            <LayoutDashboard className="h-5 w-5" />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[250px]">
          <DashboardSidebar closeSheet={() => setIsOpen(false)} />
        </SheetContent>
      </Sheet>
      <div className="hidden md:block h-screen w-[250px] border-r bg-background">
        <DashboardSidebar />
      </div>
    </div>
  );
};

export default SideBar;

function DashboardSidebar({ closeSheet }: { closeSheet?: () => void }) {
  return (
    <div className="h-full px-4 py-6">
      <div className="flex items-center gap-2 mb-8 px-2">
        <Link to={"/"} className="flex items-center gap-2">
          <BrainCircuit />
          <span className="text-xl font-bold">Prodexa AI</span>
        </Link>
      </div>
      <nav className="space-y-1">
        {/* Navigation Links */}
        {/* Home Link */}
        <Link to={"/home/dashboard"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Home className="mr-2 h-4 w-4" />
            Dashboard
          </Button>
        </Link>

        {/* Article Link */}
        <Link to={"/home/article"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <FilePen className="mr-2 h-4 w-4" />
            Write Articles
          </Button>
        </Link>

        {/* Blog Link */}
        <Link to={"/home/blog"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Hash className="mr-2 h-4 w-4" />
            Blog Titles
          </Button>
        </Link>

        {/* Generate Image Link */}
        <Link to={"/home/g-image"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Image className="mr-2 h-4 w-4" />
            Generate Image
          </Button>
        </Link>

        {/* Remove Background Link */}
        <Link to={"/home/r-background"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Eraser className="mr-2 h-4 w-4" />
            Remove Background
          </Button>
        </Link>

        {/* Remove Object Link */}
        <Link to={"/home/r-object"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <Scissors className="mr-2 h-4 w-4" />
            Remove Object
          </Button>
        </Link>

        {/* Resume Link */}
        <Link to={"/home/resume"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <ScrollText className="mr-2 h-4 w-4" />
            Review Resume
          </Button>
        </Link>

        {/* Community Link */}
        <Link to={"/home/community"}>
          <Button
            variant="ghost"
            className="w-full justify-start"
            onClick={closeSheet}
          >
            <UsersRound className="mr-2 h-4 w-4" />
            Community
          </Button>
        </Link>
      </nav>
    </div>
  );
}

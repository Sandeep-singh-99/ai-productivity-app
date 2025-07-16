import { ModeToggle } from "./components/mode-toggle";
import { Button } from "./components/ui/button";


export default function App() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold">Hello, Tailwind CSS!</h1>
      <Button>
        Click Me
      </Button>
      <ModeToggle />
    </div>
  )
}

import { NotebookPen, Sparkles } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export default function ResumeForm() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 mr-2" size={52} />
        <h2 className="text-lg font-semibold">Resume Review</h2>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mb-5">
          <Label className="font-semibold">Upload Resume</Label>
          <div className="flex flex-col space-y-2">
            <Input type="file" accept="application/pdf"  />
            <p className="text-sm text-muted-foreground">Supports PDF resume only.</p>
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="" variant={"outline"}>
          <NotebookPen className="h-4 w-4 mr-2" />
          Resume Review
        </Button>
      </CardFooter>
    </Card>
  );
}

import { Sparkles, SquarePen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function BlogForm() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 mr-2" size={52} />
        <h2 className="text-lg font-semibold">Blog Configuration</h2>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mb-5">
          <Label className="font-semibold">Blog Topic</Label>
          <Textarea placeholder="The future of artificial intelligence is..." />
        </div>

        <div className="space-y-4">
          <Label className="font-semibold text-lg">Category</Label>
          <Select>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectLabel>Categories</SelectLabel>
                <SelectItem value="technology">Technology</SelectItem>
                <SelectItem value="health">Health</SelectItem>
                <SelectItem value="lifestyle">Lifestyle</SelectItem>
                <SelectItem value="finance">Finance</SelectItem>
                <SelectItem value="travel">Travel</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="" variant={"outline"}>
          <SquarePen className="h-4 w-4 mr-2" />
          Generate Blog
        </Button>
      </CardFooter>
    </Card>
  );
}

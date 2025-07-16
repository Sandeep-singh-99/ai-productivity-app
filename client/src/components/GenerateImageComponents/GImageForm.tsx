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

export default function GImageForm() {
  return (
    <Card className="w-full h-full">
      <CardHeader className="flex items-center space-x-2">
        <Sparkles className="h-4 w-4 mr-2" size={52} />
        <h2 className="text-lg font-semibold">AI Image Generation</h2>
      </CardHeader>

      <CardContent>
        <div className="space-y-4 mb-5">
          <Label className="font-semibold">Describe Your Image</Label>
          <Textarea placeholder="Describe what your want to see in the image..." />
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
                <SelectItem value="realistic">Realistic</SelectItem>
                <SelectItem value="anime">Anime Style</SelectItem>
                <SelectItem value="cartoon">Cartoon Style</SelectItem>
                <SelectItem value="3d">3D Style</SelectItem>
                <SelectItem value="fantasy">Fantasy Style</SelectItem>
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

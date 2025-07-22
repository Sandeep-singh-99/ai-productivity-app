import { Sparkles, SquarePen } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "../ui/card";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import { Button } from "../ui/button";


export default function ArticleForm() {
  return (
    <Card className="w-full h-full">
        <CardHeader className="flex items-center space-x-2">
            <Sparkles className="h-4 w-4 mr-2" size={52} />
            <h2 className="text-lg font-semibold">Article Configuration</h2>
        </CardHeader>
        <form>
        <CardContent className="mb-5">
           <div className="space-y-4">
             <Label className="font-semibold">Article Topic</Label>
            <Textarea rows={5} placeholder="The future of artificial intelligence is..."/>
           </div>
        </CardContent>

        <CardFooter>
            <Button className="" variant={"outline"}>
                <SquarePen className="h-4 w-4 mr-2" />
                Generate Article
            </Button>
        </CardFooter>
        </form>
    </Card>
  )
}

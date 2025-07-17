import { NotebookIcon } from "lucide-react";
import { Card, CardContent, CardHeader } from "../ui/card";


export default function ResumeView() {
  return (
    <Card className="h-96 w-full">
        <CardHeader className="flex items-center space-x-2">
            <NotebookIcon className="h-4 w-4 mr-2" />
            <h2 className="text-lg font-semibold">Analysis Results</h2>
        </CardHeader>

        <CardContent className="h-screen">
            <div className="flex flex-col items-center justify-center h-full space-y-4">
                <NotebookIcon className="h-10 w-10" />
                <p>Upload a resume and click "Resume Review" to get started</p>
            </div>
        </CardContent>
    </Card>
  )
}

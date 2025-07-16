import {
  FileText,
  NotebookPen,
  FileCheck2,
  ImagePlus,
  ImageMinus,
  FileSearch2,
} from "lucide-react";

export const features = [
  {
    icon: <FileText className="w-10 h-10 mb-4 text-primary" />,
    title: "AI Article Generator",
    description:
      "Generate structured and informative articles on any topic using advanced LLMs.",
  },
  {
    icon: <NotebookPen className="w-10 h-10 mb-4 text-primary" />,
    title: "AI Blog Writer",
    description:
      "Create engaging blog posts tailored to your audience, tone, and intent.",
  },
  {
    icon: <FileCheck2 className="w-10 h-10 mb-4 text-primary" />,
    title: "Resume Review & Optimization",
    description:
      "Get expert-level feedback on your resume to improve clarity, formatting, and ATS compatibility.",
  },
  {
    icon: <ImagePlus className="w-10 h-10 mb-4 text-primary" />,
    title: "AI Image Generator",
    description:
      "Turn simple text prompts into high-quality visuals using generative AI.",
  },
  {
    icon: <ImageMinus className="w-10 h-10 mb-4 text-primary" />,
    title: "Image Background Remover",
    description:
      "Automatically remove image backgrounds to create clean and transparent assets.",
  },
  {
    icon: <FileSearch2 className="w-10 h-10 mb-4 text-primary" />,
    title: "PDF Summarizer",
    description:
      "Upload long PDFs and get concise, meaningful summaries in seconds.",
  },
];

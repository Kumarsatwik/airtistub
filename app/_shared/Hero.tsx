"use client";
import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Search,
  Sparkles,
  CheckSquare,
  Activity,
  ShoppingBag,
  Code,
  BookOpen,
  TrendingUp,
  Loader,
} from "lucide-react";

import TextareaAutosize from "react-textarea-autosize";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { ChevronRight } from "lucide-react";

import { cn } from "@/lib/utils";
import { AnimatedGradientText } from "@/components/ui/animated-gradient-text";
import { suggestions } from "@/lib/constant";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import axios from "axios";
import { v7 as uuidv7 } from "uuid";
import { toast } from "sonner";
const iconMap = {
  CheckSquare,
  Activity,
  ShoppingBag,
  Code,
  BookOpen,
  TrendingUp,
} as const;

const colorVariants = [
  "bg-purple-50 text-purple-700 border-purple-100 hover:bg-purple-100",
  "bg-blue-50 text-blue-700 border-blue-100 hover:bg-blue-100",
  "bg-green-50 text-green-700 border-green-100 hover:bg-green-100",
  "bg-orange-50 text-orange-700 border-orange-100 hover:bg-orange-100",
  "bg-pink-50 text-pink-700 border-pink-100 hover:bg-pink-100",
  "bg-indigo-50 text-indigo-700 border-indigo-100 hover:bg-indigo-100",
];

export function AnimatedGradientTextDemo() {
  return (
    <div className="group relative mx-auto flex items-center justify-center rounded-full px-4 py-1.5 shadow-[inset_0_-8px_10px_#8fdfff1f] transition-shadow duration-500 ease-out hover:shadow-[inset_0_-5px_10px_#8fdfff3f]">
      <span
        className={cn(
          "animate-gradient absolute inset-0 block h-full w-full rounded-[inherit] bg-gradient-to-r from-[#ffaa40]/50 via-[#9c40ff]/50 to-[#ffaa40]/50 bg-[length:300%_100%] p-[1px]"
        )}
        style={{
          WebkitMask:
            "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          WebkitMaskComposite: "destination-out",
          mask: "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
          maskComposite: "subtract",
          WebkitClipPath: "padding-box",
        }}
      />
      🚀{" "}
      <AnimatedGradientText className="text-sm font-medium">
        AI-Powered UI Generation
      </AnimatedGradientText>
      <ChevronRight className="ml-1 size-4 stroke-neutral-500 transition-transform duration-300 ease-in-out group-hover:translate-x-0.5" />
    </div>
  );
}

const Hero = () => {
  const [deviceType, setDeviceType] = useState<"mobile" | "website">("mobile");
  const [prompt, setPrompt] = useState("");
  const textareaRef = useRef<HTMLTextAreaElement | null>(null);
  const { user } = useUser();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const handleSuggestionClick = (
    nextPrompt: string,
    nextDevice: "mobile" | "website"
  ) => {
    setPrompt(nextPrompt);
    setDeviceType(nextDevice);
    requestAnimationFrame(() => textareaRef.current?.focus());
  };

  const onCreateProject = async () => {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (!prompt) {
      toast("Please enter a prompt before generating.");
      return;
    }
    setLoading(true);
    try {
      // create new project
      const result = await axios.post("/api/project", {
        userInput: prompt,
        deviceType,
        projectId: uuidv7(),
      });
      router.push(`/project/${result.data.result.projectId}`);
    } catch (error) {
      console.error("Error creating project:", error);
      toast.error("Failed to create project. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative pt-32 pb-20 px-4 md:px-10 overflow-hidden flex flex-col items-center z-10">
      {/* Grid Background */}
      <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"></div>

      {/* Decorative Floating Elements */}
      <div className="hidden lg:block absolute left-10 top-32 w-48 h-64 bg-gradient-to-br from-purple-100 to-indigo-100 rounded-xl rotate-[-6deg] shadow-lg border border-white/50 z-0"></div>
      <div className="hidden lg:block absolute left-28 bottom-20 w-40 h-52 bg-gradient-to-br from-pink-100 to-rose-100 rounded-xl rotate-[4deg] shadow-lg border border-white/50 z-0"></div>
      <div className="hidden lg:block absolute right-10 top-24 w-56 h-72 bg-gradient-to-br from-blue-100 to-cyan-100 rounded-xl rotate-[5deg] shadow-lg border border-white/50 z-0"></div>
      <div className="hidden lg:block absolute right-24 bottom-10 w-44 h-44 bg-gradient-to-br from-green-100 to-emerald-100 rounded-xl rotate-[-3deg] shadow-lg border border-white/50 z-0"></div>

      <AnimatedGradientTextDemo />
      {/* Main Content */}
      <div className="relative z-10 max-w-4xl w-full text-center space-y-8 mt-10">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
          Turn Words into{" "}
          <span className="relative inline-block text-gray-900">
            Beautiful UI
            <span className="absolute bottom-2 left-0 w-full h-4 bg-lime-300/60 -z-10 rotate-[-1deg] rounded-sm"></span>
          </span>{" "}
          with AI
        </h1>

        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto">
          Describe your design. Get stunning UI mockups instantly. Simple, fast,
          and magical.
        </p>

        {/* Search Bar */}
        <div className="flex flex-col gap-2 p-2 bg-white rounded-2xl shadow-xl border border-gray-100 max-w-2xl mx-auto w-full transition-all hover:shadow-2xl">
          <div className="flex items-center flex-1 w-full px-2">
            <Search className="w-5 h-5 text-gray-400 self-start mt-4" />
            <TextareaAutosize
              className="flex-1 w-full resize-none bg-transparent px-3 py-3 text-base outline-none text-gray-700 placeholder:text-gray-400 min-h-[80px] max-h-[200px]"
              placeholder="Describe your UI/UX design idea..."
              minRows={2}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              ref={textareaRef}
              aria-label="UI prompt"
            />
          </div>
          <div className="flex flex-col md:flex-row items-center justify-between gap-2 w-full px-2 pb-2">
            <div className="w-full md:w-auto">
              <Select
                value={deviceType}
                onValueChange={(value) =>
                  setDeviceType(value as "mobile" | "website")
                }
              >
                <SelectTrigger className="w-full md:w-[140px] border-none bg-gray-50 text-gray-600 font-medium focus:ring-0 shadow-none hover:bg-gray-100 transition-colors h-10">
                  <SelectValue placeholder="Select Device" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="mobile"> Mobile</SelectItem>
                  <SelectItem value="website">Website</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button
              className="bg-purple-600 hover:bg-purple-700 text-white h-11 px-8 rounded-xl shadow-md transition-transform hover:scale-105 w-full md:w-auto"
              onClick={onCreateProject}
              disabled={loading}
            >
              {loading ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  <Sparkles className="mr-2 h-4 w-4" />
                  Generate
                </>
              )}
            </Button>
          </div>
        </div>

        {/* Inspiration Tags */}
        <div className="flex flex-wrap items-center justify-center gap-3 text-sm text-gray-600 pt-4">
          <span className="font-medium">Need inspiration? Try these:</span>
          {suggestions.map((item, index) => {
            const IconComponent = iconMap[item.icon];
            return (
              <button
                key={item.id}
                type="button"
                onClick={() =>
                  handleSuggestionClick(
                    item.prompt,
                    item.device as "mobile" | "website"
                  )
                }
                title={item.description}
                className={`${
                  colorVariants[index % colorVariants.length]
                } px-4 py-1.5 rounded-full border transition-all duration-200 text-sm font-medium flex items-center gap-2 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-400/50 active:scale-[0.98]`}
              >
                <IconComponent className="w-4 h-4" />
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Hero;

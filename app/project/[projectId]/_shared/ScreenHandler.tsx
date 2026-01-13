import { Button } from "@/components/ui/button";
import { ScreenConfigType } from "@/type/types";
import { Code2Icon, Copy, Download, GripVertical } from "lucide-react";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import SyntaxHighlighter from "react-syntax-highlighter";
import { vs2015 } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { toast } from "sonner";
import { buildHtml, type Theme } from "@/lib/constant";
type Props = {
  screen: ScreenConfigType | undefined;
  theme: Theme | string | undefined;
  iframeRef: { current: HTMLIFrameElement | null };
};

const ScreenHandler = ({ screen, theme, iframeRef }: Props) => {
  const html = buildHtml(theme, screen?.code);

  const handleCopyCode = async () => {
    if (html) {
      await navigator.clipboard.writeText(html);
      toast.success("Code copied to clipboard");
    }
  };

  const waitForHtml2Canvas = async (win: Window, timeoutMs: number) => {
    const start = Date.now();
    while (Date.now() - start < timeoutMs) {
      if ("html2canvas" in (win as unknown as Record<string, unknown>)) return;
      await new Promise((r) => setTimeout(r, 50));
    }
  };

  const handleDownload = async () => {
    const iframe = iframeRef.current;
    if (!iframe) {
      toast.error("Preview not available");
      return;
    }

    const win = iframe.contentWindow;
    const doc = iframe.contentDocument;
    if (!win || !doc) {
      toast.error("Preview not available");
      return;
    }

    try {
      await waitForHtml2Canvas(win, 2000);
      const html2canvasFn = (win as unknown as { html2canvas?: unknown })
        .html2canvas;

      if (typeof html2canvasFn !== "function") {
        toast.error("Download renderer not ready");
        return;
      }

      const canvas = await (
        html2canvasFn as (
          el: HTMLElement,
          opts?: Record<string, unknown>
        ) => Promise<HTMLCanvasElement>
      )(doc.body, {
        backgroundColor: null,
        useCORS: true,
        allowTaint: true,
        scale: 2,
        windowWidth: doc.documentElement.scrollWidth,
        windowHeight: doc.documentElement.scrollHeight,
      });

      const dataUrl = canvas.toDataURL("image/png");
      const a = document.createElement("a");
      const base = screen?.screenName?.trim().replace(/\s+/g, "-") || "screen";
      a.download = `${base}.png`;
      a.href = dataUrl;
      a.click();
      toast.success("Downloaded image");
    } catch {
      toast.error("Failed to download image");
    }
  };

  return (
    <div className="flex items-center justify-between w-full">
      <div className="flex items-center gap-2">
        <GripVertical className="text-[var(--foreground)] h-6 w-6" />
        <h2 className="text-sm text-[var(--foreground)] font-bold ml-2">
          {screen?.screenName || "Screen"}
        </h2>
      </div>
      <div>
        <TooltipProvider>
          <div className="flex items-center gap-1">
            <Dialog>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Button
                      variant={"ghost"}
                      className="bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Code2Icon className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent>
                  <p>View Code</p>
                </TooltipContent>
              </Tooltip>
              <DialogContent className="max-w-4xl w-full max-h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2">
                    <Code2Icon className="h-5 w-5" />
                    HTML+TailwindCSS Code
                  </DialogTitle>
                  <DialogDescription>
                    Generated code for {screen?.screenName || "this screen"}
                  </DialogDescription>
                </DialogHeader>
                <div className="flex-1 overflow-auto rounded-md border bg-slate-900 p-4 min-h-[400px]">
                  <SyntaxHighlighter
                    language="html"
                    style={vs2015}
                    customStyle={{
                      fontSize: "12px",
                      margin: 0,
                      padding: 0,
                      background: "transparent",
                      fontFamily:
                        "ui-monospace, SFMono-Regular, 'SF Mono', Monaco, Inconsolata, 'Roboto Mono', 'Source Code Pro', monospace",
                    }}
                    codeTagProps={{
                      style: {
                        fontFamily: "inherit",
                      },
                    }}
                  >
                    {html || "No code available"}
                  </SyntaxHighlighter>
                </div>
                <DialogFooter className="flex justify-between">
                  <Button
                    variant="outline"
                    onClick={handleCopyCode}
                    disabled={!screen?.code}
                    className="flex items-center gap-2"
                  >
                    <Copy className="h-4 w-4" />
                    Copy Code
                  </Button>
                  <DialogClose asChild>
                    <Button variant="secondary">Close</Button>
                  </DialogClose>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant={"ghost"}
                  onClick={handleDownload}
                  disabled={!screen?.code}
                  className="bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>Download Image</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TooltipProvider>
      </div>
    </div>
  );
};

export default ScreenHandler;

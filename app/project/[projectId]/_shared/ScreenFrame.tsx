import { GripVertical } from "lucide-react";
import { Rnd } from "react-rnd";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { themeToCssVars } from "@/lib/constant";
import { Skeleton } from "@/components/ui/skeleton";

type Props = {
  x: number;
  y: number;
  width: number;
  height: number;
  setPanningEnabled: (enabled: boolean) => void;
  screen: ScreenConfigType;
  projectDetail: ProjectType | undefined;
};

const ScreenFrame = ({
  x,
  y,
  width,
  height,
  setPanningEnabled,
  screen,
  projectDetail,
}: Props) => {
  const html = `
    <!doctype html>
<html>
<head>
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            border: "var(--border)",
            input: "var(--input)",
            ring: "var(--ring)",
            background: "var(--background)",
            foreground: "var(--foreground)",
            primary: {
              DEFAULT: "var(--primary)",
              foreground: "var(--primary-foreground)",
            },
            secondary: {
              DEFAULT: "var(--secondary)",
              foreground: "var(--secondary-foreground)",
            },
            destructive: {
              DEFAULT: "var(--destructive)",
              foreground: "var(--destructive-foreground)",
            },
            muted: {
              DEFAULT: "var(--muted)",
              foreground: "var(--muted-foreground)",
            },
            accent: {
              DEFAULT: "var(--accent)",
              foreground: "var(--accent-foreground)",
            },
            popover: {
              DEFAULT: "var(--popover)",
              foreground: "var(--popover-foreground)",
            },
            card: {
              DEFAULT: "var(--card)",
              foreground: "var(--card-foreground)",
            },
          },
          borderRadius: {
            lg: "var(--radius)",
            md: "calc(var(--radius) - 2px)",
            sm: "calc(var(--radius) - 4px)",
          },
        }
      }
    }
  </script>
  <style>
    ${themeToCssVars(projectDetail?.theme ?? "")}
    body { font-family: 'Inter', sans-serif; }
  </style>
    </head>
    <body class="bg-[var(--background)] text-[var(--foreground)] w-full">
    ${(screen.code && screen.code.replace(/```\w*/g, "").trim()) ?? ""}
    </body>
    </html>
`;

  return (
    <Rnd
      default={{
        x,
        y,
        width: width,
        height: height,
      }}
      dragHandleClassName="drag-handle"
      enableResizing={{
        bottomRight: true,
        bottomLeft: true,
      }}
      onDragStart={() => {
        setPanningEnabled(false);
      }}
      onDragStop={() => {
        setPanningEnabled(true);
      }}
      onResizeStart={() => {
        setPanningEnabled(false);
      }}
      onResizeStop={() => {
        setPanningEnabled(true);
      }}
    >
      <div className="flex items-center drag-handle cursor-move bg-white p-3 rounded-lg">
        <GripVertical className="text-gray-500 h-6 w-6" /> Drag here
      </div>
      <div className="w-full h-full bg-white mt-3">
        {screen.code ? (
          <iframe
            srcDoc={html}
            className="w-full h-[calc(100%-40px)] bg-white"
            title={screen.screenName}
            sandbox="allow-scripts allow-same-origin"
          />
        ) : (
          <div className="flex flex-col h-[calc(100%-40px)] bg-white">
            {/* Header skeleton */}
            <div className="flex items-center justify-between p-4 border-b">
              <Skeleton className="h-8 w-32" />
              <div className="flex gap-2">
                <Skeleton className="h-8 w-8 rounded-full" />
                <Skeleton className="h-8 w-8 rounded-full" />
              </div>
            </div>

            {/* Main content skeleton */}
            <div className="flex-1 p-4 space-y-4">
              <Skeleton className="h-6 w-48" />
              <div className="grid grid-cols-2 gap-4">
                <Skeleton className="h-24 w-full rounded-lg" />
                <Skeleton className="h-24 w-full rounded-lg" />
              </div>
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
              <div className="flex gap-2">
                <Skeleton className="h-10 w-24" />
                <Skeleton className="h-10 w-24" />
              </div>
            </div>
          </div>
        )}
      </div>
    </Rnd>
  );
};

export default ScreenFrame;

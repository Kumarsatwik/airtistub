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
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
        <!-- Google Font -->
    <link rel="preconnect" href="https://fonts.googleapis.com"/>
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
    <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
    <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css" rel="stylesheet">


    <!-- Tailwind + Iconify -->
    <script src="https://cdn.tailwindcss.com"></script>
    <script src="https://code.iconify.design/iconify-icon/3.0.0/iconify-icon.min.js"></script>
    <style >
        ${themeToCssVars(projectDetail?.theme ?? "")}
    </style>
    </head>
    <body class="bg-[var(--background)] text-[var(--foreground)] w-full">
    ${(screen.code && screen.code.replace("```", "").trim()) ?? ""}
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

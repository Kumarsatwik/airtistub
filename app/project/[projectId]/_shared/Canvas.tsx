import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import ScreenFrame from "./ScreenFrame";
import { useState } from "react";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { Minus, Plus, RefreshCcw, X } from "lucide-react";
import { Button } from "@/components/ui/button";
type Props = {
  projectDetail: ProjectType | undefined;
  screenConfig: ScreenConfigType[];
  loading?: boolean;
};

const Canvas = ({ projectDetail, screenConfig }: Props) => {
  const [panningEnabled, setPanningEnabled] = useState(true);
  const isMobile = projectDetail?.deviceType === "mobile";
  const Controls = () => {
    const { zoomIn, zoomOut, resetTransform } = useControls();

    return (
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-50 flex items-center gap-1 p-1 bg-white/80 backdrop-blur-md border border-zinc-200 shadow-lg rounded-full">
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-white hover:shadow-sm transition-all active:scale-95"
          onClick={() => zoomIn()}
        >
          <Plus className="h-4 w-4" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-white hover:shadow-sm transition-all active:scale-95"
          onClick={() => zoomOut()}
        >
          <Minus className="h-4 w-4" />
        </Button>
        <div className="w-px h-4 bg-zinc-200 mx-1" />
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 rounded-full hover:bg-white hover:shadow-sm transition-all active:scale-95"
          onClick={() => resetTransform()}
        >
          <RefreshCcw className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  const SCREEN_WIDTH = isMobile ? 400 : 1200;
  const SCREEN_HEIGHT = isMobile ? 800 : 800;
  const GAP = isMobile ? 10 : 30;
  return (
    <div
      className="w-full h-screen bg-gray-100"
      style={{
        backgroundImage:
          "radial-gradient(rgba(0,0,0,0.15) 1px, transparent 1px)",
        backgroundSize: "20px 20px",
      }}
    >
      <TransformWrapper
        initialScale={0.7}
        minScale={0.1}
        maxScale={2.5}
        initialPositionX={50}
        initialPositionY={50}
        limitToBounds={false}
        wheel={{ step: 0.8 }}
        doubleClick={{ disabled: false }}
        panning={{ disabled: !panningEnabled }}
      >
        {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
        <>
          <Controls />
          
        <TransformComponent
          wrapperStyle={{ width: "100%", height: "100%" }}
          contentStyle={{
            width: "100%",
            height: "100%",
          }}
        >
          {screenConfig?.map((screen, index) => (
            <ScreenFrame
              key={screen.screenId}
              x={index * (SCREEN_WIDTH + GAP)}
              y={100}
              width={SCREEN_WIDTH}
              height={SCREEN_HEIGHT}
              setPanningEnabled={setPanningEnabled}
              screen={screen}
              projectDetail={projectDetail}
            />
          ))}
        </TransformComponent>
        </>
      )}
      </TransformWrapper>
    </div>
  );
};

export default Canvas;

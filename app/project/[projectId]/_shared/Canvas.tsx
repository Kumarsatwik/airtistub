import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import ScreenFrame from "./ScreenFrame";
import { useState } from "react";
import { ProjectType, ScreenConfigType } from "@/type/types";
type Props = {
  projectDetail: ProjectType | undefined;
  screenConfig: ScreenConfigType[];
  loading?: boolean;
};

const Canvas = ({ projectDetail, screenConfig }: Props) => {
  const [panningEnabled, setPanningEnabled] = useState(true);
  const isMobile = projectDetail?.deviceType === "mobile";

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
        minScale={0.7}
        maxScale={2.5}
        initialPositionX={50}
        initialPositionY={50}
        limitToBounds={false}
        wheel={{ step: 0.8 }}
        doubleClick={{ disabled: false }}
        panning={{ disabled: !panningEnabled }}
      >
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
      </TransformWrapper>
    </div>
  );
};

export default Canvas;

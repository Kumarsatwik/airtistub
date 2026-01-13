import { GripVertical } from "lucide-react";
import { Rnd } from "react-rnd";
import { ProjectType, ScreenConfigType } from "@/type/types";
import { buildHtml, THEMES, themeToCssVars } from "@/lib/constant";
import { Skeleton } from "@/components/ui/skeleton";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { SettingContext } from "@/context/SettingContext";
import ScreenHandler from "./ScreenHandler";

type Props = {
  x: number;
  y: number;
  setPanningEnabled: (enabled: boolean) => void;
  width: number;
  height: number;
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
  const { settingDetail, setSettingDetail } = useContext(SettingContext);
  // @ts-ignore
  const theme = THEMES[settingDetail?.theme ?? projectDetail?.theme];
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const html = buildHtml(theme, screen?.code);

  const [size, setSize] = useState({
    width,
    height,
  });

  useEffect(() => {
    setSize({
      width,
      height,
    });
  }, [width, height]);

  const measureIframeHeight = useCallback(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    try {
      const doc = iframe.contentDocument;
      if (!doc) return;

      const headerH = 40; // drag bar height
      const htmlEl = doc.documentElement;
      const body = doc.body;

      // ✅ choose the largest plausible height
      const contentH = Math.max(
        htmlEl?.scrollHeight ?? 0,
        body?.scrollHeight ?? 0,
        htmlEl?.offsetHeight ?? 0,
        body?.offsetHeight ?? 0
      );

      // optional min/max clamps
      const next = Math.min(Math.max(contentH + headerH, 160), 2000);

      setSize((s) =>
        Math.abs(s.height - next) > 2 ? { ...s, height: next } : s
      );
    } catch {
      // if sandbox/origin blocks access, we can't measure
    }
  }, []);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const onLoad = () => {
      measureIframeHeight();

      // ✅ observe DOM changes inside iframe
      const doc = iframe.contentDocument;
      if (!doc) return;

      const observer = new MutationObserver(() => measureIframeHeight());
      observer.observe(doc.documentElement, {
        childList: true,
        subtree: true,
        attributes: true,
        characterData: true,
      });

      // ✅ re-check a few times for fonts/images/tailwind async layout
      const t1 = window.setTimeout(measureIframeHeight, 50);
      const t2 = window.setTimeout(measureIframeHeight, 200);
      const t3 = window.setTimeout(measureIframeHeight, 600);

      return () => {
        observer.disconnect();
        window.clearTimeout(t1);
        window.clearTimeout(t2);
        window.clearTimeout(t3);
      };
    };

    iframe.addEventListener("load", onLoad);
    window.addEventListener("resize", measureIframeHeight);

    return () => {
      iframe.removeEventListener("load", onLoad);
      window.removeEventListener("resize", measureIframeHeight);
    };
  }, [measureIframeHeight, html]);

  return (
    <Rnd
      default={{
        x,
        y,
        width: width,
        height: height,
      }}
      size={size}
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
      onResizeStop={(_, __, ref, ___, position) => {
        setPanningEnabled(true);
        setSize({
          width: ref.offsetWidth,
          height: ref.offsetHeight,
        });
      }}
    >
      <div className="flex items-center drag-handle cursor-move bg-white p-3 rounded-lg">
        <ScreenHandler screen={screen} theme={theme} iframeRef={iframeRef} />
      </div>
      <div className="w-full h-full bg-white mt-3">
        {screen.code ? (
          <iframe
            srcDoc={html}
            className="w-full h-[calc(100%-40px)] bg-white"
            title={screen.screenName}
            sandbox="allow-scripts allow-same-origin"
            ref={iframeRef}
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

"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { THEME_NAME_LIST, THEMES } from "@/lib/constant";
import { Camera, Share, Sparkle } from "lucide-react";
import { ProjectType } from "@/type/types";

type Props = {
  projectDetail: ProjectType | undefined;
};

const SettingsSection = ({ projectDetail }: Props) => {
  const [selectedTheme, setSelectedTheme] = useState<
    (typeof THEME_NAME_LIST)[number]
  >(THEME_NAME_LIST[0]);

  const [draftProjectName, setDraftProjectName] = useState<string | null>(null);
  const [userNewScreenInput, setUserNewScreenInput] = useState<string>("");
  const projectName = draftProjectName ?? projectDetail?.projectName ?? "";

  return (
    <div className="w-1/4 h-[90vh] border-r p-4 flex flex-col gap-6">
      <h2 className="font-semibold text-xl tracking-tight">Settings</h2>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Project Name
        </h3>
        <Input
          placeholder="Enter project name"
          value={projectName}
          onChange={(event) => setDraftProjectName(event.target.value)}
        />
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium text-muted-foreground">
          Generate New Screen
        </h3>
        <Textarea
          placeholder="Enter prompt to generate screen"
          className="resize-none min-h-[100px]"
          value={userNewScreenInput}
          onChange={(event) => setUserNewScreenInput(event.target.value)}
        />
        <Button className="w-full mt-2" size="sm">
          <Sparkle className="mr-2 h-4 w-4" />
          Generate with AI
        </Button>
      </div>

      <div className="space-y-2 flex flex-col">
        <h3 className="text-sm font-medium text-muted-foreground">Themes</h3>
        <Select
          value={selectedTheme}
          onValueChange={(value) =>
            setSelectedTheme(value as (typeof THEME_NAME_LIST)[number])
          }
        >
          <SelectTrigger className="w-full">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-1.5 overflow-hidden">
                {[
                  THEMES[selectedTheme]?.primary,
                  THEMES[selectedTheme]?.secondary,
                  THEMES[selectedTheme]?.accent,
                  THEMES[selectedTheme]?.background,
                ].map((color, i) => (
                  <div
                    key={`${selectedTheme}-${i}`}
                    className="h-4 w-4 rounded-full border border-white/20 shadow-sm ring-1 ring-black/5"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
              <span className="text-sm font-semibold">
                {selectedTheme.replace(/_/g, " ")}
              </span>
            </div>
          </SelectTrigger>
          <SelectContent position="popper" side="bottom" align="start">
            {THEME_NAME_LIST.map((theme) => {
              const colors = THEMES[theme];
              return (
                <SelectItem
                  key={theme}
                  value={theme}
                  className="flex items-center gap-2 p-2"
                >
                  <span className="text-sm font-semibold flex-1">
                    {theme.replace(/_/g, " ")}
                  </span>
                  <div className="flex -space-x-1.5 overflow-hidden">
                    {[
                      colors?.primary,
                      colors?.secondary,
                      colors?.accent,
                      colors?.background,
                    ].map((color, i) => (
                      <div
                        key={i}
                        className="h-4 w-4 rounded-full border border-white/20 shadow-sm ring-1 ring-black/5"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      <div className="mt-5">
        <h2 className="text-sm mb-1 text-muted-foreground">Extras</h2>
        <div className="flex items-center gap-2">
          <Button size={"sm"} variant={"outline"} className="mt-2">
            <Camera /> Screenshot
          </Button>
          <Button size={"sm"} variant={"outline"} className="mt-2">
            <Share /> Save
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsSection;

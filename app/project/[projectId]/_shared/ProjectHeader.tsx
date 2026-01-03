import { Button } from "@/components/ui/button";
import { Save } from "lucide-react";
import Image from "next/image";

const ProjectHeader = () => {
  return (
    <div className="flex gap-2 items-center justify-between p-3 shadow-md">
      <div className="flex gap-2 items-center">
        <Image
          src="https://img.icons8.com/arcade/128/design.png"
          alt="logo"
          width={40}
          height={40}
        />
        <h2 className="text-xl font-semibold">Airtistub</h2>
      </div>
      <Button>
        {" "}
        <Save /> Save
      </Button>
    </div>
  );
};

export default ProjectHeader;

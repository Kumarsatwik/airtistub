import ProjectHeader from "./_shared/ProjectHeader";
import SettingsSection from "./_shared/SettingsSection";

const ProjectCanvasPlayground = () => {
  return (
    <div>
      <ProjectHeader />
      <div>
        {/* Settings */}
        <SettingsSection />
      </div>
    </div>
  );
};

export default ProjectCanvasPlayground;

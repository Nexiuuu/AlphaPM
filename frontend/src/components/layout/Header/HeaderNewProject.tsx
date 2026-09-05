import { Plus } from "lucide-react";

import { Button } from "../../ui/Button/Button";

export const HeaderNewProject = () => {
  return (
    <Button>
      <Plus size={18} />
      <span className="hidden sm:inline">New Project</span>
    </Button>
  );
};

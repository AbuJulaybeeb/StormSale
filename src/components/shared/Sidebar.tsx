import { Button } from "../../components/ui/button";
import { cn } from "../../lib/utils";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  tabs: { id: string; label: string; icon?: string }[];
  className?: string;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onTabChange,
  tabs,
  className,
}) => {
  return (
    <div className={cn("w-64 bg-muted/30 p-4 space-y-2", className)}>
      {tabs.map((tab) => (
        <Button
          key={tab.id}
          variant={activeTab === tab.id ? "default" : "ghost"}
          className="w-full justify-start"
          onClick={() => onTabChange(tab.id)}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};

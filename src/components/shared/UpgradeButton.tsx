import { FC } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "../ui/Button";

const UpgradeButton: FC = () => {
  return (
    <Button className="w-full">
      Upgrade Now <ArrowRight className="ml-1.5 h-5 w-5" />
    </Button>
  );
};

export default UpgradeButton;

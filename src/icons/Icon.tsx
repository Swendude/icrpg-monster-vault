import Skull from "./skull.svg";
import DiceSkull from "./dice_skull.svg";
import Heart from "./suit_hearts.svg";
import D20 from "./d20_outline_number.svg";
import D4 from "./d4_outline_number.svg";
import D8 from "./d8_outline_number.svg";
import D10 from "./d10_outline_number.svg";
import D12 from "./d12_outline_number.svg";
import D6 from "./d6_outline_number.svg";
import Dot from "./tag_empty.svg";
import { Dice } from "@/types/icrpg";

type IconVariants = "Skull" | "Dice Skull" | "Heart" | "Dot";

interface IconProps extends React.SVGProps<SVGSVGElement> {
  variant: IconVariants | Dice;
}

const Icon = ({ variant, ...props }: IconProps) => {
  switch (variant) {
    case "Skull":
      return <Skull viewBox="-32 -32 64 64" {...props} />;
    case "Dice Skull":
      return <DiceSkull viewBox="-32 -32 64 64" {...props} />;
    case "Heart":
      return <Heart viewBox="-32 -32 64 64" {...props} />;
    case "D20":
      return <D20 viewBox="-32 -32 64 64" {...props} />;
    case "D4":
      return <D4 viewBox="-32 -32 64 64" {...props} />;
    case "D6":
      return <D6 viewBox="-32 -32 64 64" {...props} />;
    case "D8":
      return <D8 viewBox="-32 -32 64 64" {...props} />;
    case "D10":
      return <D10 viewBox="-32 -32 64 64" {...props} />;
    case "D12":
      return <D12 viewBox="-32 -32 64 64" {...props} />;
    case "Dot":
      return <Dot viewBox="0 0 30 30" {...props} />;

    default:
      return variant satisfies never;
  }
};

export default Icon;

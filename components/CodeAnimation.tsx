import { LiaChevronLeftSolid } from "react-icons/lia";
import { LiaChevronRightSolid } from "react-icons/lia"
import { GoDotFill } from "react-icons/go";
import { GoDot } from "react-icons/go";

export default function CodeAnimation() {
  return (
    <div className="flex items-center">
      <LiaChevronLeftSolid className="text-xl" />
      <GoDot className="text-xs text-orange-400-500 animate-pulse " />
      <GoDotFill className="text-xs text-green-500 animate-pulse " />
      <GoDot className="text-xs text-orange-400-500 animate-pulse " />
      <LiaChevronRightSolid className="text-xl" />
    </div>
  )

}
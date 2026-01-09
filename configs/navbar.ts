import { FaWpbeginner } from "react-icons/fa";
import { TbBrandCraft } from "react-icons/tb";
import { MdDataThresholding } from "react-icons/md";
import { GiJourney, GiSecretBook } from "react-icons/gi";
import { MdOutlineContacts } from "react-icons/md";
import { LuMousePointerClick } from "react-icons/lu";
export const NAV_ITEMS = [
  { label: "intro", href: "/", icon: FaWpbeginner, scroll: false },
  { label: "projects", href: "projects", icon: TbBrandCraft, scroll: true },
  { label: "journey", href: "/journey", icon: GiJourney, scroll: false },
  { label: "experience", href: "/experience", icon: MdDataThresholding, scroll: false },
];

export const P_NAV = [

  { label: "contact", href: "/contact", icon: MdOutlineContacts, scroll: false },
  { label: "about", href: "/about", icon: GiSecretBook, scroll: false },
  { label: "hire", href: "/hire", icon: LuMousePointerClick, scroll: false },

]
import { FaWpbeginner } from "react-icons/fa";
import { TbBrandCraft } from "react-icons/tb";
import { MdDataThresholding } from "react-icons/md";
import { GiJourney, GiSecretBook } from "react-icons/gi";
import { MdOutlineContacts } from "react-icons/md";
import { LuMousePointerClick } from "react-icons/lu";
export const NAV_ITEMS = [
    { label: "intro", href: "/", icon: FaWpbeginner },
    { label: "projects", href: "/works", icon: TbBrandCraft },
    { label: "journey", href: "/journey", icon: GiJourney },
    { label: "experience", href: "/experience", icon: MdDataThresholding },
];

export const P_NAV = [

    { label: "contact", href: "/contact", icon: MdOutlineContacts },
    { label: "about", href: "/about", icon: GiSecretBook },
    { label: "hire", href: "/hire", icon: LuMousePointerClick },

]
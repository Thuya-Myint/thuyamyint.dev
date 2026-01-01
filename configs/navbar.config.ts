import { FaWpbeginner } from "react-icons/fa";
import { TbBrandCraft } from "react-icons/tb";
import { MdDataThresholding } from "react-icons/md";
import { GiJourney, GiSecretBook } from "react-icons/gi";
import { MdOutlineContacts } from "react-icons/md";
import { LuMousePointerClick } from "react-icons/lu";
export const NAV_ITEMS = [
    { label: "Intro", href: "/", icon: FaWpbeginner },
    { label: "Works", href: "/works", icon: TbBrandCraft },
    { label: "Journey", href: "/journey", icon: GiJourney },
    { label: "Experience", href: "/experience", icon: MdDataThresholding },
];

export const P_NAV = [

    { label: "Contact", href: "/works", icon: MdOutlineContacts },
    { label: "About", href: "/", icon: GiSecretBook },
    { label: "Hire", href: "/experience", icon: LuMousePointerClick },

]
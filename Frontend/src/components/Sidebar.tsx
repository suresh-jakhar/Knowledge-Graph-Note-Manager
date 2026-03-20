import { TwitterIcon } from "../icons/TwitterIcon"
import { YoutubeIcon } from "../icons/YoutubeIcon"
import { SideBarItem } from "./SidebarItem"
import { LogoIcon } from "../icons/Logo"
import { LoGoTextIcon } from "../icons/LogoText"

export function Sidebar(){
    return (
        <div className="h-screen bg-white border-r border-gray-300 w-72 fixed left-0 top-0 flex flex-col p-4">
            <div className="flex items-center ">
                {/* <LogoIcon /> */}
                <LoGoTextIcon/>
            </div>
            <div className="pt-0">
                <SideBarItem text="Twitter" icon={<TwitterIcon />} />
                <SideBarItem text="Youtube" icon={<YoutubeIcon />} />
            </div>
        </div>
    )
}
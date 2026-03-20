import type { ReactElement } from "react";

interface sideBarItems{
    text : string;
    icon: ReactElement;
}

export function SideBarItem({ text, icon }:sideBarItems ){

    return (
        <div className="flex items-center gap-2 p-2 text-gray-800">
            <div className="pt-1">{icon}</div>
            <div className="pt-1 font-medium text-base">{text}</div>
        </div>
    );
}
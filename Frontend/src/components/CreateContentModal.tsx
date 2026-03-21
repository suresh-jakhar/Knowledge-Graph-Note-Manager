import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./input";
// Controlled component
export function CreateContentModal({ open, onClose }) {
    if (!open) return null;

    return <div>
           { open && <div  className="flex justify-center fixed top-0 left-0 w-screen h-screen bg-slate-500/40" >
               <div className="flex flex-col justify-center">
                <span className="bg-white p-4 rounded" >
                    <div className="flex justify-end">
                        <div onClick={onClose} className="cursor-pointer"><CrossIcon/></div>
                    </div>
                        <Input placeholder={"Titile"}/>
                        <Input placeholder={"Link"}/>
                    <div>
                        <div className=" flex justify-center">
                        <Button variant = "primary" text = "Submit"/>
                        </div>
                    </div>
                </span>
               
               </div> 

            </div>}
        </div>
    
}


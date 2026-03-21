import { CrossIcon } from "../icons/CrossIcon";
import { Button } from "./Button";
import { Input } from "./input";
import { useRef, useState } from "react";
import { api } from "../axios";

enum ContentType {
  Youtube = "youtube",
  Twitter = "twitter"
}

interface CreateContentModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateContentModal({ open, onClose }: CreateContentModalProps) {
  const titleRef = useRef<HTMLInputElement>(null);
  const linkRef = useRef<HTMLInputElement>(null);
  const [type, setType] = useState<ContentType>(ContentType.Youtube);

  if (!open) return null;

  async function handleSubmit() {
    const title = titleRef.current?.value;
    const link = linkRef.current?.value;

    try {
      const res = await api.post("/api/v1/content", {
        title,
        link,
        type,
        tags: []
      });

      alert(res.data.message);
      onClose();
    } catch (err: any) {
      alert(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <div className="flex justify-center fixed top-0 left-0 w-screen h-screen bg-slate-500/40">
      <div className="flex flex-col justify-center">
        <span className="bg-white p-4 rounded min-w-72">
          <div className="flex justify-end">
            <div onClick={onClose} className="cursor-pointer">
              <CrossIcon />
            </div>
          </div>

          <Input ref={titleRef} placeholder="Title" />
          <Input ref={linkRef} placeholder="Link" />

          <div className="flex gap-2 justify-center mt-2">
            <Button
              text="Youtube"
              variant={type === ContentType.Youtube ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Youtube)}
            />
            <Button
              text="Twitter"
              variant={type === ContentType.Twitter ? "primary" : "secondary"}
              onClick={() => setType(ContentType.Twitter)}
            />
          </div>

          <div className="flex justify-center pt-4">
            <Button
              variant="primary"
              text="Submit"
              onClick={handleSubmit}
            />
          </div>
        </span>
      </div>
    </div>
  );
}
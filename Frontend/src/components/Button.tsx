import type { ReactElement } from "react";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  startIcon?: ReactElement;
  onClick?: () => void;
  FullWidth?: boolean;
  loading?: boolean;
}

const baseStyle =
  "px-4 py-2 rounded-md font-light flex items-center gap-3 whitespace-nowrap";

const variantStyles = {
  primary: "bg-purple-600 text-white",
  secondary: "bg-purple-200 text-purple-500",
};

export function Button({
  variant,
  text,
  startIcon,
  onClick,
  FullWidth,
  loading,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={loading}   
      className={`${baseStyle} ${variantStyles[variant]} ${
        FullWidth ? "w-full justify-center" : ""
      } ${loading ? "opacity-50 cursor-not-allowed" : ""}`}  
    >
      {startIcon}
      {loading ? "Loading..." : text}
    </button>
  );
}
import React, { type ReactElement, type ReactEventHandler } from "react";

export interface ButtonProps {
    variant: "primary" | "secondary";
    size: "small" | "medium" | "large";
    text: string;
    startIcon?: ReactElement;
    endIcon?: ReactElement;
    onClick?: () => void;
    disabled?: boolean;
    type?: "button" | "submit" | "reset";
    className?: string;
}

const variantStyles = {
    primary: "bg-purple-600 text-white hover:bg-purple-700",
    secondary: "bg-purple-100 text-purple-700 hover:bg-purple-200"
};

const sizeStyles = {
    small: "px-2 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-6 py-3 text-lg"
};

const baseStyles = "rounded flex items-center gap-2 font-medium flex";

export const Button = (props : ButtonProps) =>{
    return (
        <button
            className={`${variantStyles[props.variant]} ${baseStyles} ${sizeStyles[props.size]}`}

        
        
        > {props.startIcon} {props.text}</button>
    );
};
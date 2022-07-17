import React from "react";
import classNames from "classnames";

import s from "./Button.module.css";

export const Button = ({
  onClick,
  disabled = false,
  variant = "primary",
  className = "",
  children,
}) => {
  return (
    <button
      className={classNames(s.Button, className, {
        [s.Button__primary]: variant === "primary",
        [s.Button__secondary]: variant === "secondary",
        [s.Button__default]: variant === "default",
      })}
      onClick={!disabled ? onClick : undefined}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

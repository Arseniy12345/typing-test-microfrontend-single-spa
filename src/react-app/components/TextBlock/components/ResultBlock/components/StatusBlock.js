import React from "react";
import s from "../ResultBlock.module.css";

export const StatusBlock = ({ title, value }) => {
  return (
    <div className={s.StatusBlock}>
      <span className={s.StatusBlock__title}>{title}</span>
      <span className={s.StatusBlock__value}>{value}</span>
    </div>
  );
};

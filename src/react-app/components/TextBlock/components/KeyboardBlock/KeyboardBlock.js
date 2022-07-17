import React, { useEffect, useState } from "react";
import classNames from "classnames";
import { keyRows } from "./constants";
import s from "./KeyboardBlock.module.css";

export const KeyboardBlock = (props) => {
  const [pressedkey, setKey] = useState(null);

  useEffect(() => {
    const onKeyDown = (e) => {
      setKey(e.key.toUpperCase());
      setTimeout(() => {
        setKey(null);
      }, 50);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  return (
    <div className={s.KeyboardBlock}>
      {keyRows.map((row, index) => (
        <div className={s.KeyboardBlock__row} key={index}>
          {row.map((key, index) => (
            <div
              key={key}
              className={classNames(s.KeyboardBlock__key, {
                [s.KeyboardBlock__key_active]: key === pressedkey,
                [s.KeyboardBlock__keySpace]: key === " ",
                [s.KeyboardBlock__keyEven]: index % 2 === 0,
                [s.KeyboardBlock__keyOdd]: index % 2 !== 0,
              })}
            >
              {key}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

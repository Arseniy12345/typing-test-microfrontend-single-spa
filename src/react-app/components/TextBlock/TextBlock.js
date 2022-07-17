import React, { useEffect, useState, useMemo, useCallback } from "react";
import classNames from "classnames";
import { Button } from "../Button";
import { ResultBlock } from "./components/ResultBlock";
import { KeyboardBlock } from "./components/KeyboardBlock";
import { exceptionKeys } from "./constants.js";
import { calculateTimeDiff } from "./utils";

import s from "./TextBlock.module.css";

export const TextBlock = () => {
  const [printableText, setPrintableText] = useState("");
  const [printedText, setPrintedText] = useState("");
  const [notPrintedText, setNotPrintedText] = useState([]);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [pressedData, setPressedData] = useState(null);
  const [error, setError] = useState(false);
  const [inProgress, setInProgress] = useState(false);

  const [errorsCount, setErrorsCount] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  const [timeList, setTimeList] = useState([]);

  const total = useMemo(() => printableText.length, [printableText]);

  const chars = useMemo(() => printableText.split(""), [printableText]);

  const result = useMemo(() => {
    if (!endTime) return null;
    return Math.floor((total * 60000) / (endTime - startTime));
  }, [startTime, endTime, total]);

  const timeDiff = useMemo(() => {
    if (!endTime) return null;
    return calculateTimeDiff(timeList);
  }, [endTime, timeList]);

  const onRepeat = useCallback((printableText) => {
    setNotPrintedText(printableText.split(""));
    setPrintedText("");
    setCurrentIndex(0);
    setStartTime(null);
    setEndTime(null);
    setInProgress(false);
    setErrorsCount(0);
    setTimeList([]);
  }, []);

  useEffect(() => {
    const onKeyUp = (event) => {
      if (exceptionKeys.includes(event.key)) return;
      setPressedData({ key: event.key, timeStamp: event.timeStamp });
    };

    window.addEventListener("keyup", onKeyUp);

    window.store.subscribeReact(() => {
      const { printableText } = window.store.state;
      setPrintableText(printableText);
      setNotPrintedText(printableText.split(""));
      onRepeat(printableText);
    });

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, []);

  useEffect(() => {
    if (!inProgress && pressedData) setPressedData(null);

    if (endTime || !pressedData || !inProgress) return;

    if (pressedData.key !== printableText[currentIndex]) {
      setError(true);
      setErrorsCount((prev) => prev + 1);
      return;
    }

    setPrintedText((prev) => prev + pressedData.key);
    setNotPrintedText((prev) => prev.slice(1));
    setCurrentIndex(currentIndex + 1);
    setPressedData();
    setError(false);
    setTimeList((prev) => [...prev, pressedData.timeStamp]);

    if (currentIndex === 0) setStartTime(pressedData.timeStamp);
    if (currentIndex === total - 1) {
      setEndTime(pressedData.timeStamp);
      setInProgress(false);
    }
  }, [pressedData, currentIndex, endTime, printableText, inProgress]);

  return (
    <>
      <div className={s.TextBlock}>
        <div>
          <div className={s.TextBlock__buttons}>
            <Button
              onClick={() => {
                window.store.showSelectModal(true);
              }}
              variant={"secondary"}
            >
              {printableText ? "Выбрать другой текст" : "Выбрать текст"}
            </Button>

            {endTime && (
              <Button
                onClick={() => {
                  onRepeat(printableText);
                }}
              >
                Повторить
              </Button>
            )}

            {printableText && !inProgress && !endTime && (
              <Button
                onClick={() => {
                  setInProgress(true);
                }}
              >
                Старт
              </Button>
            )}
          </div>

          <div className={s.TextBlock__text}>
            {printableText && !inProgress && (
              <span
                className={
                  endTime
                    ? s.TextBlock__text_complete
                    : s.TextBlock__text_notPrinted
                }
              >
                {printableText}
              </span>
            )}

            {printableText && inProgress && (
              <>
                <span className={s.TextBlock__text_printed}>{printedText}</span>
                {notPrintedText.map((char, index) => (
                  <span
                    key={index}
                    className={classNames(s.TextBlock__char, {
                      [s.TextBlock__char_active]: index === 0 && !error,
                      [s.TextBlock__char_error]: index === 0 && error,
                    })}
                  >
                    {char}
                  </span>
                ))}
              </>
            )}

            {!printableText && (
              <span className={s.TextBlock__text_notPrinted}>
                Выберите текст
              </span>
            )}
          </div>
        </div>

        <ResultBlock
          total={total}
          currentIndex={currentIndex}
          result={result}
          errorsCount={errorsCount}
          timeDiff={timeDiff}
          chars={chars}
        />
      </div>
      <KeyboardBlock />
    </>
  );
};

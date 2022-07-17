import React, { useCallback } from "react";
import { StatusBlock } from "./components/StatusBlock";
import { Button } from "../../../Button";
import classNames from "classnames";
import s from "./ResultBlock.module.css";

export const ResultBlock = ({
  total,
  currentIndex,
  result,
  errorsCount,
  timeDiff,
  chars,
}) => {
  const showChartModal = useCallback(() => {
    window.store.showChartModal(true, timeDiff, chars);
  }, [timeDiff, chars]);

  return (
    <div
      className={classNames(s.ResultBlock, {
        [s.ResultBlock__more]: !!result,
        [s.ResultBlock__empty]: !total,
      })}
    >
      {!total && <span>← Выбор текста</span>}
      {!!total && (
        <StatusBlock title={"Прогресс"} value={`${currentIndex} из ${total}`} />
      )}
      {result && (
        <>
          <StatusBlock title={"Скорость"} value={`${result} сим/мин`} />
          <StatusBlock title={"Кол-во ошибок"} value={errorsCount} />
          <Button
            onClick={showChartModal}
            variant={"default"}
            className={s.ResultBlock__button}
          >
            <span className={s.ResultBlock__button_text}>Посмотреть график</span>
          </Button>
        </>
      )}
    </div>
  );
};

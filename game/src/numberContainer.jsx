import { memo, useState } from "react";
import PropTypes from "prop-types";
import {
  PlayButton,
  NUMBER_CONTAINER_WIDTH,
  NUMBER_CONTAINER_HEIGHT,
  MAX_POINT_ALLOWED,
  Notify,
} from "./constValue";
import { numbersContainer, numberItem, NotifyImage } from "./gameStyle";
import SuccessIcon from "../src/assets/images/sucess.png";
import LoseIcon from "../src/assets/images/lose.jpg";

function NumberContainer(props) {
  const {
    playButtonTitle,
    pointShowing,
    numberOnClick,
    isAllowPlay,
    notifyTitle,
  } = props;
  const getRandomPostion = (max) => {
    return Math.floor(Math.random() * max);
  };

  return (
    <section className="numbers-container" style={numbersContainer}>
      {!isAllowPlay && (
        <img
          style={NotifyImage}
          src={
            notifyTitle === Notify.Win
              ? SuccessIcon
              : notifyTitle === Notify.Lose
              ? LoseIcon
              : ""
          }
        />
      )}
      {playButtonTitle === PlayButton.Restart &&
        (() => {
          let rows = [];
          for (let i = 0; i < pointShowing.length; i++) {
            const leftSpace = getRandomPostion(NUMBER_CONTAINER_WIDTH);
            const topSpace = getRandomPostion(NUMBER_CONTAINER_HEIGHT);
            if (!pointShowing[i]["positionLeft"]) {
              pointShowing[i]["positionLeft"] = leftSpace;
              pointShowing[i]["positionTop"] = topSpace;
            }
            rows.push(
              <div
                class="number-item"
                key={i}
                style={{
                  left: `${pointShowing[i]["positionLeft"]}px`,
                  top: `${pointShowing[i]["positionTop"]}px`,
                  background: `${
                    pointShowing[i].isSelected ? "#ef9647" : "#d2dfd2"
                  }`,
                  zIndex: `${MAX_POINT_ALLOWED - i}`,
                  pointerEvents: `${isAllowPlay ? "" : "none"}`,
                  ...numberItem,
                }}
                onClick={() => numberOnClick(pointShowing[i].value)}
              >
                {pointShowing[i].value}
              </div>
            );
          }
          return rows;
        })()}
    </section>
  );
}
NumberContainer.propTypes = {
  playButtonTitle: PropTypes.string,
  pointShowing: PropTypes.number,
};

export default memo(NumberContainer);

import { useState } from "react";
import {
  labelStyle,
  valueStyle,
  buttonStyle,
  numbersContainer,
  gameContainer,
  numberItem,
} from "./gameStyle";
import {
  Notify,
  PlayButton,
  POINT_DEFAULT,
  TIME_DEFAULT,
  NUMBER_CONTAINER_WIDTH,
  NUMBER_CONTAINER_HEIGHT,
  POINT_SHOWING_DEFAULT,
} from "./constValue";
import NumberContainer from "./numberContainer";

const GameHome = () => {
  const [notifyTitle, setNotifyTitle] = useState(Notify.Playing);
  const [point, setPoint] = useState(POINT_DEFAULT);
  const [timeCounter, setTimeCounter] = useState(TIME_DEFAULT);
  const [playButtonTitle, setPlayButtonTitle] = useState(PlayButton.Play);
  const [pointShowing, setPointShowing] = useState(POINT_SHOWING_DEFAULT);

  const getRandomPostion = (max) => {
    return Math.floor(Math.random() * max);
  };

  const playGame = () => {
    playButtonTitle === PlayButton.Play &&
      setPlayButtonTitle(PlayButton.Restart);

    const pointValue = [];
    for (let i = 0; i < point; i++) {
      pointValue.push({ value: i + 1, isSelected: false });
    }
    setPointShowing(pointValue);
  };

  const numberOnClick = (itemValue) => {
    const pointShowingUpdate = [...pointShowing];
    pointShowingUpdate.forEach((item) => {
      if (item.value === itemValue) {
        item.isSelected = true;
      }
    });
    setPointShowing(pointShowingUpdate);
  };

  return (
    <div className="game-container" style={gameContainer}>
      <h1 className="notify-title">{notifyTitle}</h1>
      <div className="point">
        <label style={labelStyle}>Point:</label>
        <input
          style={valueStyle}
          name="point"
          value={point}
          onChange={(e) => setPoint(e.target.value)}
        />
      </div>
      <div className="time">
        <label style={labelStyle}>Time:</label>
        <span style={valueStyle}>{timeCounter} S</span>
      </div>
      <button className="play-button" style={buttonStyle} onClick={playGame}>
        {playButtonTitle}
      </button>
      <NumberContainer></NumberContainer>
      <section className="numbers-container" style={numbersContainer}>
        {playButtonTitle === PlayButton.Restart &&
          (() => {
            let rows = [];
            for (let i = 0; i < pointShowing.length; i++) {
              const leftSpace = getRandomPostion(NUMBER_CONTAINER_WIDTH);
              const topSpace = getRandomPostion(NUMBER_CONTAINER_HEIGHT);
              rows.push(
                <div
                  key={i}
                  style={{
                    left: `${leftSpace}px`,
                    top: `${topSpace}px`,
                    background: `${
                      pointShowing[i].isSelected ? "red" : "#d2dfd2"
                    }`,
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
    </div>
  );
};

export default GameHome;

import { useState, useCallback } from "react";
import {
  labelStyle,
  valueStyle,
  buttonStyle,
  gameContainer,
  inputStyle,
} from "./gameStyle";
import {
  Notify,
  PlayButton,
  POINT_DEFAULT,
  TIME_DEFAULT,
  POINT_SHOWING_DEFAULT,
  MAX_POINT_ALLOWED,
  NUMBER_ITEM_START,
} from "./constValue";
import NumberContainer from "./numberContainer";

let numberShouldSelect = NUMBER_ITEM_START;
let isAllowPlay = true;

const GameHome = () => {
  const [notifyTitle, setNotifyTitle] = useState(Notify.Playing);
  const [point, setPoint] = useState(POINT_DEFAULT);
  const [timeCounter, setTimeCounter] = useState(TIME_DEFAULT);
  const [playButtonTitle, setPlayButtonTitle] = useState(PlayButton.Play);
  const [pointShowing, setPointShowing] = useState(POINT_SHOWING_DEFAULT);

  const playGame = () => {
    playButtonTitle === PlayButton.Play &&
      setPlayButtonTitle(PlayButton.Restart);
    const pointValue = [];
    for (let i = 0; i < point; i++) {
      pointValue.push({ value: i + 1, isSelected: false });
    }
    isAllowPlay = true;
    setPointShowing(pointValue);
    numberShouldSelect = NUMBER_ITEM_START;
    setNotifyTitle(Notify.Playing);
  };

  const numberOnClick = useCallback(
    (itemValue) => {
      if (itemValue === numberShouldSelect) {
        const pointShowingUpdate = [...pointShowing];
        pointShowingUpdate.forEach((item, i) => {
          if (item.value === itemValue && !item.isSelected) {
            item.isSelected = true;
            setTimeout(() => {
              pointShowingUpdate[i]["isDisappeared"] = true;
              setPointShowing(pointShowingUpdate);
            }, 800);
          }
        });
        setPointShowing(pointShowingUpdate);
        const isExistedItemNotSelected = pointShowingUpdate.some(
          (item) => !item.isSelected
        );
        if (!isExistedItemNotSelected) {
          setNotifyTitle(Notify.Win);
          isAllowPlay = false;
        }
        numberShouldSelect++;
      } else {
        isAllowPlay = false;
        setNotifyTitle(Notify.Lose);
      }
    },
    [pointShowing]
  );
  const notifyColor =
    notifyTitle === Notify.Win
      ? "green"
      : notifyTitle === Notify.Lose
      ? "red"
      : "black";
  return (
    <div className="game-container" style={gameContainer}>
      <h1 className="notify-title" style={{ color: notifyColor }}>
        {notifyTitle}
      </h1>
      <div className="point">
        <h2 style={{ color: "#a3158a" }}>
          Maximum Point for this Game is
          <span style={{ fontSize: "30px" }}> {MAX_POINT_ALLOWED}</span>
        </h2>
        <label style={labelStyle}>Point:</label>
        <input
          type="number"
          style={inputStyle}
          name="point"
          value={point}
          onChange={(e) => {
            0 <= e.target.value &&
              e.target.value <= MAX_POINT_ALLOWED &&
              setPoint(e.target.value);
          }}
        />
      </div>
      <div className="time">
        <label style={labelStyle}>Time:</label>
        <span style={valueStyle}>{timeCounter} S</span>
      </div>
      <button className="play-button" style={buttonStyle} onClick={playGame}>
        {playButtonTitle}
      </button>
      <NumberContainer
        playButtonTitle={playButtonTitle}
        pointShowing={pointShowing}
        isAllowPlay={isAllowPlay}
        notifyTitle={notifyTitle}
        numberOnClick={(e) => numberOnClick(e)}
      />
    </div>
  );
};

export default GameHome;

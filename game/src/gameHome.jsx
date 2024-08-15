import { useState } from "react";
import {
  labelStyle,
  valueStyle,
  buttonStyle,
  numbersContainer,
  gameContainer,
} from "./gameStyle";
import {
  Notify,
  PlayButton,
  POINT_DEFAULT,
  TIME_DEFAULT,
} from "./labelButtonValue";

const GameHome = () => {
  const [notifyTitle, setNotifyTitle] = useState(Notify.Playing);
  const [point, setPoint] = useState(POINT_DEFAULT);
  const [timeCounter, setTimeCounter] = useState(TIME_DEFAULT);
  const [playButtonTitle, setPlayButtonTitle] = useState(PlayButton.Play);

  return (
    <div className="game-container" style={gameContainer}>
      <h1 className="notify-title">{notifyTitle}</h1>
      <div className="point">
        <label style={labelStyle}>Point:</label>
        <input style={valueStyle} name="point" value={point} />
      </div>
      <div className="time">
        <label style={labelStyle}>Time:</label>
        <span style={valueStyle}>{timeCounter} S</span>
      </div>
      <button className="play-button" style={buttonStyle}>
        {playButtonTitle}
      </button>
      <section className="numbers-container" style={numbersContainer}>
        <div></div>
      </section>
    </div>
  );
};

export default GameHome;

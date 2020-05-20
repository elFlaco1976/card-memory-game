import React from "react";
import "./index.scss";

interface Props {
  score: number;
  totalCards: number;
  isGameFinished: boolean;
  gameTimer: number;
}

const secondsToMinutesAndSeconds = (totalSeconds: number) => {
  const seconds = totalSeconds % 60;
  const secondsString = seconds < 10 ? `0${seconds}` : seconds;
  const minutes = Math.trunc(totalSeconds / 60);
  const minutesString = minutes < 10 ? `0${minutes}` : minutes;
  return `${minutesString}:${secondsString}`;
};

const Score: React.FC<Props> = (props: Props) => {
  const { score, totalCards, isGameFinished, gameTimer } = props;
  return (
    <div className='score-container'>
      <div className='score-item'>{`${isGameFinished ? "🎉" : score}/${
        isGameFinished ? "🎉" : totalCards
      }`}</div>
      <div className='score-item'>{secondsToMinutesAndSeconds(gameTimer)}</div>
    </div>
  );
};

export default Score;

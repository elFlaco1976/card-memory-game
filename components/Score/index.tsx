import React from "react";
import "./index.scss";

interface Props {
  score: number;
  totalCards: number;
  isGameFinished: boolean;
}

const Score: React.FC<Props> = (props: Props) => {
  const { score, totalCards, isGameFinished } = props;
  return (
    <div className='score-container'>
      {`${isGameFinished ? "🎉" : score}/${isGameFinished ? "🎉" : totalCards}`}
    </div>
  );
};

export default Score;

import React from 'react';
import './index.scss';

interface Props {
  score: number;
  totalCards: number;
}

const Score: React.FC<Props> = (props: Props) => {
  const { score, totalCards } = props;
  return (
    <div className="score-container">
      {`${score}/${totalCards}`}
    </div>
  );
};

export default Score;

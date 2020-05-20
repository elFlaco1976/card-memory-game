import React from "react";
import CardModel from "../../types/CardModel";
import CardStatus from "../../types/CardStatus";
import "./index.scss";

interface Props {
  cardInfo: CardModel;
  handleGameCardClick: (idCard: number) => void;
  gameNameLetter: string | null;
}

const handleClick = (
  cardInfo: CardModel,
  parentHandler: (idCard: number) => void
) => {
  if (
    cardInfo.status === CardStatus.visible ||
    cardInfo.status === CardStatus.matched
  ) {
    return;
  }
  parentHandler(cardInfo.idCard);
};

const GameCard: React.FC<Props> = (props: Props) => {
  const { cardInfo, handleGameCardClick, gameNameLetter } = props;
  return (
    <div className='card-container'>
      <div
        className='image-wrap'
        onClick={() => handleClick(cardInfo, handleGameCardClick)}
      >
        {gameNameLetter && (
          <div className='game-name-letter'>{gameNameLetter}</div>
        )}
        {(cardInfo.status === CardStatus.visible ||
          cardInfo.status === CardStatus.matched) && (
          <img src={cardInfo.image} alt='' />
        )}
      </div>
    </div>
  );
};

export default GameCard;

import React from "react";
import CardModel from "../../types/CardModel";
import CardStatus from "../../types/CardStatus";
import { useSpring, animated } from "react-spring";
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
  const cardCanNotBePlayed =
    cardInfo.status === CardStatus.visible ||
    cardInfo.status === CardStatus.matched;
  if (cardCanNotBePlayed) {
    return;
  }
  parentHandler(cardInfo.idCard);
};

const GameCard: React.FC<Props> = (props: Props) => {
  const { cardInfo, handleGameCardClick, gameNameLetter } = props;
  const cardIsVisible =
    cardInfo.status === CardStatus.visible ||
    cardInfo.status === CardStatus.matched;
  const letterVisibilityStyle =
    cardInfo.status === CardStatus.visible ||
    cardInfo.status === CardStatus.matched
      ? "letter-less-visible"
      : "letter-visible";
  const { x } = useSpring({
    from: { x: 0 },
    x: cardIsVisible ? 1 : 0,
    config: { duration: 1000 },
  });
  console.log("reac-spring x:", x);
  return (
    <animated.div
      className='card-container'
      style={{
        width: x
          .interpolate({ range: [0, 1], output: [125, 190] })
          .interpolate((o) => `${o}px`),
      }}
    >
      <div
        className='image-wrap'
        onClick={() => handleClick(cardInfo, handleGameCardClick)}
      >
        {gameNameLetter && (
          <div className={`game-name-letter ${letterVisibilityStyle}`}>
            {gameNameLetter}
          </div>
        )}
        {(cardInfo.status === CardStatus.visible ||
          cardInfo.status === CardStatus.matched) && (
          <img src={cardInfo.image} alt='' />
        )}
      </div>
    </animated.div>
  );
};

export default GameCard;

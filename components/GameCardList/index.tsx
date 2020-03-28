import React from 'react';
import CardModel from '../../types/CardModel';
import GameCard from '../GameCard/index';
import './index.scss';

interface Props {
  cardInfoList: CardModel[];
  handleGameCardClick: (idCard: number) => void;
}

const gameName = () => {
  return ['f' , null, null, null,
          null, null,  'o', null,
           'c',  'u', null, null,
          null, null, null, 's'];
};

const GameCardList: React.FC<Props> = (props: Props) => {
  const { cardInfoList, handleGameCardClick } = props;
  return (
    <div className="game-card-list-container">
      {cardInfoList.map(
        (cardInfo, index) => (
          <GameCard
            cardInfo={cardInfo}
            handleGameCardClick={handleGameCardClick}
            key={cardInfo.idCard}
            gameNameLetter={gameName()[index]}
          />
        )
      )}
    </div>
  );
};

export default GameCardList;

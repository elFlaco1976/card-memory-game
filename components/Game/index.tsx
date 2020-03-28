/* eslint-disable no-plusplus */
import React, { Component } from 'react';
import shuffle from 'lodash.shuffle';
import CardModel from '../../types/CardModel';
import GameStatusNames from '../../types/GameStatus';
import GameCardList from '../GameCardList/index';
import Layout from '../Layout/index';
import './index.scss';
import CardStatus from '../../types/CardStatus';
import Score from '../Score';
import ModalStartGame from '../ModalStartGame/index';

interface State {
  cardDeck: CardModel[];
  gameState: GameStatusNames;
  modalVisible: boolean;
}

export default class Game extends Component<object, State> {
  firstSelectedCardId: number | null;

  secondSelectedCardId: number | null;

  score: number;

  constructor(props: object) {
    super(props);
    this.state = {
      cardDeck: [],
      gameState: GameStatusNames.intro,
      modalVisible: true,
    };
    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.score = 0;
  }

  componentDidMount() {
    this.loadGame();
  }

  loadGame = () => {
    this.setState({
      cardDeck: this.buildCardDeck(),
      gameState: GameStatusNames.waitingFirstCardSelection,
    });
  }

  handleGameCardClick = (idCard: number) => {
    const { gameState } = this.state;

    if (gameState !== GameStatusNames.waitingFirstCardSelection
      && gameState !== GameStatusNames.waitingSecondCardSelection) {
      return;
    }

    if (gameState === GameStatusNames.waitingFirstCardSelection) {
      this.firstSelectedCardId = idCard;
    } else {
      this.secondSelectedCardId = idCard;
    }

    if (gameState === GameStatusNames.waitingFirstCardSelection) {
      this.handleStateForFirstCardSelected();
    } else if (gameState === GameStatusNames.waitingSecondCardSelection) {
      this.handleStateForSecondCardSelected();
    }
  }

  handleStateAfterEndOfTurn = () => {
    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.setState((prevState) => {
      let updatedCards = prevState.cardDeck;
      if (prevState.gameState === GameStatusNames.cardsDontMatch) {
        updatedCards = this.hideVisibleCards(updatedCards);
      }
      return {
        cardDeck: updatedCards,
        gameState: GameStatusNames.waitingFirstCardSelection,
      };
    });
  }

  hideVisibleCards = (cards: CardModel[]) => {
    const cardsUpdated = [...cards];
    for (let index = 0; index < cardsUpdated.length; index++) {
      cardsUpdated[index].status = cardsUpdated[index].status === CardStatus.visible 
        ? CardStatus.hidden : cardsUpdated[index].status;
    }
    return cardsUpdated;
  }

  updateCardStateForSelectedCards = (
    selectedCardIds: (number | null)[],
    cards: CardModel[],
    cardState: CardStatus
  ) => {
    const currentCards = [...cards];
    selectedCardIds.forEach((id) => {
      if (id !== null) {
        currentCards[id].status = cardState;
      }
    });
    return currentCards;
  }

  cardPairIsMatching = (cards: CardModel[]) => {
    if (this.firstSelectedCardId !== null && this.secondSelectedCardId !== null) {
      return cards[this.firstSelectedCardId].idImage === cards[this.secondSelectedCardId].idImage;
    }
    return false;
  }

  getImagesUrl = () => {
    return [
      'https://cdn.pixabay.com/photo/2016/06/19/07/40/pig-1466275_960_720.jpg',
      'https://cdn.pixabay.com/photo/2015/01/30/09/35/animals-617305_640.jpg',
      'https://images.pexels.com/photos/56847/lion-panthera-leo-lioness-animal-world-56847.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
      'https://cdn.pixabay.com/photo/2018/07/31/22/08/lion-3576045_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/01/14/12/59/iceland-1979445_1280.jpg',
      'https://cdn.pixabay.com/photo/2016/12/05/11/39/fox-1883658_1280.jpg',
      'https://cdn.pixabay.com/photo/2017/10/20/10/58/elephant-2870777_1280.jpg',
      'https://cdn.pixabay.com/photo/2014/08/29/03/02/horse-430441_1280.jpg',
    ];
  }

  buildCardDeck = () => {
    const images = this.getImagesUrl();
    const firstHalf = images.map((img, index) => new CardModel(img, index, 0));
    const secondHalf = images.map((img, index) => new CardModel(img, index, 0));
    const cardDeck = shuffle([...firstHalf, ...secondHalf]);
    for (let index = 0; index < cardDeck.length; index++) {
      cardDeck[index].idCard = index;
    }
    return cardDeck;
  }


  handleStartGameButton = () => {
    this.setState({ modalVisible: false });
  }

  private handleStateForSecondCardSelected() {
    this.setState((prevState) => {
      let updatedCards: CardModel[] = [];
      const cardPairIsMatching = this.cardPairIsMatching(prevState.cardDeck);
      if (cardPairIsMatching) {
        updatedCards = this.updateCardStateForSelectedCards(
          [this.firstSelectedCardId, this.secondSelectedCardId],
          prevState.cardDeck, CardStatus.matched
        );
        this.score += 2;
      } else {
        updatedCards = this.updateCardStateForSelectedCards(
          [this.secondSelectedCardId], prevState.cardDeck, CardStatus.visible
        );
      }
      setTimeout(this.handleStateAfterEndOfTurn, 2000);
      return {
        cardDeck: updatedCards,
        gameState: cardPairIsMatching ? GameStatusNames.cardsMatch : GameStatusNames.cardsDontMatch,
      };
    });
  }

  private handleStateForFirstCardSelected() {
    this.setState((prevState) => {
      const updatedCards = this.updateCardStateForSelectedCards(
        [this.firstSelectedCardId], prevState.cardDeck, CardStatus.visible);
      return {
        cardDeck: updatedCards,
        gameState: GameStatusNames.waitingSecondCardSelection,
      };
    });
  }

  render() {
    const { cardDeck, gameState, modalVisible } = this.state;
    return (
      <Layout>
        <ModalStartGame
          handleStartGameButton={this.handleStartGameButton}
          modalIsOpen={modalVisible}
        />
        <Score score={this.score} totalCards={cardDeck.length} />
        <GameCardList cardInfoList={cardDeck} handleGameCardClick={this.handleGameCardClick} />
        {gameState === GameStatusNames.cardsMatch && (
          <div>Jolines, bien hecho!!</div>
        )}
        {gameState === GameStatusNames.cardsDontMatch && (
          <div>Gilipollas, intenta otra vez!!</div>
        )}
      </Layout>
    );
  }
}

/* eslint-disable no-plusplus */
import React, { Component } from "react";
import shuffle from "lodash.shuffle";
import CardModel from "../../types/CardModel";
import GameStatusNames from "../../types/GameStatus";
import GameCardList from "../GameCardList/index";
import Layout from "../Layout/index";
import "./index.scss";
import CardStatus from "../../types/CardStatus";
import Score from "../Score";
import { getImagesUrl } from "../../utils/images";

interface State {
  cardDeck: CardModel[];
  gameState: GameStatusNames;
  gameTimer: number;
}

export default class Game extends Component<object, State> {
  firstSelectedCardId: number | null;

  secondSelectedCardId: number | null;

  score: number;

  isFirstMove: boolean;

  gameTimerReference: number;

  constructor(props: object) {
    super(props);
    this.state = {
      cardDeck: [],
      gameState: GameStatusNames.intro,
      gameTimer: 0,
    };
    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.score = 0;
    this.isFirstMove = false;
    this.gameTimerReference = 0;
  }

  componentDidMount() {
    this.loadGame();
  }

  loadGame = () => {
    this.setState({
      cardDeck: this.buildCardDeck(),
      gameState: GameStatusNames.waitingFirstCardSelection,
    });
  };

  handleGameCardClick = (idCard: number) => {
    const { gameState } = this.state;
    const gameNotWaitingForCardSelection =
      gameState !== GameStatusNames.waitingFirstCardSelection &&
      gameState !== GameStatusNames.waitingSecondCardSelection;
    if (gameNotWaitingForCardSelection) {
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
  };

  handleStateAfterEndOfTurn = () => {
    this.firstSelectedCardId = null;
    this.secondSelectedCardId = null;
    this.setState((prevState) => {
      let updatedCards = prevState.cardDeck;
      if (prevState.gameState === GameStatusNames.cardsDontMatch) {
        updatedCards = this.hideVisibleCards(updatedCards);
      }
      let gameState =
        this.score === prevState.cardDeck.length
          ? GameStatusNames.end
          : GameStatusNames.waitingFirstCardSelection;
      this.clearIfGameStatusIsEnd(gameState);
      return {
        cardDeck: updatedCards,
        gameState,
      };
    });
  };

  clearIfGameStatusIsEnd = (newGameState: GameStatusNames) => {
    if (newGameState === GameStatusNames.end) {
      clearInterval(this.gameTimerReference);
    }
  };

  hideVisibleCards = (cards: CardModel[]) => {
    const cardsUpdated = [...cards];
    for (let index = 0; index < cardsUpdated.length; index++) {
      cardsUpdated[index].status =
        cardsUpdated[index].status === CardStatus.visible
          ? CardStatus.hidden
          : cardsUpdated[index].status;
    }
    return cardsUpdated;
  };

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
  };

  cardPairIsMatching = (cards: CardModel[]) => {
    if (
      this.firstSelectedCardId !== null &&
      this.secondSelectedCardId !== null
    ) {
      return (
        cards[this.firstSelectedCardId].idImage ===
        cards[this.secondSelectedCardId].idImage
      );
    }
    return false;
  };

  buildCardDeck = () => {
    const images = getImagesUrl();
    const firstHalf = images.map((img, index) => new CardModel(img, index, 0));
    const secondHalf = images.map((img, index) => new CardModel(img, index, 0));
    const cardDeck = shuffle([...firstHalf, ...secondHalf]);
    for (let index = 0; index < cardDeck.length; index++) {
      cardDeck[index].idCard = index;
    }
    return cardDeck;
  };

  updateGameTimer = () => {
    this.setState((prevState) => ({
      gameTimer: prevState.gameTimer + 1,
    }));
  };

  startGameTimerIfFirstMove = () => {
    if (!this.isFirstMove) {
      this.gameTimerReference = window.setInterval(this.updateGameTimer, 1000);
      this.isFirstMove = true;
    }
  };

  private handleStateForSecondCardSelected() {
    this.setState((prevState) => {
      let updatedCards: CardModel[] = [];
      const cardPairIsMatching = this.cardPairIsMatching(prevState.cardDeck);
      if (cardPairIsMatching) {
        updatedCards = this.updateCardStateForSelectedCards(
          [this.firstSelectedCardId, this.secondSelectedCardId],
          prevState.cardDeck,
          CardStatus.matched
        );
        this.score += 2;
      } else {
        updatedCards = this.updateCardStateForSelectedCards(
          [this.secondSelectedCardId],
          prevState.cardDeck,
          CardStatus.visible
        );
      }
      setTimeout(this.handleStateAfterEndOfTurn, 1000);
      return {
        cardDeck: updatedCards,
        gameState: cardPairIsMatching
          ? GameStatusNames.cardsMatch
          : GameStatusNames.cardsDontMatch,
      };
    });
  }

  private handleStateForFirstCardSelected() {
    this.startGameTimerIfFirstMove();

    this.setState((prevState) => {
      const updatedCards = this.updateCardStateForSelectedCards(
        [this.firstSelectedCardId],
        prevState.cardDeck,
        CardStatus.visible
      );
      return {
        cardDeck: updatedCards,
        gameState: GameStatusNames.waitingSecondCardSelection,
      };
    });
  }

  render() {
    const { cardDeck, gameState, gameTimer } = this.state;
    return (
      <Layout>
        <Score
          score={this.score}
          totalCards={cardDeck.length}
          isGameFinished={gameState === GameStatusNames.end}
          gameTimer={gameTimer}
        />
        <GameCardList
          cardInfoList={cardDeck}
          handleGameCardClick={this.handleGameCardClick}
        />
      </Layout>
    );
  }
}

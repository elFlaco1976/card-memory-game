import CardStatus from './CardStatus';

export default class CardModel {
  image: string;

  status: CardStatus;

  idImage: number;

  idCard: number;

  constructor(image: string, idImage = 0, idCard = 0) {
    this.image = image;
    this.idImage = idImage;
    this.idCard = idCard;
    this.status = CardStatus.hidden;
  }
}

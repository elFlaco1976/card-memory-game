import React from 'react';
//import Modal from '../Modal/index';
import { Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import './index.scss';

interface Props {
  handleStartGameButton: () => void;
  modalIsOpen: boolean;
}

const ModalStartGame: React.FC<Props> = (props: Props) => {
  const { handleStartGameButton, modalIsOpen } = props;
  return (
    <Modal isOpen={modalIsOpen}>
      <ModalBody>
        <p className="modal-start-content">Exercise your memory!</p>
      </ModalBody>
      <ModalFooter>
        <button type="button" className="primary" onClick={handleStartGameButton}>Start</button>
      </ModalFooter>
    </Modal>
  );
};

/* const ModalStartGame: React.FC<Props> = (props: Props) => {
  const { handleStartGameButton } = props;
  return (
    <Modal>
      {{
        content: (
          <p className="modal-start-content">Exercise your memory!</p>
        ),
        actions: (
          <button type="button" className="primary" onClick={handleStartGameButton}>Start</button>
        ),
      }}
    </Modal>
  );
}; */

export default ModalStartGame;

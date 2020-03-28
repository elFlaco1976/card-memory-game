import React, { ReactNode } from 'react';
import { Modal, ModalBody, Button } from 'reactstrap';
import './index.scss';

interface Props {
  children: {
    content: ReactNode;
    actions: ReactNode;
  };
}

// TODO - remove this component

const Modal: React.FC<Props> = (props: Props) => {
  const { content, actions } = props.children;
  return (
    <div className="modal">
      <div className="modal-container">
          { content }
          { actions }
      </div>
    </div>
  );
};

export default Modal;

import './modal.css';
import { createPortal } from 'react-dom';
import { Component } from 'react';

const modalRoot = document.querySelector('#modal-root');

export default class Modal extends Component {
  closeModal = e => {
    if (e.code === 'Escape') this.props.onClose();
    if (e.target === e.currentTarget) this.props.onClose();
  };

  componentDidMount() {
    window.addEventListener('keydown', this.closeModal);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.closeModal);
  }

  render() {
    return createPortal(
      <div className="overlay" onClick={this.closeModal}>
        <div className="modal">
          <img src={this.props.largeImageUrl} alt="" />
        </div>
      </div>,
      modalRoot
    );
  }
}

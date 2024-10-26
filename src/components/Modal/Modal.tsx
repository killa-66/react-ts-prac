import { FC, ReactNode, useEffect } from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';
import ModalOverlay from './ModalOverlay/ModalOverlay';
import { Button, CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components';

interface Props {
  onClose: () => void;
  children: ReactNode;
  title?: string;
}

const Modal: FC<Props> = ({ onClose, children, title }) => {
  useEffect(() => {
    const handleEscPress = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEscPress);

    return () => {
      document.removeEventListener('keydown', handleEscPress);
    };
  }, [onClose]);

  return ReactDOM.createPortal(
    <>
      <ModalOverlay onClose={onClose} />
      <div className={`${styles.modal} pt-10 pr-10 pl-10 pb-15`} onClick={(e) => e.stopPropagation()}>
        <div className={styles.header}>
          <h2 className={`text text_type_main-large ${styles.title}`}>{title}</h2>
          <button type='button' onClick={onClose} className={styles.closeButton}>
            <CloseIcon type="primary" />
          </button>
        </div>
        {children}
      </div>
    </>,
    document.getElementById('modal-root') as HTMLElement
  );
};

export default Modal;

import styles from './modal-overlay.module.css';

export const ModalOverlayUI = ({
  onClick,
  ...props
}: {
  onClick: () => void;
}) => <div className={styles.overlay} onClick={onClick} {...props} />;

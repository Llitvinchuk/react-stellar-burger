import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

type TModalOverlayProps = {
  onClose: () => void;
};

const ModalOverlay = ({ onClose }: TModalOverlayProps) => {
  return <div onClick={onClose} className={styles.overlay}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

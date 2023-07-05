import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";

const Modal = ({ children, onClose, title }) => {
  return (
    <ModalOverlay onClose={onClose}>
      <div className={styles.container}>
        <div className={`${styles.title}`}>
          <p className={`text text_type_main-large`}>{title}</p>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
        {children}
      </div>
    </ModalOverlay>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
};

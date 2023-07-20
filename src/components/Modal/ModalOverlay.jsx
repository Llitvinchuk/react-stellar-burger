import { useEffect, useRef } from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ onClose }) => {
  const overflowZone = useRef(null);

  const closeWhenClickOnOverflow = (e) => {
    if (overflowZone.current === e.target) {
      onClose();
    }
  };

  useEffect(() => {
    document.addEventListener("click", closeWhenClickOnOverflow);
    return () => {
      document.removeEventListener("click", closeWhenClickOnOverflow);
    };
  }, []);

  return <div onClick={onClose} className={styles.overlay}></div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

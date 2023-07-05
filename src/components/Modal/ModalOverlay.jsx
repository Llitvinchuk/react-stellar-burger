import { useEffect, useRef } from "react";
import styles from "./ModalOverlay.module.css";
import PropTypes from "prop-types";

const ModalOverlay = ({ children, onClose }) => {
  const overflowZone = useRef(null);
  const closeWhenClickOnOverflow = (e) => {
    if (overflowZone.current === e.target) {
      onClose();
    }
  };

  const closeWhenPressEscape = (e) => {
    if (e.code === "Escape") onClose();
  };
  useEffect(() => {
    document.addEventListener("click", closeWhenClickOnOverflow);
    document.addEventListener("keydown", closeWhenPressEscape);
    return () => {
      document.removeEventListener("click", closeWhenClickOnOverflow);
      document.removeEventListener("keydown", closeWhenPressEscape);
    };
  }, []);
  return <div className={styles.overlay}>{children}</div>;
};

export default ModalOverlay;

ModalOverlay.propTypes = {
  onClose: PropTypes.func.isRequired,
};

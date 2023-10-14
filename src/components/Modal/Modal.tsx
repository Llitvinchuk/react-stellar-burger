import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "./ModalOverlay";
import styles from "./Modal.module.css";
import PropTypes from "prop-types";
import { FC, PropsWithChildren, useEffect } from "react";

type TModalProps = {
  onClose: () => void;
  title: string;
};

const Modal: FC<PropsWithChildren<TModalProps>> = ({
  children,
  onClose,
  title,
}) => {
  const closeWhenPressEscape = (e: KeyboardEvent) => {
    if (e.code === "Escape") onClose();
  };
  useEffect(() => {
    document.addEventListener("keydown", closeWhenPressEscape);
    return () => {
      document.removeEventListener("keydown", closeWhenPressEscape);
    };
  }, []);

  return (
    <>
      <ModalOverlay onClose={onClose} />
      <div className={styles.container}>
        {children}
        <div className={`${styles.title}`}>
          <p className={`text text_type_main-large`}>{title}</p>
          <CloseIcon onClick={onClose} type="primary" />
        </div>
      </div>
    </>
  );
};

export default Modal;

Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
};

import React from "react";
import styles from "./style.module.scss";

const STYLES = [
  // SOLID
  "btn--primary--solid",
  "btn--warning--solid",
  "btn--danger--solid",
  "btn--success--solid",
  // OUTLINE
  "btn--primary--outline",
  "btn--warning--outline",
  "btn--danger--outline",
  "btn--success--outline",
];

const SIZES = ["btn--medium", "btn--small"];

export const Button = ({
  children,
  type,
  disabled,
  onClick,
  buttonStyle,
  buttonSize,
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];
  const checkButtonSize = STYLES.includes(buttonSize) ? buttonSize : SIZES[0];

  return (
    <button
      className={`${styles.btn} ${styles[checkButtonStyle]} ${styles[checkButtonSize]}`}
      onClick={onClick}
      type={type}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

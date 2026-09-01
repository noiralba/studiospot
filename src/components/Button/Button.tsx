import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.scss";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  type = "button",
  children,
  ...props
}: ButtonProps) {
  return (
    <button type={type} className={styles.submit} {...props}>
      {children}
    </button>
  );
}

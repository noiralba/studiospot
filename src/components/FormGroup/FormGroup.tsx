import type { InputHTMLAttributes } from "react";
import styles from "./FormGroup.module.scss";

interface FormGroupProps extends InputHTMLAttributes<HTMLInputElement> {
  id: string;
  label: string;
}

export default function FormGroup({
  id,
  label,
  type = "text",
  ...props
}: FormGroupProps) {
  return (
    <fieldset className={styles.group}>
      <label htmlFor={id} className={styles.label}>
        {label}
      </label>
      <input id={id} type={type} className={styles.input} {...props} />
    </fieldset>
  );
}

import { ReactNode, ButtonHTMLAttributes } from "react";
import styles from "./styles.module.scss";
import { ImSpinner2 } from "react-icons/im";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  loading?: boolean;
  children: ReactNode;
}

export function Button({ loading, children, ...rest }: ButtonProps) {
  return (
    <button className={styles.button} disabled={loading} {...rest}>
      {loading ? (
        <ImSpinner2 color="#fff" size={16} />
      ) : (
        <a className={styles.buttonText}>{children}</a>
      )}
    </button>
  );
}

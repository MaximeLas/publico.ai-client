import { forwardRef } from "react";
import clsx from "clsx";
import { HTMLProps } from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  showResizeGrip?: boolean;
}

const TextArea = forwardRef<HTMLTextAreaElement, TextAreaProps>(
  function TextArea({ className, showResizeGrip, ...rest }, ref) {
    const Cln = clsx(
      styles.textArea,
      !showResizeGrip && styles.resizeNone,
      className
    );
    return <textarea className={Cln} {...rest} />;
  }
);

export default TextArea;

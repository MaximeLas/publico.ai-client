import clsx from "clsx";
import { HTMLProps } from "react";
import styles from "./TextArea.module.css";

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
  showResizeGrip?: boolean;
}

function TextArea({ className, showResizeGrip, ...rest }: TextAreaProps) {
  const Cln = clsx(
    styles.textArea,
    className,
    !showResizeGrip && styles.resizeNone
  );
  return <textarea className={Cln} {...rest} />;
}

export default TextArea;

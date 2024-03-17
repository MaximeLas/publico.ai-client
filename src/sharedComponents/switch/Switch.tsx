import clsx from "clsx";
import { useRef, useState } from "react";
import styles from "./Switch.module.scss";

export interface SwitchProps
  extends Omit<React.HTMLProps<HTMLLabelElement>, "onChange"> {
  onChange?: (checked: boolean) => void;
  checked?: boolean;
  barProps?: React.HTMLProps<HTMLSpanElement>;
  thumbProps?: React.HTMLProps<HTMLSpanElement>;
}

function Switch({
    className,
  checked: propsChecked,
  onChange: propsOnChange,
  barProps,
  thumbProps,
  ...rest
}: SwitchProps) {
  const {
    className: barClassName,
    onClick: barOnClick,
    ...restBarProps
  } = barProps || {};
  const { className: thumbClassName, ...restThumbProps } = thumbProps || {};
  const [localChecked, setChecked] = useState(propsChecked ?? false);
  const checked = propsChecked ?? localChecked;
  const rootClsx = clsx(styles.root, className);
  const barClsx = clsx(styles.bar, "rounded rounded-pill", "border border-1 border-primary-subtle", barClassName);
  const thumbClsx = clsx(
    styles.thumb,
    checked && styles.thumbActive,
    "rounded-circle",
    thumbClassName
  );
  const inputRef = useRef<HTMLInputElement>(null);

  const onClick = (e: React.MouseEvent<HTMLSpanElement, MouseEvent>) => {
    const value = !checked;
    setChecked(value);
    propsOnChange?.(value);
    barOnClick?.(e);
  };

  return (
    <label
      tabIndex={0}
      {...rest}
      className={rootClsx}
      htmlFor="switch-input"
    >
      <input
        ref={inputRef}
        readOnly
        checked={checked}
        id="switch-input"
        type="checkbox"
        hidden
      />
      <span {...restBarProps} onClick={onClick} className={barClsx}>
        <span {...restThumbProps} className={thumbClsx} />
      </span>
    </label>
  );
}

export default Switch;

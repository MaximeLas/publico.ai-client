import { RefObject } from "react";

export default function useSubmit(ref: RefObject<HTMLElement>) {
  return () => {
    if (ref.current) {
      const input = document.createElement("input");
      input.type = "submit";
      input.hidden = true;
      ref.current.appendChild(input);
      input.click();
      if (input.isConnected) ref.current.removeChild(input);
    }
  };
}

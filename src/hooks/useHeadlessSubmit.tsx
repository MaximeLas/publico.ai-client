import { RefObject } from "react";

export default function useHeadlessSubmit(ref: RefObject<HTMLFormElement>) {
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

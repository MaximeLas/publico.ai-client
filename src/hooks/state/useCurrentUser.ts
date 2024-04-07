import useStore from "./useStore";

export default function useCurrentUser() {
  return useStore((state) => state.user);
}

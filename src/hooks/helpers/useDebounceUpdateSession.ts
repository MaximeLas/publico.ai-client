import useDB from '../useDB'
import useDebounce from './useDebounce';

function useDebounceUpdateSession(wait: number) {
  const { updateSession } = useDB();
  return useDebounce(updateSession, wait);
}

export default useDebounceUpdateSession
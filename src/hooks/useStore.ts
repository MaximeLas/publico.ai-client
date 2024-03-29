import { useStore as useVanillaStore } from 'zustand';
import { RootState } from '../state/types';
import useStoreApi from './useStoreApi';

function useStore(): RootState
function useStore<T>(selector: (state: RootState) => T): T
function useStore<T>(selector?: (state: RootState) => T)  {
    const store = useStoreApi();
    return useVanillaStore(store, selector!);
}

export default useStore;
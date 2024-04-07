import { StoreApi } from 'zustand';
import firebaseAuthEffects from './firebaseAuth';
import { RootState } from '../types';

export default function runStoreEffects(store: StoreApi<RootState>) {
  const unsubscribeFirebaseAuth = firebaseAuthEffects(store);

  return () => {
    unsubscribeFirebaseAuth();
  };
}
import { StoreApi } from 'zustand';
import firebaseAuthEffects from './firebaseAuth';
import { RootState } from '../types';
import dbEffects from './db';

export default function runStoreEffects(store: StoreApi<RootState>) {
  const unsubscribeFirebaseAuth = firebaseAuthEffects(store);
  // const unsubscribeDb = dbEffects(store);

  return () => {
    unsubscribeFirebaseAuth();
    // unsubscribeDb();
  };
}
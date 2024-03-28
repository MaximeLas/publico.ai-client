
export default interface IStateDTO<T, TModelType> {
  toState(model: TModelType): Partial<T>;
  fromState(state: T): TModelType | null;
  fromPartialState(state: Partial<T>): Partial<TModelType>;
}

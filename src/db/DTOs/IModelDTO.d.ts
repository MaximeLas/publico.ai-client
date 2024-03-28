
export default interface IModelDTO<T, TModelType> {
  toModel(instance: T): TModelType;
  fromModel(model: TModelType): T;
}
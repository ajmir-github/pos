import { ObjectId } from "mongodb";

export function generateId(id?: string) {
  return id ? new ObjectId(id) : new ObjectId();
}

export function withId<T extends {}>(doc: T) {
  return {
    _id: new ObjectId(),
    ...doc,
  };
}

export function parseId<T extends { id: string }>({ id, ...rest }: T) {
  return {
    _id: new ObjectId(id),
    ...rest,
  };
}

export function stringifyId<T extends { _id: ObjectId }>({ _id, ...rest }: T) {
  return {
    id: _id.toString(),
    ...rest,
  };
}

export function deepClone<T>(object: T) {
  return JSON.parse(JSON.stringify(object)) as T;
}

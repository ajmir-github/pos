import { Collection, Filter, ObjectId, WithId } from "mongodb";
import { database } from "./services";

interface Color {
  name: string;
  class: string;
  meta: {
    title: string;
    des: string;
  };
}

const colorCollection = database.collection<Color>("color-test");

type Truthy = 0 | 1 | true | false;

type Select<T> = {
  [K in keyof T]?: T[K] extends object ? Select<T[K]> | Truthy : Truthy;
};
type Project<T, S> = {
  [K in keyof S & keyof T]: S[K] extends Truthy
    ? T[K]
    : S[K] extends object
    ? T[K] extends object
      ? Project<T[K], S[K]>
      : never
    : never;
};

type ProjectWithId<T, S> = WithId<Project<T, S>>;

function find<Doc extends {}>(collection: Collection<Doc>) {
  function many<S extends Select<Doc>>(
    options: {
      where?: Filter<Doc>;
      limit?: number;
      skip?: number;
      select?: S;
    } = {}
  ): Promise<ProjectWithId<Doc, NonNullable<S>>[]> {
    const { limit, select, skip, where } = options;
    return collection
      .find(where || {}, { limit, skip, projection: select })
      .toArray() as any;
  }

  function oneById<S extends Select<Doc>>(
    id: string,
    options: { select?: S } = {}
  ): Promise<ProjectWithId<Doc, NonNullable<S>> | null> {
    const { select } = options;
    return collection.findOne({ _id: new ObjectId(id) } as any, {
      projection: select,
    }) as any;
  }
  function manyByIds<S extends Select<Doc>>(
    ids: string[],
    options: { select?: S } = {}
  ): Promise<ProjectWithId<Doc, NonNullable<S>> | null> {
    const { select } = options;
    return collection.findOne(
      { $or: ids.map((id) => ({ _id: new ObjectId(id) })) } as any,
      {
        projection: select,
      }
    ) as any;
  }

  return { many, oneById };
}

async function main() {
  const color = await find(colorCollection).oneById("asd", {
    select: {
      name: true,
      meta: {
        title: true,
      },
    },
  });
}

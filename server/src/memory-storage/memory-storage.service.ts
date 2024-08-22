type MemoryStorageKey = string | Buffer;
type MemoryStorageValue = string | number | Buffer;
export abstract class MemoryStorageService {
  abstract insert<
    TKey extends MemoryStorageKey,
    TValue extends MemoryStorageValue,
  >(key: TKey, value: TValue): Promise<string>;

  abstract validate<
    TKey extends MemoryStorageKey,
    TValue extends MemoryStorageValue,
  >(key: TKey, value: TValue): Promise<boolean>;

  abstract remove<TKey extends MemoryStorageKey>(key: TKey): Promise<number>;

  abstract get<TKey extends MemoryStorageKey>(key: TKey): Promise<string>;

  abstract pushToList<
    TKey extends MemoryStorageKey,
    TValue extends MemoryStorageValue,
  >(key: TKey, ...values: TValue[]): Promise<number>;

  abstract getList<
    TKey extends MemoryStorageKey,
    TStart extends string | number,
    TEnd extends string | number,
  >(key: TKey, startIndex: TStart, endIndex: TEnd): Promise<string[]>;

  abstract getElIndexFromList<
    TKey extends MemoryStorageKey,
    TElement extends string | number | Buffer,
  >(key: TKey, element: TElement): Promise<number>;

  abstract removeElFromList<
    TKey extends MemoryStorageKey,
    TElement extends string | number | Buffer,
    TCount extends number | string,
  >(key: TKey, element: TElement, count: TCount): Promise<number>;

  abstract pushToSet<
    TKey extends MemoryStorageKey,
    TValue extends MemoryStorageValue,
  >(key: TKey, ...values: TValue[]): Promise<number>;

  abstract getSetMembers<TKey extends MemoryStorageKey>(
    key: TKey,
  ): Promise<string[]>;

  abstract removeElFromSet<
    TKey extends MemoryStorageKey,
    TValue extends string | number | Buffer,
  >(key: TKey, ...elements: TValue[]): Promise<number>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type TIndexed<T = any> = {
  [key in string]: T;
};

function merge(lhs: TIndexed, rhs: TIndexed): TIndexed {
  for (const p in rhs) {
    if (!Object.prototype.hasOwnProperty.call(rhs, p)) {
      continue;
    }

    try {
      if (rhs[p].constructor === Object) {
        rhs[p] = merge(lhs[p] as TIndexed, rhs[p] as TIndexed);
      } else {
        lhs[p] = rhs[p];
      }
    } catch (e) {
      lhs[p] = rhs[p];
    }
  }

  return lhs;
}

export function set(
  object: TIndexed | unknown,
  path: string,
  value: unknown
): TIndexed | unknown {
  if (typeof object !== 'object' || object === null) {
    return object;
  }

  if (typeof path !== 'string') {
    throw new Error('path must be string');
  }

  const result = path.split('.').reduceRight<TIndexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    value as any
  );
  return merge(object as TIndexed, result);
}

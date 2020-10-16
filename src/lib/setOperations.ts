export function union<T>(setA: Set<T>, setB: Set<T>) {
  let _union = new Set(setA);

  for (let elem of setB) {
    _union.add(elem);
  }

  return _union;
}

export function intersection<T>(setA: Set<T>, setB: Set<T>) {
  let _intersection = new Set();

  for (let elem of setB) {
    if (setA.has(elem)) {
      _intersection.add(elem);
    }
  }

  return _intersection;
}

export function symmetricDifference<T>(setA: Set<T>, setB: Set<T>) {
  let _difference = new Set(setA);

  for (let elem of setB) {
    if (_difference.has(elem)) {
      _difference.delete(elem);
    } else {
      _difference.add(elem);
    }
  }

  return _difference;
}

export function difference<T>(setA: Set<T>, setB: Set<T>) {
  let _difference = new Set(setA);

  for (let elem of setB) {
    _difference.delete(elem);
  }

  return _difference;
}

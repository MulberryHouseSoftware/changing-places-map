import React from "react";

export function usePrevious<T>(value: T): T {
  const ref = React.useRef<any>();

  React.useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
}

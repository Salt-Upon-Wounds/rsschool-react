import { useState, useEffect } from "react";

export function useLS(
  initial?: string | null,
): [string, (val: string) => void] {
  const [LSvalue, setLSvalue] = useState(
    initial ?? localStorage.getItem("TaskSearch") ?? "",
  );

  useEffect(() => {
    localStorage.setItem("TaskSearch", LSvalue);
    return () => {
      localStorage.setItem("TaskSearch", LSvalue);
    };
  }, [LSvalue, setLSvalue]);

  return [LSvalue, setLSvalue];
}

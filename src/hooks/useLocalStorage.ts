import { useEffect } from "react";


export function useLocalStorage<T>(key: string, value: T) {
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);
}

  // Se ejecuta cada vez que "value" cambia.
  // Garantiza que el localStorage esté siempre actualizado.
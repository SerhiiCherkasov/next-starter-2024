import { useEffect, useState } from "react";

// todo - debug it
export function useDebounce<T extends Function>(func: T, delay: number): T {
  const [debouncedFunc, setDebouncedFunc] = useState<T>(func);
  
  useEffect(() => {
    clearTimeout(timeoutId);
    const timeoutId = setTimeout(() => {
      setDebouncedFunc(func)
    }, delay)
    
    return () => clearTimeout(timeoutId);
  }, [func, delay]);
  
  return debouncedFunc;
} 
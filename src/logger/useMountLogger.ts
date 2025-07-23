// hooks/useMountLogger.ts
import { useEffect } from 'react';
import { useRoute } from '@react-navigation/native';

export const useMountLogger = () => {
  const route = useRoute();

  useEffect(() => {
    const start = performance.now();
    return () => {
      const time = (performance.now() - start).toFixed(2);
      console.log(`[${route.name}] mount -> ${time}ms`);
    };
  }, []);
};

import axios from 'axios';
import { useEffect, useState } from 'react';

export function useAxios<T>(endpoint: string, initialState: T): [T, boolean] {
  const [data, setData] = useState(initialState);
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchData(): Promise<void> {
      setLoading(true);
      // TODO: import the baseUrl from a constant
      const url = `http://localhost:3000/${endpoint}`;
      const result = await axios.get<T>(url);
      setData(result.data);
      setLoading(false);
    }

    fetchData();
  }, [endpoint]);

  return [data, isLoading];
}

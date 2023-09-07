import axios from "axios";
import { useEffect, useMemo, useState } from "react";

export function useSnippets({ accessToken }: { accessToken: string }) {
  const [data, setData] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!accessToken) return;

    setIsLoading(true);
    axios
      .get(`${process.env.REACT_APP_API_ENDPOINT}/analyze?token=${accessToken}`)
      .then((response) => {
        setData(response.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [accessToken]);

  const value = useMemo(
    () => ({
      data,
      isLoading,
    }),
    [data, isLoading]
  );

  return value;
}

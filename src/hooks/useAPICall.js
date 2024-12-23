import { useState } from "react";

const useAPICall = () => {
  const [isLoading, setIsLoading] = useState(false);

  return {
    simulateAPICall: () => {
      return new Promise((resolve) => {
        setIsLoading(true);
        setTimeout(() => {
          resolve();
          setIsLoading(false);
        }, 1000);
      });
    },
    isLoading,
  };
};

export default useAPICall;

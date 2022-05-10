import { useState } from "react";

const useLocalStorage = <T>() => {
  const [data, setStateData] = useState<T>();

  const getData = (key: string) => {
    let value = localStorage.getItem(key);
    if (value && value !== "undefined") {
      setStateData(JSON.parse(value));
    }
  };

  const setData = (key: string, data: any) => {
    localStorage.setItem(key, JSON.stringify(data));
  };
  return { data, getData, setData };
};

export default useLocalStorage;

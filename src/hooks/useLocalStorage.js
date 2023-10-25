import { useState } from "react";

const useLocalStorage = (key, defaultValue) => {
  const [value, setValue] = useState(
    localStorage.getItem(key) || defaultValue
  );

  const setValueLocally = (newValue) => {
    setValue(newValue);
    localStorage.setItem(key, newValue);
  };

  const removeValueLocally = () => {
    setValue(null);
    localStorage.removeItem(key);
  }

  return {
    value,
    setValue: setValueLocally,
    removeValueLocally
  };
};

export default useLocalStorage;

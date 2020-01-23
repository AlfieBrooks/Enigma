import { useState } from 'react';

export const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  return {
    value,
    setValue,
    bind: {
      value,
      onChange: e => setValue(e.target.value)
    }
  };
};

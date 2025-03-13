import { useEffect, useState } from 'react';

const useUrlPrefix = () => {
  const [prefix, setPrefix] = useState('');

  useEffect(() => {
    if (process.env.GITHUB_ACTIONS) {
      const newPrefix = (process.env.GITHUB_REPOSITORY ?? '').replace(/.*?\//, '');
      setPrefix(newPrefix);
    }
  }, []);

  return prefix;
};

export default useUrlPrefix;


import { useEffect } from 'react';
import useLocalStorage from './useLocalStorage';

type Theme = 'light' | 'dark';

const useTheme = (): [Theme, () => void] => {
  const [theme, setTheme] = useLocalStorage<Theme>('ztockify_theme', 
    (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) ? 'dark' : 'light'
  );

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const root = window.document.documentElement;
      const isDark = theme === 'dark';
      
      root.classList.toggle('dark', isDark);
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return [theme, toggleTheme];
}

export default useTheme;

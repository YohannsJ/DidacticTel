import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '../../context/ThemeContext.jsx';
import './ThemeToggle.css';

/**
 * Componente ThemeToggle - Botón para cambiar entre temas
 */
export function ThemeToggle({ className = '', style = {} }) {
  const { currentTheme, toggleTheme } = useTheme();
  const isDark = currentTheme === 'dark';
  const previousThemeRef = useRef(currentTheme);
  const [thumbAnimationClass, setThumbAnimationClass] = useState('');

  useEffect(() => {
    if (previousThemeRef.current === currentTheme) return;

    setThumbAnimationClass(isDark ? 'theme-toggle-thumb-to-dark' : 'theme-toggle-thumb-to-light');
    previousThemeRef.current = currentTheme;

    const timeoutId = setTimeout(() => {
      setThumbAnimationClass('');
    }, 360);

    return () => clearTimeout(timeoutId);
  }, [currentTheme, isDark]);
  
  return (
    <button
      onClick={toggleTheme}
      className={`theme-toggle-switch ${isDark ? 'is-dark' : 'is-light'} ${className}`}
      style={style}
      aria-label={`Cambiar a tema ${isDark ? 'claro' : 'oscuro'}`}
      aria-pressed={isDark}
      title={`Cambiar a tema ${currentTheme === 'dark' ? 'claro' : 'oscuro'}`}
    >
      <span className="theme-toggle-track" aria-hidden="true">
        <span className="theme-toggle-icon theme-toggle-icon-sun">☀</span>
        <span className="theme-toggle-icon theme-toggle-icon-moon">☾</span>
        <span className={`theme-toggle-thumb ${thumbAnimationClass}`} />
      </span>
    </button>
  );
}

export default ThemeToggle;

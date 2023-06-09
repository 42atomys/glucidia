'use client';

import { faMoonStars, faSunBright } from '@fortawesome/pro-duotone-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import { useTheme } from 'next-themes';

export const ThemeIcon = ({ className }: { className?: string }) => {
  const { theme, setTheme } = useTheme();
  return (
    <button
      type="button"
      className={classNames(
        'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-slate-200 dark:focus:ring-slate-700 rounded-lg text-lg p-2 m-2',
        className
      )}
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
    >
      {(theme === 'dark' && (
        <FontAwesomeIcon icon={faMoonStars} className="fa-fw" />
      )) || <FontAwesomeIcon icon={faSunBright} className="fa-fw" />}
    </button>
  );
};

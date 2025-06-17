import { useTheme } from './themeProvider';
import { FaSun, FaMoon } from "react-icons/fa";
import './themeProvider.css';

export const ThemeSwitcher = () => {
    const { theme, toggleTheme } = useTheme();

    return(
        <button 
         onClick={toggleTheme}
         className={theme === 'light' ? "toggle-light" : "toggle-dark"}>
            {theme === 'light' ? (
                <FaMoon className='moon' />
            ) : (
                <FaSun className='sun' />
            )}
        </button>
    )
}
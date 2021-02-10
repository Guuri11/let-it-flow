import { atom, selector } from "recoil";

/**
 * check theme value
 */
export const dark_mode = selector({
    key: "is_dark_mode",
    get: () => {
    	const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme'): null ;
        if (currentTheme) {
            document.documentElement.setAttribute('data-theme', currentTheme);
			if (currentTheme === 'dark') 
			    return true
        }
    }
})

export const switch_theme_app = atom({
    key: 'switchTheme',
    default: (e) => {
        if (e.checked) {
			document.documentElement.setAttribute('data-theme', 'dark');
  	      	localStorage.setItem('theme', 'dark');
  	  	}
  	  	else {
			document.documentElement.setAttribute('data-theme', 'light');
  	      	localStorage.setItem('theme', 'light');
  	  	}
    }
})
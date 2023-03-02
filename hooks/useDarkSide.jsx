import { useState, useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { dark, light } from "../slices/ThemeSlice"

export default function useDarkSide() {
	const [theme, setTheme] = useState(
		typeof window !== 'undefined' 
		? localStorage.theme 
		: 'ligth'
	)
	
	// const dispatch = useDispatch()
	const colorTheme = theme === "dark" 
		? "light"  
		: "dark"

	const dispatch = useDispatch()	
	useEffect(() => {
		if(colorTheme === 'dark') {
			dispatch(dark())
		} else {
			dispatch(light())
		}
	},[colorTheme, theme]);


	useEffect(() => {
		const root = window.document.documentElement;
		root.classList.remove(colorTheme);
		root.classList.add(theme);

		localStorage.setItem('theme', theme);
	}, [theme, colorTheme]);

	return [colorTheme, setTheme]
}

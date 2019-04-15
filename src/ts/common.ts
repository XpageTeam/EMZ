require("../sss/main.sss")
import "./main-page"
import "./standart-page"
import "./tovar"
import "./vacancy"
import "./serts"
// import "./mobile-menu"

import {App, EventListener, MobileMenu} from "./app"

interface window extends Window{
	menu: MobileMenu
}

App.domReady(() => {
	new EventListener(".h-search__submit").add("click", function(el: HTMLElement, event: Event){
		const textInput: HTMLInputElement = el.closest("form").querySelector(".h-search__input")

		if (!textInput.value){
			textInput.focus()

			event.preventDefault()
		}
	})

	new MobileMenu({
		burger: ".head__burger",
		menu: ".footer__right",
		menuActiveClass: "js__opened",
		bodyActiveClass: "js__menu__opened",
		ignoreWarnings: false,
		fixBody: true,
		media: "(max-width: 1000px)"
	})
})
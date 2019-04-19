require("../sss/main.sss")
import "./main-page"
import "./standart-page"
import "./tovar"
import "./vacancy"
import "./serts"
import "./head"
// import "./mobile-menu"

const adaptiveMedia: string = "(max-width: 1000px)";

import {App, EventListener, MobileMenu, Element} from "./app"

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
		media: adaptiveMedia
	})
})

App.domReady(() => {
	App.each(".f-menu", (el: HTMLElement) => {
		const menu: Element = new Element(el);

		if (menu.find(".f-menu__item:not(.f-menu__item--parent)").length){
			menu.addClass("js__have-submenu")

			new EventListener(menu.find(".f-menu__item--parent")).add("click", (el: HTMLElement, event: Event) => {

				new Element(".f-menu").removeClass("js__opened")
				menu.toggleClass("js__opened")

				if (window.matchMedia(adaptiveMedia).matches)
					event.preventDefault()

			})
		}
	})

})
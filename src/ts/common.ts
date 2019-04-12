require("../sss/main.sss")
import "./main-page"
import "./standart-page"
import "./tovar"
import "./vacancy"
import "./serts"

import {App, EventListener} from "./app"

App.domReady(() => {
	new EventListener(".h-search__submit").add("click", function(el: HTMLElement, event: Event){
		const textInput: HTMLInputElement = el.closest("form").querySelector(".h-search__input")

		if (!textInput.value){
			textInput.focus()

			event.preventDefault()
		}
	})
})
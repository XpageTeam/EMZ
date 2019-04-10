import {App, EventListener} from "./app"

require("../sss/vacancy.sss")

App.domReady(() => {
	new EventListener(".vacancy-one__title").add("click", function(el: HTMLElement){
		if (el.classList.contains("js__active"))
			el.classList.remove("js__active")
		else{
			App.each(".vacancy-one__title", (el: HTMLElement) => {
				el.classList.remove("js__active")
			})
			el.classList.add("js__active")
		}
	})
})
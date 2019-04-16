import {App, EventListener, Element} from "./app"

App.domReady(() => {
	const searchContainer = new Element(".head__search"),
		searchInput: HTMLInputElement = document.querySelector(".h-search__input");

	new EventListener(".search-btn").add("click", (el: HTMLElement) => {
		searchContainer.toggleClass("js__opened", function(is: boolean){
			if (is)
				searchInput.focus()
			else
				searchInput.blur()
		})
	})
})
import {App, EventListener} from "./app"
import Swiper from "swiper"

interface Shadows {
	right: HTMLElement,
	left?: HTMLElement
}

App.domReady(() => {
	const tableWrap: HTMLElement = document.createElement("div"),
		tableWrapTrack: HTMLElement = document.createElement("div"),
		shadows: Shadows = {
			right: document.createElement("div"),
			left: document.createElement("div"),
		};

	shadows.right.classList.add("table-wrap__shadow")
	shadows.right.classList.add("table-wrap__shadow--right")	

	shadows.left.classList.add("table-wrap__shadow")
	shadows.left.classList.add("table-wrap__shadow--left")

	tableWrap.classList.add("table-wrap");
	tableWrapTrack.classList.add("table-wrap__track");

	App.wrap(".text-page > table", tableWrapTrack)
	App.wrap(".table-wrap__track", tableWrap)

	App.each(".table-wrap", (el: HTMLElement) => {
		el.insertBefore(shadows.left, el.querySelector("*:first-child"))
		el.insertBefore(shadows.right, null)
	})

	App.each(".table-wrap__track", function(track: HTMLElement){
		if (track.scrollWidth > track.clientWidth){
			let wrap = track.closest(".table-wrap");

			let shadows: Shadows = {
				right: wrap.querySelector(".table-wrap__shadow--right")
			};

			setShadowOpacity(shadows.right, track.scrollWidth - track.clientWidth)
		}

		new EventListener(track).add("scroll", function(el: HTMLElement){
			let wrap = el.closest(".table-wrap");

			let shadows: Shadows = {
				left: wrap.querySelector(".table-wrap__shadow--left"),
				right: wrap.querySelector(".table-wrap__shadow--right")
			};

			setShadowOpacity(shadows.right, el.scrollWidth - el.clientWidth - el.scrollLeft)
			setShadowOpacity(shadows.left, el.scrollLeft)
		})
	})

})

App.domReady(() => {
	App.each(".standart-slider", function(el:HTMLElement){
		let prevEl: HTMLElement = el.querySelector(".swiper-button-prev"),
			nextEl: HTMLElement = el.querySelector(".swiper-button-next"),
			pagination: HTMLElement = el.querySelector(".swiper-pagination");

		new Swiper(el, {
			loop: true,
			a11y: false,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true,
				loadPrevNextAmount: 3
			},
			navigation: {
				prevEl: prevEl,
				nextEl: nextEl
			},
			breakpoints: {
				660: {
					navigation: {},
					pagination: {
						el: pagination,
						type: "bullets",
						dynamicBullets: true,
						dynamicMainBullets: 3
					}
				}
			}
		})
	})
})

const setShadowOpacity = (element:HTMLElement, scrollWidth: number, offsetWidth: number = 80) => {
	element.style.opacity = (scrollWidth / offsetWidth <= 1 ? scrollWidth / offsetWidth : 1).toString()
}
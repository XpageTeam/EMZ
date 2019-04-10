import Swiper from "swiper"
import {App} from "./app"

require("../sss/tovar.sss")

App.domReady(function(){
	App.each(".tovar-slider", function(el:HTMLElement){
		const prevEl: HTMLElement = el.querySelector(".swiper-button-prev"),
			nextEl: HTMLElement = el.querySelector(".swiper-button-next");

		new Swiper(el, {
			effect: "fade",
			fadeEffect: {
			    crossfade: true
			},
			loop: true,
			a11y: false,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true,
				loadPrevNextAmount: 3
			},
			navigation: {
				prevEl: prevEl,
				nextEl: nextEl,
			}
		})
	})
})
import Swiper from "swiper"
import {App} from "./app"

require("../sss/main-about.sss")

App.domReady(function(){
	App.each(".main-about__slider", function(el:HTMLElement){
		const prevEl: HTMLElement = el.querySelector(".swiper-button-prev"),
			nextEl: HTMLElement = el.querySelector(".swiper-button-next"),
			slider: HTMLElement = el.querySelector(".about-slider");

		new Swiper(slider, {
			effect: "fade",
			fadeEffect: {
			    crossfade: false
			},
			// loop: true,
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
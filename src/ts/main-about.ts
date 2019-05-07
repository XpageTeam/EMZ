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
			    crossfade: true
			},
			// loopedSlides: 3,
			// loopAdditionalSlides: 3,
			preventInteractionOnTransition: false,
			loop: true,
			slidesPerView: 1,
			a11y: false,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true,
				loadPrevNextAmount: 3
			},
			longSwipesMs: 0,
			speed: 0,
			navigation: {
				prevEl: prevEl,
				nextEl: nextEl,
			}
		})
	})
})
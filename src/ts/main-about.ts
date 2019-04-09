import Swiper from "swiper"
import {App} from "./app"

require("../sss/main-about.sss")

App.domReady(function(){
	App.each(".about-slider", function(el:HTMLElement){
		new Swiper(el, {
			effect: "fade",
			fadeEffect: {
			    crossfade: true
			},
			// loop: true,
			a11y: false,
			lazy: {
				loadPrevNext: true,
				loadOnTransitionStart: true,
				loadPrevNextAmount: 3
			},
			navigation: {
				prevEl: ".swiper-button-prev",
				nextEl: ".swiper-button-next",
			}
		})
	})
})
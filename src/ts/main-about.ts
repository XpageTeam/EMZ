import Swiper from "swiper"
import {App} from "./app"

require("../sss/main-about.sss")

App.domReady(function(){
	new Swiper(".about-slider", {
		effect: "fade",
		fadeEffect: {
		    crossfade: true
		},
		loop: true,
		a11y: false,
		lazy: {
			loadPrevNext: true,
			loadOnTransitionStart: true
		}
	})
})
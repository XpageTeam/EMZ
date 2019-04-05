import Swiper from "swiper"
import {App, EventListener} from "./app"

import "./main-about"

require("../sss/main-slider.sss")

App.domReady((_ : any): void => {
	;(function(){
		new Swiper(".main-slider", {
			effect: "fade",
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
				dynamicMainBullets: 6
			},
			a11y: false,
			lazy: {
				loadPrevNext: true,
			}
		})
	})()
})
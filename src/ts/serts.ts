import {App} from "./app"

require("lightgallery.js")
require("../sss/serts.sss")

interface myWindow extends Window{
	lightGallery: any
}

declare let window: myWindow

App.domReady(() => {
	window.lightGallery(document.querySelector('.serts'), {
	    // thumbnail:true
	});
})
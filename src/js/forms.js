import IMask from "iMask"

document.addEventListener("DOMContentLoaded", e => {
	;(function(){
		let mask = document.querySelectorAll("[data-mask]");

		if (!mask.length)
			return

		for (var ms of mask){
			switch (ms.getAttribute("data-mask")){
				case 'phone':
					new IMask (ms, {
						mask: '+{7} (000) 000-00-00',
						// lazy: false
					})

				break;

				case 'date':
					new IMask(ms, {
						mask: Date,
					})
			}

			// if (!ms.hasAttribute("pattern") && ms.hasAttribute("required"))

		}
	})()

	;(function(){
		let inputs = document.querySelectorAll(".req-form__input, .forms__input");

		if (!inputs.length)
			return

		for (var input of inputs)
			input.addEventListener("blur", function(){
				if (this.value)
					this.classList.add("js__have-content")
				else
					this.classList.remove("js__have-content")

				checkValidity(this)
			})
	})()

	;(function(){
		let inputs = document.querySelectorAll(".req-form__file-input, .forms__input--file");

		if (!inputs.length)
			return

		for (var input of inputs)
			input.addEventListener("change", function(){

				if (this.files.length){
					let names = [];

					for (var file of this.files)
						names.push(file.name)
					
					$(this).nextAll(".req-form__file-text").attr("data-prev-text", $(this).nextAll(".req-form__file-text").html())

					$(this).nextAll(".req-form__file-text").text(names.join(", "))
					$(this).nextAll(".forms__input").val(names.join(", "))

					if ($(this).nextAll(".req-form__file-text").length)
						$(this).nextAll(".req-form__file-text")[0].addEventListener("click", e => {
							$(this).val("")

							if ("createEvent" in document) {
								let evt = document.createEvent("HTMLEvents");

								evt.initEvent("change", false, true)
								this.dispatchEvent(evt)
							}else
								this.fireEvent("onchange")

						}, {
							once: true
						})

				}else{
					$(this).nextAll(".forms__input").val("")


					$(this).nextAll(".req-form__file-text").html($(this).nextAll(".req-form__file-text").attr("data-prev-text"))

					$(this).nextAll(".req-form__file-text").removeAttr("data-prev-text")
				}
			})
	})()
})

const checkValidity = input => {
	let parent = input.closest("div"),
		errorMessageElement = parent.querySelector(".forms__error-message");

	if (input.checkValidity()){
		input.classList.remove("forms__input--error")

		errorMessageElement.innerText = ""
	}else{
		errorMessageElement.innerText = input.validationMessage

		input.classList.add("forms__input--error")
	}
}
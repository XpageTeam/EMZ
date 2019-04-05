class App {
	// private document: any = document;

	public static domReady(callback: any) {
		document.addEventListener("DOMContentLoaded", callback)
	}

	public static getElements(selector: string): any{
		const elements: any = document.querySelectorAll(selector);

		return elements.length ? elements : []
	}

	public static getElement(selector: string): any{
		const element: any = document.querySelector(selector);

		return element
	}

	protected elementsGetter(selector: string){
		const elements: any = document.querySelectorAll(selector);

		return elements.length ? elements : []
	}

	protected each(elements: Array<any>, callback: any){

		for (let i in elements){
			const el = elements[i];

			callback(el, i).bind(el)
		}
	}
}


class EventListener extends App{
	private _selector: string
	private _els: Array<any>

	constructor (selector: string){
		super()

		this._els = this.elementsGetter(selector)
	}

	public add(event: string, callback: any){

		this.each(this._els, function(){
			this.addEventListener(event, callback().bind(this))
		})

		return this
	}
}


export {App, EventListener}
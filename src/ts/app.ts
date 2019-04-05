class App {
	// private document: any = document;

	public static domReady(callback: any): void {
		document.addEventListener("DOMContentLoaded", callback)
	}

	public static getElements(selector: string): Array<HTMLElement>{
		const elements: any = document.querySelectorAll(selector);

		return elements.length ? elements : []
	}

	public static getElement(selector: string): HTMLElement{
		const element: any = document.querySelector(selector);

		return element
	}

	protected elementsGetter(selector: string): Array<HTMLElement>{
		const elements: any = document.querySelectorAll(selector);

		return elements.length ? elements : []
	}

	protected each(elements: Array<HTMLElement>, callback: any): void{

		for (let i in elements){
			const el = elements[i];

			callback(el, i).bind(el)
		}
	}
}


class EventListener extends App{
	private _selector: string
	private _els: Array<HTMLElement>

	constructor (selector: Array<HTMLElement>)
	constructor (selector: string)
	constructor (selector: any){
		super()

		switch (typeof(selector)){
			case "object":
				this._els = selector
			break;
			case "string": 
				this._els = this.elementsGetter(selector)
			break;

			default:
				console.error('Invalid selector: ${selector}')
		}
	}

	public add(event: string, callback: any): EventListener{

		this.each(this._els, function(){
			this.addEventListener(event, callback().bind(this))
		})

		return this
	}
}


export {App, EventListener}
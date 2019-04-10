class App {
	// private document: any = document;

	public static domReady(callback: any): void {
		try{
			document.addEventListener("DOMContentLoaded", callback)
		}catch(e){
			throw Error(e)
		}
	}

	public static getElements(selector: string): NodeList{
		const elements: any = document.querySelectorAll(selector);

		return elements.length ? elements : []
		// return this.elementsGetter(selector)
	}

	public static getElement(selector: string): HTMLElement{
		const element: any = document.querySelector(selector);

		return element
	}

	public static elementsGetter(selector: string): HTMLElement[]{
		return App.transformNodeListToArray(document.querySelectorAll(selector))
	}

	public static transformNodeListToArray(list: NodeList): HTMLElement[]{
		try{
			return Array.prototype.slice.call(list)
		}catch(e){
			throw Error(e)
			return []
		}
	}

	public static wrap(selector: any, wrapper: HTMLElement): void
	public static wrap(selector: any, wrapper: string): void
	public static wrap(selector: any, wrapper: any): void{
		let localWrapper: HTMLElement;

		if (typeof wrapper == "string")
			localWrapper = document.createElement(wrapper)
		else if (wrapper instanceof HTMLElement)
			localWrapper = wrapper

		// console.log(selector, [localWrapper])

		App.each(selector, function(el: HTMLElement, i:number){
			localWrapper.innerHTML = el.outerHTML

			el.parentNode.replaceChild(localWrapper, el)
		})
	}

	public static each(elements: string, callback: any): void
	public static each(elements: HTMLElement[], callback: any): void
	public static each(elements: NodeList, callback: any): void
	public static each(elements: any, callback: any): void{

		if (!callback){
			console.error("Callback does not exists in yours 'each'")
			return
		}

		if (typeof elements == "string")
			elements = App.transformNodeListToArray(App.getElements(elements))

		let i = 0;

		for (let el of elements){
			callback(el, i)
			i++
		}
	}
}

class Element {
	private _selector: string
	protected _els: HTMLElement[]

	constructor (selector: HTMLElement[])
	constructor (selector: NodeList)
	constructor (selector: HTMLElement)
	constructor (selector: string)
	constructor (selector: any){
		if (typeof selector == "string")
			this._els = App.elementsGetter(selector)
		else if (selector instanceof HTMLElement)
			this._els = [selector]
		else if (selector instanceof NodeList)
			this._els = App.transformNodeListToArray(selector)
		else if (selector instanceof Array && selector[0] instanceof HTMLElement)
			this._els = selector
		else
			throw Error(`Invalid selector: ${selector}`)
	}
}

interface EventOtions{
	capture?: boolean,
	once?: boolean,
	passive?: boolean
}

class EventListener extends Element{

	/** 
	* Метод для подписки на событие
	* @param event: string
	* @param callback: function
	* @param options: object
	* @retrun EventListener
	*/
	public add(event: string, callback: any, options?: EventOtions): EventListener{

		App.each(this._els, function(el:HTMLElement){
			el.addEventListener(event, function(event){
				callback(this, event)
			}, options)
		})

		return this
	}
}


export {App, EventListener}
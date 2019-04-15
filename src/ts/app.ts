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

	/**
	* Метод получения одно объекта по селектору
	* @param selector: string
	* @return HTMLElement
	*/
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

	/**
	* Создание коллекции элементов
	* @param selector: HTMLElement[] || NodeList || HTMLElement || string
	* @return Element
	*/  
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


	public is(selector: HTMLElement): boolean
	public is(selector: string): boolean
	public is(selector: any): boolean{
		let element: HTMLElement[];

		if (typeof selector == "string")
			element = App.elementsGetter(selector)
		else if (selector instanceof HTMLElement)
			element = [selector]

		return this._els[0] == element[0]
	}

	public has(selector: Element): boolean
	public has(selector: HTMLElement): boolean
	public has(selector: HTMLElement[]): boolean
	public has(selector: NodeList): boolean
	public has(selector: string): boolean
	public has(selector: any): boolean{
		let searchElements: HTMLElement[];

		if (typeof selector == "string")
			searchElements = App.elementsGetter(selector)
		else if (selector instanceof HTMLElement)
			searchElements = [selector]
		else if (selector instanceof Element)
			searchElements = selector._els
		else if (selector instanceof NodeList)
			searchElements = App.transformNodeListToArray(selector)
		else if (selector instanceof Array && selector[0] instanceof HTMLElement)
			searchElements = selector
		else
			throw Error(`Invalid selector: ${selector}`)

		let isFinded: boolean = false;

		for (let el of this._els){

			for (let target of searchElements)
				if (el.contains(target)){
					isFinded = true
					break
				}

			if (isFinded)
				return true
		}

		return false
		
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
	* @param event: string - название js события
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

	/** 
	* Метод для вызова события
	* @param event: string - название js события
	* @retrun EventListener
	*/
	public trigger(event: string): EventListener{
		App.each(this._els, function(el: HTMLElement){
			let evt: Event = document.createEvent("HTMLEvents");

			evt.initEvent(event, false, true)
			el.dispatchEvent(evt)
		})

		return this
	}
}

interface mobileMenuSettings {
	burger: string,
	menu: string,
	menuActiveClass: string,
	bodyActiveClass: string,
	ignoreWarnings: boolean,
	fixBody: boolean,
	media?: string,
}

class mobileMenu{
	private _settings: mobileMenuSettings
	private _burger: HTMLElement
	private _menu: HTMLElement
	private _state: boolean = false
	private _error: boolean = false
	private menuActiveClass: string = "js__opened"
	private bodyActiveClass: string = "js__menu-opened"
	private body: HTMLElement = App.getElement("body")

	set error(text: string){
		this._error = true

		console.error(`${text}. Меню не работает`)
	}

	set state(newState: boolean){
		this._state = newState
	}


	set menu (el: HTMLElement){
		if (!(el instanceof HTMLElement))
			this.error = "Меню не найдено"
		else
			this._menu = el
	}

	set burger(el: HTMLElement){
		if (!(el instanceof HTMLElement))
			this.error = "Бургер не найден"
		else
			this._burger = el
	}

	get burger(){
		return this._burger
	}

	get menu(){
		return this._menu
	}

	get settings(){
		return this._settings
	}

	get state(){
		return this._state
	}

	constructor(settings: mobileMenuSettings){
		this._settings = settings
		this.burger = App.getElement(settings.burger)

		this.menu = App.getElement(settings.menu)

		this.bindEvents()
	}

	public openMenu(): mobileMenu{
		if (!window.matchMedia(this.settings.media).matches)
			return

		if (this.settings.fixBody){
			this.body.style.top = -window.pageYOffset + "px";
			this.body.style.position = "fixed";
		}

		this.burger.classList.add("js__active")
		this.menu.classList.add(this.menuActiveClass)
		this.body.classList.add(this.bodyActiveClass)

		this.state = true

		return this
	}

	public closeMenu(): mobileMenu{
		if (!window.matchMedia(this.settings.media).matches || !this.state)
			return

		let top: number = 0;

		if (this.settings.fixBody){
			top = Math.abs(parseInt(this.body.style.top))

			this.body.style.top = ""
			this.body.style.position = ""
		}

		this.burger.classList.remove("js__active")
		this.menu.classList.remove(this.menuActiveClass)
		this.body.classList.remove(this.bodyActiveClass)

		if (this.settings.fixBody)
			window.scrollTo(0, top)

		this.state = false

		return this
	}

	public toggleMenu(): mobileMenu{
		if (!window.matchMedia(this.settings.media).matches)
			return

		console.log(this.state)

		if (this.state)
			this.closeMenu()
		else
			this.openMenu()

		return this
	}

	private bindEvents(){
		document.addEventListener("click", (event: any) => {
			const target: Element = new Element(event.target);
			
			if(!target.is(this.burger)
				&& !new Element(this.burger).has(target)
				&& !target.is(this.menu)
				&& !new Element(this.menu).has(target))
				this.closeMenu()
		})

		new EventListener(this.burger).add("click", (el: HTMLElement) => {
			this.toggleMenu()
		})
	}
}

export {App, EventListener, mobileMenu as MobileMenu}
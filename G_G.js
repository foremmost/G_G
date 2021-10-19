export default class G_G{
	constructor(props){
		const _ = this;
		_.handlersName = Symbol('handlers');
		_[_.handlersName] = [];
		_.stateName = Symbol('state');
		_[_.stateName] = new Proxy({},{
			get: (t,prop) =>t[prop],
			set:(t,p,v)=>{
				Reflect.set(t,p,v);
				_.update();
				return true;
			}
		});
		_.defineDefineMethod(props);
		_.defineInitMethod(props);
		_.update();
	}
	defineDefineMethod(props){
		const _ = this;
		if(!( (props?.define ?? 'define') in _) ){
			throw Error('G_G: No define method declared');
		}else{
			_[props?.define ?? 'define']();
		}
	}
	defineInitMethod(props){
		const _ = this;
		if(!( (props?.init ?? 'init') in _) ){
			throw Error('G_G: No initialization method declared');
		}else{
			_[props?.init ?? 'init']();
		}
	}

	
	set(state){
		const _ = this;
		for(let prop in state){
			_[_.stateName][prop] = state[prop];
		}
		_.update();
		_.storage = _[_.stateName]
		return _.storage;
	}
	
	/* Working with Dom methods */
	markup(domStr){
		const _ = this;
		let
		fragment = document.createDocumentFragment(),
		parser= new DOMParser().parseFromString(domStr,'text/html');
		fragment.append(...parser.body.children)
		return fragment;
	}
	f(selector){
		let searchedItems =  document.querySelectorAll(selector);
		if( this instanceof HTMLElement ){
			searchedItems = this.querySelectorAll(selector);
		}
		if(!searchedItems.length) return null;
		if(searchedItems.length === 1) return  searchedItems[0];
		return searchedItems;
	}
	clear(domElement){
		if(!domElement) return void 0;
		if(domElement instanceof HTMLElement){
			domElement.innerHTML = null;
		}
	}
	/* Working with Dom methods */
	
	update(){
		const _ = this;
		_[_.handlersName].forEach( fn => fn() );
	}
	_(fn){
		const _ = this;
		if(!fn) return false;
		if(!(~_[_.handlersName].indexOf(fn))){
			_[_.handlersName].push(fn);
		}
	}
}
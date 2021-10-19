export default class G_G{
	constructor(props){
		const _ = this;
	
		_.initedUpdate = false;
		_.handlersName = Symbol('handlers');
		_[_.handlersName] = [];
		_.stateName = Symbol('state');
		_[_.stateName] = new Proxy({},{
			get: (t,p) =>t[p],
			set:(t,p,v)=>{
				Reflect.set(t,p,v);
				_.update([p]);
				return true;
			}
		});
		_.defineDefineMethod(props);
		_.defineInitMethod(props);
		_.update();
		_.initedUpdate = true;
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
		//_.update(props);
		_.storage = _[_.stateName]
		return _.storage;
	}
	
	/* Working with Dom methods */
	markup(domStr,isFragment=true){
		const _ = this;
		let
		fragment = document.createDocumentFragment(),
		parser= new DOMParser().parseFromString(domStr,'text/html');
		if(isFragment){
			fragment.append(...parser.body.children);
			return fragment;
		}
		return parser.body.children;
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
	
	update(props){
		const _ = this;
		if(!_.initedUpdate){
			_[_.handlersName].forEach( fnObj => {
				for(let innerProp in fnObj) {
					fnObj[innerProp]();
				}
			});
		}
		if( (!props)  ){
			_[_.handlersName].forEach( fnObj => {
				for(let innerProp in fnObj) {
					fnObj[innerProp]();
				}
			});
			return void 0;
		}
		_[_.handlersName].forEach( fnObj => {
			for(let innerProp in fnObj){
				if(~props.indexOf(innerProp)){
					fnObj[innerProp]();
				}else if(innerProp === '')	fnObj[innerProp]();
			}
		});
		
		//
		
	}
	_(fn,deps = []){
		const _ = this;
		if(!fn) return false;
		if(deps.length){
			deps.forEach( (dep)=>{
				let propObj = { [dep.toString()] : fn  };
				if(!(~_[_.handlersName].indexOf(propObj))){
					_[_.handlersName].push(propObj);
				}
			});
		}else{
			let propObj = { [deps.toString()] : fn  };
			if(!(~_[_.handlersName].indexOf(propObj))){
				_[_.handlersName].push(propObj);
			}
		}
		
	}
}
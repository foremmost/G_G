export default class G_G{
	constructor(props = {}){
		const _ = this;
		_.handlersName = Symbol('handlers');
		_[_.handlersName] = [];
		_.stateName = Symbol('state');
		_._stateName = Symbol('state');
		_[_._stateName] = {};
		_[_.stateName] = new Proxy({},{
			get: (target,prop) =>_[_._stateName][prop],
			set:(t,p,v)=>{
				Reflect.set(_[_._stateName],p,v);
				_.updateView();
				return true;
			}
		});
		_.define();
		_.defineInitMethod(props);
		_.updateView();
	}
	defineInitMethod(props){
		const _ = this;
		if(!( (props.init ?? 'init') in _) ){
			throw Error('G_G: No initialization method declared');
		}else{
			_[props.init ?? 'init']();
		}
	}


	el(domStr){
		const _ = this;
		let
			fragment = document.createDocumentFragment(),
			parser= new DOMParser().parseFromString(domStr,'text/html');
		fragment.append(...parser.body.children)
		return fragment;
	}
	set(state){
		const _ = this;
		for(let prop in state){
			_[_.stateName][prop] = state[prop];
		}
		_.updateView();
		return _[_.stateName];
	}
	showHandlers(){
		console.log(this[this.handlersName])
	}
	updateView(){
		const _ = this;
		_[_.handlersName].forEach( fn => fn() );
	}
	view(fn){
		const _ = this;
		if(!fn) return false;
		if(!(~_[_.handlersName].indexOf(fn))){
			_[_.handlersName].push(fn);
		}
	}
}
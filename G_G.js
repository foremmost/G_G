export default class G_G{
	constructor(props = {}){
		const _ = this;
		_.handlersName = Symbol('handlers');
		_[_.handlersName] = [];
		_.stateName = Symbol('state');
		_[_.stateName] = new Proxy({},{
			get: (t,prop) =>t[prop],
			set:(t,p,v)=>{
				Reflect.set(t,p,v);
				_.updateView();
				return true;
			}
		});
		_.defineDefineMethod(props);
		_.defineInitMethod(props);
		_.update();
	}
	defineDefineMethod(props){
		const _ = this;
		if(!( (props.define ?? 'define') in _) ){
			throw Error('G_G: No define method declared');
		}else{
			_[props.define ?? 'define']();
		}
	}
	defineInitMethod(props){
		const _ = this;
		if(!( (props.init ?? 'init') in _) ){
			throw Error('G_G: No initialization method declared');
		}else{
			_[props.init ?? 'init']();
		}
	}

	
	set(state){
		const _ = this;
		for(let prop in state){
			_[_.stateName][prop] = state[prop];
		}
		_.updateView();
		return _[_.stateName];
	}
	el(domStr){
		const _ = this;
		let
		fragment = document.createDocumentFragment(),
		parser= new DOMParser().parseFromString(domStr,'text/html');
		fragment.append(...parser.body.children)
		return fragment;
	}
	
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
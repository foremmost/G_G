export default class G_G{
	constructor(props){
		const _ = this;
		_.handlersName = Symbol('handlers');
		_[_.handlersName] = [];
		_.stateName = Symbol('state');
		_[_.stateName] = new Proxy({},{});
		_.setData();
		_.init();

		_.updateView();
	}
	logic(){
		const _ = this;

	}
	set(state){
		const _ = this;
		for(let prop in state){
			let value = state[prop];
			_[_.stateName][prop] = value;
		}
		return _[_.stateName];
	}
	showHandlers(){
		console.log(this.handlers)
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
class _G_ComponentBus {
	constructor(flag){
		const _ = this;
		_.flag =  flag;
		_.components = {};
	}
	on(component,eventName,fn,inProp){
		const _ = this;
		let prop;
		if (!component) return _;
		if(!fn)
			fn = component[eventName].bind(component);
		prop  = component.busProp;
		if(!component.busProp){
			prop = fn.name;
		}
		if(inProp){
			prop = inProp;
		}
		let componentName;
		if(typeof component == 'object'){
			componentName = component.componentName.toLowerCase();
		}else{
			componentName = component;
		}
		if(!_.components[componentName]){
			_.components[componentName] = {};
			_.components[componentName]['events'] = {};
		}
		if(!_.components[componentName]['events'][eventName]){
			_.components[componentName]['events'][eventName] = new Map();
		}
		_.components[componentName]['events'] = _.components[componentName]['events'] || new Map();
		if(!_.components[componentName]['events'][eventName].has(prop)) {
			_.components[componentName]['events'][eventName].set(prop, fn);
			return _;
		}
		if(_.flag === 'dev'){
			console.warn(`Referring to an event: ${eventName}.Handler: ${fn.name}`);
		}
		return _;
	}
	trigger(componentName,eventName,data){
		const _ = this;
		componentName = componentName.toLowerCase();
		return new Promise(function (resolve) {
			if(_.flag === 'dev'){
				console.log(`РљРѕРјРїРѕРЅРµРЅС‚ ${componentName}: Р—Р°РїСѓСЃРє СЃРѕР±С‹С‚РёСЏ ${eventName} СЃ РґР°РЅРЅС‹РјРё: "${data}" `);
			}
			try{
				if (_.components[componentName]['events'][eventName]) {
					_.components[componentName]['events'][eventName].forEach( async function(fn) {
						resolve(await fn(data));
					});
				}
			} catch (e) {
				if(e.name == 'TypeError'){
					let errObj = {};
					errObj['err'] = e;
					errObj['component'] = componentName;
					errObj['event'] = eventName;
					errObj['line'] = e.lineNumber;
					console.log('%c%s',`background-color:#3f51b5;`,`!РћР±СЂР°С‰РµРЅРёРµ Рє СЃРѕР±С‹С‚РёСЋ, РєРѕС‚РѕСЂРѕРµ РЅРµ РѕРїСЂРµРґРµР»РµРЅРѕ ${componentName}: ${eventName}\n${e}`);
				}
			}
		})
	}
	remove(componentName,eventName,prop){
		const _ = this;
		if (_.components[componentName].events[eventName]) {
			_.components[componentName].events[eventName].delete(prop);
		}
	}
	clear(){
		const _ = this;
		for(let prop in _.events) {
			if (prop === 'includeModule' || prop === 'showMenu') continue;
			delete _.events[prop];
		}
	}
	inDev(){
		const _ = this;
		let title = document.createElement('DIV');
		title.textContent = 'Р¤СѓРЅС†РёСЏ РІ СЂР°Р·СЂР°Р±РѕС‚РєРµ';
		_.trigger('Modaler','showModal',{
			type:'object',
			content: title,
			padding: '20px',
			'border-radius':'10px',
			'font-size': '40px'
		});
	}
}
export const G_ComponentBus = new _G_ComponentBus('prod');
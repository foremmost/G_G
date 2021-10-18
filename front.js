import G_G from "./G_G.js";

class front extends G_G{
	constructor(props) {
		super(props);
	}
	define(){
		const _ = this;
		_.defined = _.set({
			test: 1,
			trTpl: _.trTpl()
		});
	}
	tableTpl(){
		return `
		<div class="container">
			<table id="table">
			${this.defined.trTpl}
			</table>
		</div>
	`;
	}
	trTpl(){
		let tpl = ``;
			for(let i=0; i < 10;i++){
				tpl+= `
			<tr>
				<td>${i}</td>
			</tr>
		`;
		}
		return tpl;
	}
	init(){
		const _ = this;
		_.view(()=>{
			let strTplDiv = document.querySelector('#strTpl');
			strTplDiv.innerHTML = '';
			strTplDiv.append(_.el(_.tableTpl()));
		});
	}
}
let F = new front();

window['F'] = F;



function domTpl(){
	let domTpl = document.createElement('DIV');
	domTpl.className = 'container';
	let btn = document.createElement('BUTTON');
	btn.id= 'test';
	domTpl.append(btn);
	return domTpl;
}









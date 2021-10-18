import G_G from "./G_G.js";

class front extends G_G{
	constructor(props) {
		super(props);
	}
	define(){
		const _ = this;
		_.defined = _.set({
			tableBodyTpl: _.tableBodyTpl()
		});
	}
	tableTpl(){
		return `
		<div class="container">
			<table id="table">
				${this.defined.tableBodyTpl}
			</table>
		</div>
	`;
	}
	tableBodyTpl(){
		let
			body = ``;
		for(let i=0; i < 10;i++){
			body+= `
					<td><button>${i}</button></td>
			`;
		}
		return `<tr>${body}</tr>`;
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

window['F'] = F; // For testing reactive behavior





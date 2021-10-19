import G_G from "./G_G.js";

class front extends G_G{
	constructor(props) {
		super(props);
	}
	define(){
		const _ = this;
		_.storage = _.set({
			tableBodyTpl: _.tableBodyTpl()
		});
	}
	tableTpl(){
		return `
			<div class="container">
				<table id="table">
					${this.storage.tableBodyTpl}
				</table>
			</div>
		`;
	}
	tableBodyTpl(){
		let body = ``;
		for(let i=0; i < 10;i++){
			body+= `
					<td><button>${i}</button></td>
			`;
		}
		return `<tr>${body}</tr>`;
	}
	init(){
		const _ = this;
		_._(()=>{
			let strTplDiv = _.f('#strTpl');
			_.clear(_.f);
			strTplDiv.append(_.markup(_.tableTpl()));
		});
	}
}
let F = new front();

window['F'] = F; // For testing reactive behavior





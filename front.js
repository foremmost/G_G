import G_G from "./G_G.js";
import { G_Control,G_Bus } from "./G_Control.js";

class front extends G_G{
	constructor(props) {
		super(props);
		const _ = this;

		G_Bus.on('changeButtonText',_.changeButtonText.bind(_));
		G_Bus.on('changeButtonSize',_.changeButtonSize.bind(_));
	}
	changeButtonText(inputData){
		const _ = this;
		_.set({
			text: inputData['item'].value,
		})
	}
	changeButtonSize(inputData){
		const _ = this;
		_.set({
			buttonSize: parseInt(inputData['item'].value)
		})
	}
	define(){
		const _ = this;
		 _.set({
			text: 0,
			buttonSize: 25,
			tableBodyTpl: _.tableBodyTpl
		});
	}
	tableTpl(){
		return `
			<div class="container">
				<table id="table">
					${this.storage?.tableBodyTpl()}
				</table>
			</div>
		`;
	}
	tableBodyTpl(){
		// Now here this -> Proxy object from G_G
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
			_.clear(strTplDiv);
			strTplDiv.append(_.markup(_.tableTpl()));
		},['s']);
		//

		_._(()=>{
			let buttons = _.f('#table td button');
			buttons.forEach( btn=>{
				btn.textContent = _.storage.text;
				btn.style.padding = `${isNaN(_.storage.buttonSize) ? 25 : _.storage.buttonSize}px`;
			});
		},['text','buttonSize']);
	}
}
let F = new front();





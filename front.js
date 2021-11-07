import G_G from "./G_G.js";
import { G_Control,G_Bus } from "./G_Control.js";

class front extends G_G{
	constructor(props) {
		super(props);
		const _ = this;

		G_Bus.on('changeButtonText',_.changeButtonText.bind(_));
		G_Bus.on('changeButtonSize',_.changeButtonSize.bind(_));
		G_Bus.on('changeTestValue',_.changeTestValue.bind(_));
	}
	changeTestValue(inputData){
		const _ = this;
		_.set({
			testValue: inputData['item'].value
		});
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
	tableTpl(){
		return `
			<div class="container">
				<table id="table">
					${this._$?.tableBodyTpl()}
				</table>
			</div>
		`;
	}
	tableBodyTpl(props){
		// Now here this -> Proxy object from G_G
		let body = ``;
		for(let i=0; i < 10;i++){
			body+= `
				<td><button>${i}</button></td>
			`;
		}
		return `<tr>${body}</tr>`;
	}
	
	async define(){
		const _ = this;
		 _.set({
			text: 0,
			buttonSize: 25,
			tableBodyTpl: _.tableBodyTpl,
  		testValue: 0
		});
	}
	init(){
		const _ = this;
		_._(()=>{
			let strTplDiv = _.f('#strTpl');
			_.clear(strTplDiv);
			strTplDiv.append(_.markup(_.tableTpl()));
		});
		//

		_._(async ()=>{
			let buttons = _.f('#table td button');
			
			buttons.forEach( btn=>{
				btn.textContent = _._$.text;
				btn.style.padding = `${isNaN(_._$.buttonSize) ? 25 : _._$.buttonSize}px`;
			});
		},['text','buttonSize']);
	
	
	}
}
let F = new front();



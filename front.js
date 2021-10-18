import G_G from "./G_G.js";

class front extends G_G{
	constructor(props) {
		super(props);
	}
	define(){
		const _ = this;
		_.a = _.set({ test: 1 });
	}
	init(){
		const _ = this;
		_.view(()=>{
			//document.querySelector('#test').textContent = _.a.test;
		});
		_.a.test = 30;
	}
}
let F = new front();

function tableTpl(){
	return `
		<div class="container">
			<table>
			</table>
		</div>
	`;
}
function trTpl(td){
	return `
		<tr>
			<td>${td}</td>
		</tr>
	`;
}


function domTpl(){
	let domTpl = document.createElement('DIV');
	domTpl.className = 'container';
	let btn = document.createElement('BUTTON');
	btn.id= 'test';
	domTpl.append(btn);
	return domTpl;
}

/*for(let i=0; i< 10;i++){
	console.time('strTpl');
	let domTplDiv = document.querySelector('#domTpl');
	for(let i = 0; i < 100; i++){
		domTplDiv.append(domTpl())
	}
	console.timeEnd('strTpl');
}*/

/*
for(let i=0; i< 10;i++){
	console.time('strTpl');
	let strTplDiv = document.querySelector('#strTpl');
let parser = new DOMParser().parseFromString(strTpl(),'text/html');
	strTplDiv.append(parser.body.firstElementChild)
/!*for(let i = 0; i < 100; i++){
		strTplDiv.append(parser.body.firstElementChild)
	}*!/
	console.timeEnd('strTpl');
}*/
let strTplDiv = document.querySelector('#strTpl');
//console.log(F.el(domTpl(strTpl())))
strTplDiv.append(
	F.el(strTpl())
)






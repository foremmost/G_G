import G_G from "./G_G.js";

class front extends G_G{
	constructor(props) {
		super(props);
	}
	setData(){
		const _ = this;
		_.a = _.set({ test: 1 });
	}

	init(){
		const _ = this;

		_.view(()=>{
			console.log(_.a.test);
		});
		_.a.test = 30;
	}
}
let F = new front();

//console.log(F)
/*G_G.data( ()=>{
	console.log('s')
});
G_G.logic( ()=>{
	console.log('s')
});
G_G.view( ()=>{
	console.log('s')
});

G_G.showHandlers()

*/
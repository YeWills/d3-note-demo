const width  = 500;	//SVG绘制区域的宽度
const height = 500;	//SVG绘制区域的高度

const dataset = [
	{
		country: "确诊",
		type:'sure',
		gdp: [[28,1],[29,0],[30,1],
			[31,1]]
	},
	{
		country: "疑似",
		type:'suspected',
		gdp: [[28,5],[29,7],[30,3],
			[31,9]]
	},
	{
		country: "治愈",
		type:'cure',
		gdp: [[28,0],[29,2],[30,5],
			[31,1]]
	},
	{
		country: "死亡",
		type:'over',
		gdp: [[28,0],[29,0],[30,1],
			[31,0]]
	}
];


const handleColor=(d, colors)=>{
	switch(d.type){
		case 'sure':{
			return colors[0];
			break;
		}
		case 'suspected':{
			return colors[1];
			break;
		}
		case 'cure':{
			return colors[2];
			break;
		}
		case 'over':{
			return colors[3];
			break;
		}
		default:{}
	}
}

//定义两个颜色				
// var colors = [ d3.rgb(0,0,255) , d3.rgb(0,255,0), d3.rgb(0,255,255), d3.rgb(255,255,0) ];
var colors = [ 'red' , 'blue', 'yellow', 'black' ];
//外边框
var padding = { top: 50 , right: 50, bottom: 50, left: 50 };
export {
    width,
    height,
    padding,
    dataset,
    colors,
    handleColor,
}
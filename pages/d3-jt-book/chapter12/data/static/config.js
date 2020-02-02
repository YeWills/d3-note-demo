const width  = 500;	//SVG绘制区域的宽度
const height = 500;	//SVG绘制区域的高度

const dataset = [
	{
		country: "确诊",
		gdp: [[28,1],[29,0],[30,1],
			[31,1]]
	},
	{
		country: "疑似",
		gdp: [[28,5],[29,7],[30,3],
			[31,9]]
	},
	{
		country: "治愈",
		gdp: [[28,0],[29,0],[30,0],
			[31,1]]
	},
	{
		country: "死亡",
		gdp: [[28,0],[29,0],[30,1],
			[31,0]]
	}
];

//定义两个颜色				
var colors = [ d3.rgb(0,0,255) , d3.rgb(0,255,0) ];
//外边框
var padding = { top: 50 , right: 50, bottom: 50, left: 50 };
export {
    width,
    height,
    padding,
    dataset,
    colors,
}
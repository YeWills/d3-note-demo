const width  = 500;	//SVG绘制区域的宽度
const height = 500;	//SVG绘制区域的高度

let dataset = [
	{
		country: "确诊",
		type:'sure',
		gdp: [[28,86],[29,113],[30,168],[31,209],[2/1,252],[2/2,334],[2/3,405],[2/4,509],
	]
	},
	{
		country: "疑似",
		type:'suspected',
		gdp: [[28,121],[29,169],[30,188],[31,202],[2/1,217],[2/2,226],[2/3,251],[2/4,186]]
	},
	{
		country: "治愈",
		type:'cure',
		gdp: [[28,0],[29,0],[30,0],[31,0],[2/1,1],[2/2,9],[2/3,10],[2/4,18],
	]
	},
	{
		country: "死亡",
		type:'over',
		gdp: [[28,0],[29,0],[30,2],[31,2],[2/1,2],[2/2,2],[2/3,2],[2/4,2],
	]
	}
];
dataset = dataset.map(item=>{
	item.gdp = item.gdp.map((cell, index)=>{
		cell = cell.concat([index, item.type]);
		return cell;
	})
	return item;
})


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
var colors = [ 'rgb(232, 49, 50)' , 'rgb(236, 146, 23)', 'rgb(16, 174, 181)', 'rgb(77, 80, 84)' ];
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
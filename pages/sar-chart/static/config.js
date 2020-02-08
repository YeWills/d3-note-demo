import {chartDatas} from './data.js';

const width  = 800;	//SVG绘制区域的宽度
const height = 600;	//SVG绘制区域的高度

var dataset = [
	{
		country: "确诊",
		type:'sure',
		gdp:[]
	},
	{
		country: "疑似",
		type:'suspected',
		gdp:[]
	},
	{
		country: "治愈",
		type:'cure',
		gdp:[]
	},
	{
		country: "死亡",
		type:'over',
		gdp:[]
	},
	{
		country: "新增",
		type:'new',
		gdp:[]
	},
	{
		country: "新增疑似",
		type:'newsp',
		gdp:[]
	}
];
const typeMap = ['sure', 'suspected', 'cure', 'over', 'new', 'newsp']
dataset = dataset.map((t,i)=>{
	t.gdp = Object.entries(chartDatas).map(item=>{
		return [item[0], item[1][typeMap[i]]]
	})
	return t;
})

dataset = dataset.map(item=>{
	item.gdp = item.gdp.map((cell, index)=>{
		cell = cell.concat([index, item.type]);
		return cell;
	})
	return item;
})

//定义两个颜色				
// var colors = [ d3.rgb(0,0,255) , d3.rgb(0,255,0), d3.rgb(0,255,255), d3.rgb(255,255,0) ];
var colors = [ 'rgb(232, 49, 50)' , 'rgb(236, 146, 23)', 'rgb(16, 174, 181)', 'rgb(77, 80, 84)', 'rgba(10, 45, 237, 0.88)', '#9C27B0' ];


const handleColorBuild=(colors)=>{
	return (d)=>{
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
			case 'new':{
				return colors[4];
				break;
			}
			case 'newsp':{
				return colors[5];
				break;
			}
			default:{}
		}
	}
}

const handleColor = handleColorBuild(colors);


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
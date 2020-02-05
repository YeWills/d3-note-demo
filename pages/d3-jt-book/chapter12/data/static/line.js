import { handleColor } from './config.js';

const renderPoint = ({
	svg,
	colors,
	dataset,
	padding,
	xScale,
	yScale
}) => {
	const pointDatas = dataset.reduce((acc, item) => {
		acc = acc.concat(item.gdp);
		return acc;
	}, [])
	var update = svg.selectAll(".MyCircle")
		.data(pointDatas);

	var enter = update.enter();

	var exit = update.exit();
	console.log(exit)

	update.attr("transform", function (point) {
		var x1 = point[2];
		var y1 = point[1];
		var focusX = xScale(x1) + padding.left;
		var focusY = yScale(y1) + padding.top;
		return "translate(" + focusX + "," + focusY + ")"
	})

	enter.append("circle")
		.attr("class", "MyCircle")
		.attr("r", 4.5)
		.attr("transform", function (point) {
			var x1 = point[2];
			var y1 = point[1];
			var focusX = xScale(x1) + padding.left;
			var focusY = yScale(y1) + padding.top;
			return "translate(" + focusX + "," + focusY + ")"
		})
	exit.remove();
}

const handleLineRender = ({svg, linePath, colors, dataset, padding})=>{
	//添加路径
	const updateNode = svg.selectAll("path.line")
		.data(dataset);		//绑定数据
	const enterNode = updateNode.enter();
	const exitNode = updateNode.exit();

	updateNode.attr("d", function(d){
		return linePath(d.gdp);		//返回直线生成器得到的路径
	})	
	.attr("stroke",function(d,i){
		return handleColor(d, colors);
	})

	enterNode.append("path")		//添加足够数量的<path>元素
	.attr("class", "line")
	.attr("transform","translate(" + padding.left + "," +  padding.top  +")")
	.attr("d", function(d){
		return linePath(d.gdp);		//返回直线生成器得到的路径
	})	
	.attr("fill","none")
	.attr("stroke-width",3)
    .attr("stroke",function(d,i){
    	return handleColor(d, colors);
    })

	exitNode.remove();
}

export const renderLine =({svg, linePath, colors, dataset, padding,xScale,yScale})=>{
	handleLineRender({svg, linePath, colors, dataset, padding});
	renderPoint({svg, colors, dataset, padding,xScale,yScale})
}

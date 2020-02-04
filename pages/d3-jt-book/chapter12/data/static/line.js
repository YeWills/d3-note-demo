
export const renderLine =({svg, linePath, colors, dataset, padding,xScale,yScale})=>{
//添加路径
svg.selectAll("path")	//选择<svg>中所有的<path>
	.data(dataset)		//绑定数据
	.enter()			//选择enter部分
	.append("path")		//添加足够数量的<path>元素
	.attr("transform","translate(" + padding.left + "," +  padding.top  +")")
	.attr("d", function(d){
		return linePath(d.gdp);		//返回直线生成器得到的路径
	})	
	.attr("fill","none")
	.attr("stroke-width",3)
	.attr("stroke",function(d,i){
		return colors[i];
	});

	dataset.forEach(item => {
		item.gdp.forEach(point=>{
		//从数据中获取年份和GDP值
		var x1 = point[0];
		var y1 = point[1];
		//分别用x轴和y轴的比例尺，计算焦点的位置
		var focusX = xScale(x1) + padding.left;
		var focusY = yScale(y1) + padding.top;
				svg.append("circle")
				.attr("r", 4.5)
				.attr("transform","translate(" + focusX + "," + focusY + ")");
			})
	});
	
}

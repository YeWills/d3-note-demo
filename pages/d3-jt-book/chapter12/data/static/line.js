
export const renderLine =({svg, linePath, colors, dataset, padding})=>{
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
}

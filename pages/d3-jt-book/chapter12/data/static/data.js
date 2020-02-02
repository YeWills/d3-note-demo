

				
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


//添加垂直于x轴的对齐线
var vLine = svg.append("line")
				.attr("class", "focusLine")
				.style("display", "none");


//添加一个提示框
var tooltip = d3.select("body")
				.append("div")
				.attr("class","tooltip")
				.style("opacity",0.0);
				
var title = tooltip.append("div")
					.attr("class","title");

var des = tooltip.selectAll(".des")
					.data(dataset)
					.enter()
					.append("div");

var desColor = des.append("div")
					.attr("class","desColor");
					
var desText = des.append("div")
					.attr("class","desText");

	
// //添加一个透明的监视鼠标事件用的矩形
// svg.append("rect")
// 	.attr("class","overlay")
// 	.attr("x", padding.left)
// 	.attr("y", padding.top)
// 	.attr("width",width - padding.left - padding.right)
// 	.attr("height",height - padding.top - padding.bottom)
// 	.on("mouseover", function() { 
// 		tooltip.style("left", (d3.event.pageX) + "px")
// 			.style("top", (d3.event.pageY + 20) + "px")
// 			.style("opacity",1.0);

// 		vLine.style("display",null);
// 	})
//     .on("mouseout", function() { 
//     	tooltip.style("opacity",0.0);
//     	vLine.style("display","none");
//     })
//     .on("mousemove", mousemove);

	
// function mousemove() {
// 	/* 当鼠标在透明矩形内滑动时调用 */
	
// 	//折线的源数组
// 	var data = dataset[0].gdp;
	
// 	//获取鼠标相对于透明矩形左上角的坐标，左上角坐标为(0,0)
// 	var mouseX = d3.mouse(this)[0] - padding.left;
// 	var mouseY = d3.mouse(this)[1] - padding.top;
    
// 	//通过比例尺的反函数计算原数据中的值，例如x0为某个年份，y0为GDP值
// 	var x0 = xScale.invert( mouseX );
// 	var y0 = yScale.invert( mouseY );
	
// 	//对x0四舍五入，如果x0是2005.6，则返回2006；如果是2005.2，则返回2005
// 	x0 = Math.round(x0);
	
// 	//查找在原数组中x0的值，并返回索引号
// 	var bisect = d3.bisector( function(d) { return d[0]; }).left;
// 	var index = bisect(data, x0) ;
	
// 	//获取年份和gdp数据
// 	var year = x0;
// 	var gdp = [];
	
// 	for(var k=0; k<dataset.length; k++ ){
// 		gdp[k] = { country: dataset[k].country, 
// 				   value: dataset[k].gdp[index][1]};
// 	}

// 	//设置提示框的标题文字（年份）
// 	title.html("<strong>" + year + "年</strong>");
	
// 	//设置颜色标记的颜色
// 	desColor.style("background-color",function(d,i){
// 			return colors[i];
// 		});
	
// 	//设置描述文字的内容
// 	desText.html( function(d,i){
// 		return gdp[i].country + "\t" + "<strong>" + gdp[i].value + "</strong>";
// 	});
	
// 	//设置提示框的位置
// 	tooltip.style("left", (d3.event.pageX) + "px")
// 			.style("top", (d3.event.pageY + 20) + "px");

// 	//获取垂直对齐线的x坐标
// 	var vlx = xScale(data[index][0]) + padding.left;
	
// 	//设定垂直对齐线的起点和终点
// 	vLine.attr("x1", vlx)
// 		.attr("y1",padding.top)
// 		.attr("x2",vlx)
// 		.attr("y2",height - padding.bottom);
// }

var markStep = 80;
	
var gMark = svg.selectAll(".gMark")
				.data(dataset)
				.enter()
				.append("g")
				.attr("transform",function(d,i){
					return "translate(" + (padding.left + i * markStep)  + "," + ( height - padding.bottom + 40)  +")";
				});
	
gMark.append("rect")
		.attr("x",0)
		.attr("y",0)
		.attr("width",10)
		.attr("height",10)
		.attr("fill",function(d,i){ return colors[i]; });

gMark.append("text")
		.attr("dx",15)
		.attr("dy",".5em")
		.attr("fill","black")
		.text(function(d){ return d.country; });		



				

			

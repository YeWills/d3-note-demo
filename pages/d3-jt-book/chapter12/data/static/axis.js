
class AxisFn{
	constructor({dataset, padding, width, height}){
		this.width=width;
		this.dataset=height;
		this.dataset=dataset;
		this.padding=padding;
	}
	generateXscale=(width, padding)=>{
		const xScale = d3.scale.linear()
					.domain([28,31])
					.range([ 0 , width - padding.left - padding.right ]);
		return xScale;
	}
	generateYscale=(height,padding,dataset)=>{
		const gdpmax = this.getYmax(dataset);
		const yScale = d3.scale.linear()
					.domain([0,gdpmax * 1.1])
					.range([ height - padding.top - padding.bottom , 0 ]);
		return yScale;
	}
	getYmax=(dataset)=>{
		let gdpmax = 0;
		for(let i = 0; i < dataset.length; i++){
			const currGdp = d3.max( dataset[i].gdp , function(d) { return d[1]; } );
			if( currGdp > gdpmax ){
				gdpmax = currGdp;
				break;
			}
		}
	}
	generateLinePath=(xScale, yScale)=>{
		//创建一个直线生成器
		var linePath = d3.svg.line()
		.x(function(d){ return xScale(d[0]); })
		.y(function(d){ return yScale(d[1]); })
		//.interpolate("basis");
		return linePath;
	}
	init=()=>{
		const xScale = this.generateXscale(this.width, this.padding);
		const yScale = this.generateYscale(this.height, this.padding, this.dataset);
		const linePath = this.generateLinePath(xScale, yScale);
		return {
			xScale,
			yScale,
			linePath,
		}
	}
	renderXaxis=({svg, xScale,padding,height})=>{
		//x轴
	const xAxis = d3.svg.axis()
		.scale(xScale)
		.ticks(5)
		.tickFormat(d3.format("d"))
		.orient("bottom");
	svg.append("g")
			.attr("class","axis")
			.attr("transform","translate(" + padding.left + "," + (height - padding.bottom) +  ")")
			.call(xAxis);

	}
	renderYaxis=({svg, yScale,padding})=>{
	//y轴
	const yAxis = d3.svg.axis()
		.scale(yScale)
		.orient("left");
	svg.append("g")
		.attr("class","axis")
		.attr("transform","translate(" + padding.left + "," + padding.top +  ")")
		.call(yAxis); 
	}
}

export const Axis = AxisFn

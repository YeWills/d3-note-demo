import {padding, width, height} from './config.js'; 

class AxisFn{
	constructor({dataset}){
		this.dataset=dataset;
		this.xDomain=dataset.length ? dataset[0].gdp.length-1 : 0;
		return;
	}
	generateXscale=()=>{
		const xScale = d3.scale.linear()
					.domain([0,this.xDomain])
					.range([ 0 , width - padding.left - padding.right ]);
		return xScale;
	}
	generateYscale=(dataset)=>{
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
			}
		}
		return gdpmax;
	}
	generateLinePath=(xScale, yScale)=>{
		//创建一个直线生成器
		var linePath = d3.svg.line()
		.x(function(d){ return xScale(d[2]); })
		.y(function(d){ return yScale(d[1]); })
		//.interpolate("basis");
		return linePath;
	}
	init=()=>{
		const xScale = this.generateXscale();
		const yScale = this.generateYscale(this.dataset);
		const linePath = this.generateLinePath(xScale, yScale);
		return {
			xScale,
			yScale,
			linePath,
		}
	}
	renderXaxis = ({
		svg,
		xScale,
	}) => {
		//x轴
		const xAxis = d3.svg.axis()
			.scale(xScale)
			// .ticks(5)
			.tickFormat(function(a){
				var startDate = '2020/1/24';
				const month = moment(startDate, 'YYYY/MM/DD').add(a, 'day').get('month')+1;
				const day = moment(startDate, 'YYYY/MM/DD').add(a, 'day').get('date');
				return `${month}/${day}`;
			})
			.orient("bottom");
		var update = svg.selectAll("g.xAxis")
			//data 后面的数组[1]只是任意写的，只要数组的长度为1就行，使用data，以便得到 enter、exit用来重绘。
			.data([1]);
		var enter = update.enter();
		var exit = update.exit();
		update.call(xAxis);
		enter.append("g")
			.attr("class", "xAxis axis")
			.attr("transform", "translate(" + padding.left + "," + (height - padding.bottom) + ")")
			.call(xAxis);
		exit.remove();

	}
	renderYaxis = ({
		svg,
		yScale
	}) => {
		//y轴
		const yAxis = d3.svg.axis()
			.scale(yScale)
			.orient("left");
		var update = svg.selectAll("g.yAxis")
			.data([1]);
		var enter = update.enter();
		var exit = update.exit();
		update.call(yAxis);
		enter.append("g")
			.attr("class", "yAxis axis")
			.attr("transform", "translate(" + padding.left + "," + padding.top + ")")
			.call(yAxis);
		exit.remove();
	}
	}

export const Axis = AxisFn

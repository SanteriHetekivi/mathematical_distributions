(function(exports){
function draw(type,canvas,max,min)	//Drawing craft for Cumulative distribution or Probability density function
{
	var ctx = document.getElementById(canvas).getContext("2d");
	ctx.clearRect(0, 0, window.innerWidth*0.80, window.innerHeight*0.80);
	ctx.canvas.width  = window.innerWidth*0.80;
	ctx.canvas.height = window.innerHeight*0.80;
	var distribution = gaussian(u, q);
	var numbers = [];
	var label = [];
	for(var i = min; i <= max; i += 0.1)
	{
		i = Math.round(i * 100) / 100
		if(type === "PDF")
		{
			numbers.push(distribution.pdf(i));
		}
		else if(type === "CDF")
		{
			numbers.push(distribution.cdf(i));
		}
		if(Math.round(i) === i)
		{
			label.push(i);
		}
		else
		{
			label.push("");
		}
	}

	var data = 
	{
		labels: label,
		datasets: 
		[
			{
				label: "My Second dataset",
				fillColor: "rgb(0,0,0,0.6)",
				strokeColor: "rgba(0,0,0)",
				pointColor: "rgba(151,187,205,1)",
				pointStrokeColor: "#fff",
				pointHighlightFill: "#fff",
				pointHighlightStroke: "rgba(151,187,205,1)",
				data: numbers
			}
		]
	};
	var options = 
	{
		///Boolean - Whether grid lines are shown across the chart
		scaleShowGridLines : true,

		//String - Colour of the grid lines
		scaleGridLineColor : "rgba(0,0,0,.05)",

		//Number - Width of the grid lines
		scaleGridLineWidth : 3,

		//Boolean - Whether to show horizontal lines (except X axis)
		scaleShowHorizontalLines: true,

		//Boolean - Whether to show vertical lines (except Y axis)
		scaleShowVerticalLines: true,
		
		scaleShowLabels: true,
		//Boolean - Whether the line is curved between points
		bezierCurve : true,

		//Number - Tension of the bezier curve between points
		bezierCurveTension : 0.4,

		//Boolean - Whether to show a dot for each point
		pointDot : true,

		//Number - Radius of each point dot in pixels
		pointDotRadius : 2,

		//Number - Pixel width of point dot stroke
		pointDotStrokeWidth : 1,

		//Number - amount extra to add to the radius to cater for hit detection outside the drawn point
		pointHitDetectionRadius : 0,

		//Boolean - Whether to show a stroke for datasets
		datasetStroke : true,

		//Number - Pixel width of dataset stroke
		datasetStrokeWidth : 2,

		//Boolean - Whether to fill the dataset with a colour
		datasetFill : true,

		//String - A legend template
		legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

	};
	var myLineChart = new Chart(ctx).Line(data, options);
}
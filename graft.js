//Santeri Hetekivi 1202466 13i220B Tampere University of Applied Sciences


// Functions from gaussian library https://github.com/errcw/gaussian
(function(exports){

  // Complementary error function
  // From Numerical Recipes in C 2e p221
  var erfc = function(x) {
    var z = Math.abs(x);
    var t = 1 / (1 + z / 2);
    var r = t * Math.exp(-z * z - 1.26551223 + t * (1.00002368 +
            t * (0.37409196 + t * (0.09678418 + t * (-0.18628806 +
            t * (0.27886807 + t * (-1.13520398 + t * (1.48851587 +
            t * (-0.82215223 + t * 0.17087277)))))))))
    return x >= 0 ? r : 2 - r;
  };

  // Inverse complementary error function
  // From Numerical Recipes 3e p265
  var ierfc = function(x) {
    if (x >= 2) { return -100; }
    if (x <= 0) { return 100; }

    var xx = (x < 1) ? x : 2 - x;
    var t = Math.sqrt(-2 * Math.log(xx / 2));

    var r = -0.70711 * ((2.30753 + t * 0.27061) /
            (1 + t * (0.99229 + t * 0.04481)) - t);

    for (var j = 0; j < 2; j++) {
      var err = erfc(r) - xx;
      r += err / (1.12837916709551257 * Math.exp(-(r * r)) - r * err);
    }

    return (x < 1) ? r : -r;
  };

  // Construct a new distribution from the precision and precisionmean
  var fromPrecisionMean = function(precision, precisionmean) {
    return gaussian(precisionmean/precision, 1/precision);
  };

  // Models the normal distribution
  var Gaussian = function(mean, variance) {
    if (variance <= 0) {
      throw new Error('Variance must be > 0 (but was ' + variance + ')');
    }
    this.mean = mean;
    this.variance = variance;
    this.standardDeviation = Math.sqrt(variance);
  }
  // Probability density function
  Gaussian.prototype.pdf = function(x) {
    var m = this.standardDeviation * Math.sqrt(2 * Math.PI);
    var e = Math.exp(-Math.pow(x - this.mean, 2) / (2 * this.variance));
    return e / m;
  };
  // Cumulative density function
  Gaussian.prototype.cdf = function(x) {
    return 0.5 * erfc(-(x - this.mean) / (this.standardDeviation * Math.sqrt(2)));
  };
  // Add distribution of this and d
  Gaussian.prototype.add = function(d) {
    return gaussian(this.mean + d.mean, this.variance + d.variance);
  };
  // Subtract distribution of this and d
  Gaussian.prototype.sub = function(d) {
    return gaussian(this.mean - d.mean, this.variance + d.variance);
  };
  // Scales this distribution by constant c
  Gaussian.prototype.scale = function(c) {
    return gaussian(this.mean*c, this.variance*c*c);
  };
  Gaussian.prototype.mul = function(d) {
    if(typeof(d)==="number"){ return this.scale(d); }
    var precision = 1/this.variance;
    var dprecision = 1/d.variance;
    return fromPrecisionMean(precision+dprecision, 
      precision*this.mean+dprecision*d.mean);
  };
  Gaussian.prototype.div = function(d) {
    if(typeof(d)==="number"){ return this.scale(1/d); }
    var precision = 1/this.variance;
    var dprecision = 1/d.variance;
    return fromPrecisionMean(precision-dprecision, 
      precision*this.mean-dprecision*d.mean);
  };
  Gaussian.prototype.ppf = function(x) {
    return this.mean - this.standardDeviation * Math.sqrt(2) * ierfc(2 * x);
  };
  var gaussian = function(mean, variance){ return new Gaussian(mean, variance); };
  exports(gaussian);
})(typeof(exports)==='undefined'? function(f){this['gaussian']=f} : function(f){module.exports=f});
var PDFmax;
var PDFmin;
var CDFmax;
var CDFmin;
var q;
var u;

//Setting starting values

var q = 1;
var u = 0;

var PDFmax = u + 5;
var PDFmin = u - 5;
var CDFmax = u + 5;
var CDFmin = u - 5;

//Drawing starting crafts
draw("PDF");
draw("CDF");

function draw(type)	//Drawing craft for Cumulative distribution or Probability density function
{
	var ctx = document.getElementById(type).getContext("2d");
	ctx.clearRect(0, 0, window.innerWidth*0.80, window.innerHeight*0.80);
	ctx.canvas.width  = window.innerWidth*0.80;
	ctx.canvas.height = window.innerHeight*0.80;
	var distribution = gaussian(u, q);
	var numbers = [];
	var label = [];
	var max = 0;
	var min = 0;
	if(type === "PDF")
	{
		max = PDFmax;
		min = PDFmin;
	}
	else if(type === "CDF")
	{
		max = CDFmax;
		min = CDFmin;
	}
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


//Getting real-time values from input forms

$('#variance').on('input', function() 
{ 
	q = parseFloat($(this).val());
	if(!isNaN(q))
	{
		draw("PDF");
		draw("CDF");
	}
});

$('#mean').on('input', function() 
{ 
	u = parseFloat($(this).val());
	if(!isNaN(u))
	{
		draw("PDF");
		draw("CDF");
	}
});

$('#PDFmin').keyup('input', function() 
{ 
	PDFmin = parseFloat($(this).val());
	if(!isNaN(PDFmin))
	{
		draw("PDF");
	}
});

$('#PDFmax').on('input', function() 
{ 
	PDFmax = parseFloat($(this).val());
	if(!isNaN(PDFmax))
	{
		draw("PDF");
	}
});

$('#CDFmin').on('input', function() 
{ 
	CDFmin = parseFloat($(this).val());
	if(!isNaN(CDFmin))
	{
		draw("CDF");
	}
});

$('#CDFmax').on('input', function() 
{ 
	CDFmax = parseFloat($(this).val());
	if(!isNaN(CDFmax))
	{
		draw("CDF");
	}
});
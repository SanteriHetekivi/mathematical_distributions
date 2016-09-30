<!DOCTYPE html>
<!-- Santeri Hetekivi 1202466 13i220B Tampere University of Applied Sciences -->
<html lang='en'>
    <head>
		<title>Mathematical statistics</title>
        <meta charset='utf-8' />
        <script src='Chart.min.js'></script>
		<script src='gaussian.js'></script>
		<link href="styles.css" rel="stylesheet" type="text/css">	  
		<script src='https://ajax.googleapis.com/ajax/libs/jquery/2.1.3/jquery.min.js'></script>
		<script src="jquery.fittext.js"></script>
		<script>
			jQuery("#fittext1").fitText(0.1);
		</script>
		<?php 
			$title = '';
			$page = $_GET['page'];
			if($page === 'pdf')
			{
				$title = 'Probability density function';
			}
			else if($page === 'cdf')
			{
				$title = 'Cumulative distribution function';
			}				
		?>
    </head>
    <body>
		<header>Mathematical statistics</header>
		<nav>
			<ul>
			<a href='?'><li>Home</li></a>
			<a href="?page=pdf"><li>Probability density function</div></li></a>
			<a href="?page=cdf"><li>Cumulative distribution function</div></li></a>
			</ul>
		</nav>
		<section>
		<?php
			if($page === 'pdf' || $page === 'cdf')
			{
				echo 
				"
					<p>
						<label for='variance'>Variance</label>
						<input id='variance' value='1'/>
						<label for='mean'>Mean</label>
						<input id='mean' value='0'/>   
					</p>
					<p><h1>
				";
				echo $title;
				echo "
					</h1></p>
					<canvas id='canvas'></canvas>
					<p>
					<label for='min'>Min</label>
					<input id='min' value='-5'/>  
					<label for='max' >Max</label>
					<input id='max' value='5' />  
					</p>
					<script src='
					
				";
				echo $page . ".js'></script>";
			}
			else
			{
				echo '<div class="text"><h1 id="fittext1">"Mathematical statistics is the application of mathematics <br>
				to statistics, which was originally conceived as the science of the state — <br>
				the collection and analysis of facts about a country: its economy, land, military, <br>
				population, and so forth. Mathematical techniques which are used for this include <br>
				mathematical analysis, linear algebra, stochastic analysis, differential equations, <br>
				and measure-theoretic probability theory." <p> -Wikipedia </p></h1></div>
				';
			}
		?>
		</section>
		<footer>Santeri Hetekivi 1202466 Tampere University of Applied Sciences</footer>
    </body>
</html>
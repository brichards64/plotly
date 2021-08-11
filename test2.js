
function httpGet(theUrl){
    if(window.XMLHttpRequest)
    {// code for IE7+, Firefox, Chrome, Opera, Safari
	xmlhttp=new XMLHttpRequest();
    }
    else
    {// code for IE6, IE5
	xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }
    xmlhttp.onreadystatechange=function()
    {
	if (xmlhttp.readyState==4 && xmlhttp.status==200)
	{
	    //var barry="[0"+xmlhttp.responseText+"]";
	   //var barry="["+"awsome";
	 //   barry.concat("]","awsome");
	 //   var barry="[10, 20, 70, 40, 50]"
	    data= xmlhttp.responseText.split("@");
	    time= data[0].split(" | ");
	    latency= data[1].split(" | ");
	    download= data[2].split(" | ");
	    upload= data[3].split(" | ");
	   // var jerry=Array.from([1, 2, 30, 4, 5]);
	 //   console.log("here ben");
	  //  console.log(download);
	   // console.log(Array.from(barry));
	   // document.getElementById('demo').innerHTML=barry;
	    
	    TESTER2 = document.getElementById('tester');
	    Plotly.newPlot( TESTER2, [
		{
		    x: time,
		    y: download,
		    name: 'Download'
		},
		{
		    x: time,
		    y: upload,
		    name: 'Uplaod'
		},
		{
		    x: time,
		    y: latency,
		    visible: "legendonly",
		    name: 'Latency'
		    
		}
	    ],
			    {
			/*	updatemenus: [{
			//	    y: 0.8,
				    yanchor: 'top',
				    buttons: [{
					method: 'restyle',
					args: ['line.color', 'red'],
					label: 'red'
				    }, {
					method: 'restyle',
					args: ['line.color', 'blue'],
					label: 'blue'
				    }, {
					method: 'restyle',
					args: ['line.color', 'green'],
					label: 'green'
				    }],
				}],
*/
				xaxis: {
				    autorange: true,
//				    range: ['2021-08-01 18:00:27.442639', '2021-08-07 17:00:25.676744'],
				    range: ['2021-08-06 18:00:27', '2021-08-07 17:00:25'],
				    
				    rangeselector: {buttons: [
					{
					    count: 1,
					    label: '1hr',
					    step: 'hour',
					    stepmode: 'backward'
					},
					{
					    count: 3,
					    label: '3hr',
					    step: 'hour',
					    stepmode: 'backward'
					},
					{
					    count: 6,
					    label: '6hr',
					    step: 'hour',
					    stepmode: 'backward'
					},
					{
					    count: 12,
					    label: '12h',
					    step: 'hour',
					    stepmode: 'backward'
					},
					{
					    count: 24,
					    label: '24hr',
					    step: 'hour',
					    stepmode: 'backward'
					},
					{
					    count: 3,
					    label: '3d',
					    step: 'day',
					    stepmode: 'backward'
					},
					{
					    count: 7,
					    label: '1w',
					    step: 'day',
					    stepmode: 'backward'
					},
					{
					    count: 1,
					    label: '1m',
					    step: 'month',
					    stepmode: 'backward'
					},
					{step: 'all'}
				    ]},
				    rangeslider: {range: ['2021-08-06 18:00:27', '2021-08-07 17:00:25']},
				    type: 'date'
				}  
				
			    }
					    
			    
			  );
	    
	    // window.alert(barry);	    
	    return xmlhttp.responseText;
				
	}
    }
    xmlhttp.open("GET", theUrl, false );
    xmlhttp.send();
}


httpGet("http://192.168.2.1/cgi-bin/test2.cgi");

//var bob = "[";
//bob.concat(",1, 2, 30, 4, 5","]");

//TESTER = document.getElementById('tester');
//Plotly.newPlot( TESTER, [{
  //  x: bob,
   // y: [1, 20, 4, 8, 16] }], {
//	margin: { t: 0 } } );

//setInterval(function(){ httpGet("http://192.168.2.1/cgi-bin/test2.cgi"); }, 10000);
//setInterval(function(){}; }, 1000);




function makeTrace(i) {
    return {
	y: Array.apply(null, Array(10)).map(() => Math.random()),
	line: {
	    shape: 'spline' ,
	    color: 'red'
	},
	visible: i === 0,
	name: 'Data set ' + i,

    };
}

Plotly.newPlot('graph', [0, 1, 2, 3].map(makeTrace), {
    updatemenus: [{
	y: 0.8,
	yanchor: 'top',
	buttons: [{
	    method: 'restyle',
	    args: ['line.color', 'red'],
	    label: 'red'
	}, {
	    method: 'restyle',
	    args: ['line.color', 'blue'],
	    label: 'blue'
	}, {
	    method: 'restyle',
	    args: ['line.color', 'green'],
	    label: 'green'
	}]
    }, {
	y: 1,
	yanchor: 'top',
	buttons: [{
	    method: 'restyle',
	    args: ['visible', [true, false, false, false]],
	    label: 'Data set 0'
	}, {
	    method: 'restyle',
	    args: ['visible', [false, true, false, false]],
	    label: 'Data set 1'
	}, {
	    method: 'restyle',
	    args: ['visible', [false, false, true, false]],
	    label: 'Data set 2'
	}, {
	    method: 'restyle',
	    args: ['visible', [false, false, false, true]],
	    label: 'Data set 3'
	}]
    }],
});




d3.csv('http://192.168.2.1/data.csv', function(err, rows){
    function unpack(rows, key) {
	return rows.map(function(row)
			{ return row[key]; });}
    var c = unpack(rows, 'c2');
    console.log(c);
    var trace1 = {
	x:unpack(rows, 'x2'), y: unpack(rows, 'y2'), z: unpack(rows, 'z2'),
	mode: 'markers',
	marker: {
	    size: 5,
	    color: c,
	    colorscale: 'Viridis',
	    symbol: 'circle',
	    line: {
		width: 1.0},
	    opacity: 1.0},
	type: 'scatter3d',
	name: 'Hits'
    };

    var trace2 = {
	x:unpack(rows, 'x1'), y: unpack(rows, 'y1'), z: unpack(rows, 'z1'),
	mode: 'markers',
	marker: {
	    color: 'rgb(127, 127, 127)',
	    size: 5,
	    symbol: 'circle',
	    line: {
		color: 'rgb(204, 204, 204)',
		width: 0.0},
	    opacity: 0.1},
	type: 'scatter3d',
	name: 'Tubes'
    };

    var data = [trace2,trace1];
    var layout = {margin: {
	l: 0,
	r: 0,
	b: 0,
	t: 50
    },
//		  width: 500,
		  height: 1000,
		  
		  //plot_bgcolor: '#000',
		  //paper_bgcolor: '#000',
		  updatemenus: [{
		      y: 0.8,
                      yanchor: 'top',
		      buttons: [{
			  method: 'relayout',
			  args: ['paper_bgcolor', '#fff'],
		//	  args: ['plot_bgcolor', '#111'],
			  label: 'white'
		      },{
			  method: 'relayout',
			  args: ['paper_bgcolor', '#aaa'],
			  //        args: ['plot_bgcolor', '#000'],
			  label: 'grey'
		      },{
			  method: 'relayout',
			  args: ['paper_bgcolor', '#000'],
		//	  args: ['plot_bgcolor', '#000'],
			  label: 'black'
			  
		      }]
		  },
				{
				    y: 0.6,  
				    yanchor: 'top',
				    buttons: [{
					method: 'restyle',
					args: ['marker.color', ['rgb(127, 127, 127)', unpack(rows, 'c2')]],
					label: 'Charge'
				    },{
					method: 'restyle',
					args: ['marker.color', ['rgb(127, 127, 127)', unpack(rows, 't2')]],
					label: 'Time'
				    }]
				},




				/*
				{
				    buttons: [
					{
					    args: [{'contours.showlines':false, 'type':'contour'}],
					    label: 'Hide lines',
					    method: 'restyle'
					},
					{
					    args: [{'contours.showlines':true, 'type':'contour'}],
					    label:'Show lines',
					    method:'restyle'
					}
				    ],
				    direction: 'down',
				    pad: {'r': 10, 't': 10},
				    showactive: true,
				    type: 'dropdown',
				    x: 0.78,
				    xanchor: 'left',
				    y: button_layer_2_height,
				    yanchor: 'top'
				    },*/
				{
				    buttons: [
					{
					    args: ['type', 'surface'],
					    label: '3D Surface',
					    method: 'restyle'
					},
					{
					    args: ['type', 'heatmap'],
					    label:'Heatmap',
					    method:'restyle'
					},
					{
					    args: ['type', 'contour'],
					    label:'Contour',
					    method:'restyle'
					}
				    ],
				},
				
				{
				    buttons: [
					{
					    args: ['marker.colorscale', 'Viridis'],
					    label: 'Viridis',
					    method: 'restyle'
					},
					{
					    args: ['marker.colorscale', 'Electric'],
					    label:'Electric',
					    method:'restyle'
					},
					{
					    args: ['marker.colorscale', 'Earth'],
					    label:'Earth',
					    method:'restyle'
					},
					{
					    args: ['marker.colorscale', 'Hot'],
					    label:'Hot',
					    method:'restyle'
					},
					{
					    args: ['marker.colorscale', 'Jet'],
					    label:'Jet',
					    method:'restyle'
					},
					{
					    args: ['marker.colorscale', 'Portland'],
					    label:'Portland',
					    method:'restyle'
					},
					{
					    args: ['marker.colorscale', 'Rainbow'],
					    label:'Rainbow',
					    method:'restyle'
					},
					{
					    args: ['marker.colorscale', 'Blackbody'],
					    label:'Blackbody',
					    method:'restyle'
					},
					
					{
					    args: ['marker.colorscale', 'Cividis'],
					    label:'Cividis',
					    method:'restyle'
					}
				    ],
				    direction: 'left',
				    pad: {'r': 10, 't': 10},
				    showactive: true,
				    type: 'buttons',
				    x: 0.15,
				    xanchor: 'left',
				    y: 0,
				    yanchor: 'top'
			       }
		 ]
		  
		 };
    Plotly.newPlot('myDiv', data, layout);
});






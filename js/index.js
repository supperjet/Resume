$(document).ready(function() {

			// fullpage 
			$('#fullpage').fullpage({
				verticalCentered: true,
				// sectionsColor: ['#1bbc9b', '#4BBFC3', '#7BAABE'],
				css3: true,
				// navigation: true,
				continuousVertical: true,
				navigationPosition: 'right', //圆点
				slidesNavigation: true,
				responsiveWidth: 900,
				scrollingSpeed: 800,
				afterRender: function(index){
					$('video').get(0).play();
				},
				afterLoad: function(anchorLink,index){
					if(index == 4){
						$('video').get(0).play();
					}
				}
			});

			//card
			var card = document.getElementById('card');
			card.addEventListener('click', function(e){
				var cls = this.className;
				// 如果“card_front”在cls中
				if(/card_front/g.test(cls)){
				   cls = cls.replace(/card_front/g,'card_back');
				}else{
					cls = cls.replace(/card_back/g,'card_front');
				}
				card.className = cls;
			}, false);



		//chart
		var myChart = echarts.init(document.getElementById('chart'));
		var data = [[267,216,230,150,240,120,180]];

		var lineStyle = {
		    normal: {
		        width: 1,
		        opacity: 0.5
		    }
		};

		option = {
		    backgroundColor: 'rgba(0,0,0,0.5)',
		    title: {
		        // text: '能力图',
		        left: 'left',
		        textStyle: {
		            color: 'rgba(255,255,255,.8)',
		        }
		    },
		    radar: {
		        indicator: [
		            {name: 'HTML', max: 300},
		            {name: 'CSS3', max: 300},
		            {name: 'Javascript', max: 300},
		            {name: 'NodeJS', max: 300},
		            {name: 'Canvas', max: 300},
		            {name: 'WebGL', max: 300},
		            {name: 'VueJS', max: 300}
		        ],
		        shape: 'circle',
		        splitNumber: 5,
		        name: {
		            textStyle: {
		                color: 'rgb(238, 197, 102)'
		            }
		        },
		        splitLine: {
		            lineStyle: {
		                color: [
		                    'rgba(238, 197, 102, 0.1)', 'rgba(238, 197, 102, 0.2)',
		                    'rgba(238, 197, 102, 0.4)', 'rgba(238, 197, 102, 0.6)',
		                    'rgba(238, 197, 102, 0.8)', 'rgba(238, 197, 102, 1)'
		                ].reverse()
		            }
		        },
		        splitArea: {
		            show: false
		        },
		        axisLine: {
		            lineStyle: {
		                color: 'rgba(238, 197, 102, .5)',

		            }
		        }
		    },
		    series: [
		        {
		            type: 'radar',
		            lineStyle: lineStyle,
		            data: data,
		            symbol: 'none',
		            itemStyle: {
		                normal: {
		                    color: '#F9713C'
		                }
		            },
		            areaStyle: {
		                normal: {
		                    opacity: 0.1
		                }
		            }
		        }
		    ]
		};

	myChart.setOption(option);

});
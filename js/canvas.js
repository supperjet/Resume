(function(){

	if(!window.requestAnimationFrame){
    	window.requestAnimationFrame =(window.webkitRequestAnimationFrame||
                                   	   window.mozRequestAnimationFrame||
                                   	   window.oRequestAnimationFrame||
                                   	   window.msRequestAnimationFrame||
                                  		function(callback){
                                       	return window.setTimeout(callback,1000/60); 
                                       });
    
	}

	window.onload = function(){
		var canvas = document.getElementById('canvas'),
			context = canvas.getContext('2d'),
			balls = [],
			numBalls = 50,
			bounces = -1,
			minDist = 100,
			W,H;

		W = canvas.width = window.innerWidth;
		H = canvas.height = window.innerHeight;

		for(var i=0; i<numBalls; i++){
			var size = Math.round(Math.random()*3 + 2);
			var ball = new Ball(size);
			ball.x = Math.random()*W;
			ball.y = Math.random()*H;
			ball.vx = Math.random()*2 - 1;
			ball.vy = Math.random()*2 - 1;
			balls.push(ball)
		}

		function move(ballA, i){
			ballA.x += ballA.vx;
			ballA.y += ballA.vy;

		 	for(var ballB, j=i+1; j<numBalls; j++){
                   ballB = balls[j];
                   line(ballA, ballB);
            }
		}

		function draw(ball){
			ball.draw(context);
		}

		function line(ballA, ballB){
			var dx = ballB.x - ballA.x,
				dy = ballB.y - ballA.y,
				dist = Math.sqrt(dx*dx + dy*dy);

			if (dist < minDist) {             
                context.save();
                context.strokeStyle = "rgba(255,255,255,.1)";
                context.beginPath();
                context.moveTo(ballA.x, ballA.y);
                context.lineTo(ballB.x, ballB.y);
                context.closePath();
                context.stroke();
                context.restore();                 
            }
		}

		function checkCollsion(ball){
			if(ball.x + ball.radius > W){
                ball.x = W - ball.radius;
                ball.vx *= bounces;
            }else if(ball.x - ball.radius < 0){
                ball.x = ball.radius;
                ball.vx *= bounces;
            }
            
            if(ball.y + ball.radius > H){
                ball.y = H - ball.radius;
                ball.vy *= bounces;
            }else if(ball.y - ball.radius < 0){
                ball.y = ball.radius;
                ball.vy *= bounces;
            }
		}

		function resize(){
			canvas.width = window.innerWidth;
			canvas.height = window.innerHeight;
		}
		window.addEventListener('resize', resize, false);
		

		(function drawFrame(){
			window.requestAnimationFrame(drawFrame,canvas);
			context.clearRect(0, 0, W, H);

			balls.forEach(move);
			balls.forEach(checkCollsion);
			balls.forEach(draw);

		}())

		// ball
		function Ball(radius,color){
		    if(radius === undefined) {this.radius = 20;}
		    if(color === undefined){this.color = 'rgba(255,255,255,.1)';}
		    this.x = 0;
		    this.y = 0;
		    this.vx = 0;
		    this.vy = 0;
		    this.radius = radius;
		    this.rotation = 0;
		    this.lineWidth = 1;

		    this.draw = function(context){
				  context.save();
				  context.translate(this.x,this.y);
				  context.rotate(this.rotation);
				  context.scale(this.scaleX,this.scaleY);
				  context.lineWidth = this.lineWidth;
				  context.fillStyle = this.color;
				  context.strokeStyle = this.color;
				  context.beginPath();
				  context.arc(0,0,this.radius,0,Math.PI*2,false);
				  context.closePath();
				  context.fill();
				  // context.stroke();
				  context.restore();
			}

		}

	}
}())

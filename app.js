var c = document.getElementById("myCanvas");
				var ctx = c.getContext("2d");

				var bound = c.getBoundingClientRect();
				var offsetX = bound.left;
				var offsetY = bound.top;

				var posArray = [];
				var startX, startY = 0;
				var id = 0;
				
				c.addEventListener("mousedown", doMouseDown, false);
				c.addEventListener("mouseup", doMouseUp, false);
				c.addEventListener("mousemove", doMouseMove, false);
				c.addEventListener("dblclick", doDelete);
					
				var mousePress = false;
				var mousedrag = false;

				function reset() {
					ctx.clearRect(0, 0, c.width, c.height);
					posArray.length = 0;
				}
				
				function drawTriangle(){
					ctx.clearRect(0,0,c.width,c.height);

					if(posArray.length == 0){ return; }
					
					for(var i = 0; i < posArray.length; i++){
						var path=new Path2D();
						path.moveTo(posArray[i].x1,posArray[i].y1);
						path.lineTo(posArray[i].x2,posArray[i].y2);
						path.lineTo(posArray[i].x2,posArray[i].y1);
						ctx.fillStyle = posArray[i].color;
						ctx.fill(path);
					}
				}
				
				function doDelete(event) {					
					event.preventDefault();
					
					startX = parseInt(event.pageX - offsetX);
					startY = parseInt(event.pageY - offsetY);
					
					if(posArray.length > 0) {
						var x1, x2, y1, y2 = 0;
						var nx = startX;
						var ny = startY;
						var area, areaA, areaB, areaC = 0;
						
						for(var i=0;i<posArray.length;i++) {
						   	x1 = posArray[i].x1;
							x2 = posArray[i].x2;
							y1 = posArray[i].y1;
							y2 = posArray[i].y2;
						   
							area = Math.abs((x1*(y2-y1) + x2*(y1-y1) + x2*(y1-y2))/2);   //ABC
							areaA = Math.abs((nx*(y1-y2) + x1*(y2-ny) + x2*(ny-y1))/2);     //PAB
							areaB = Math.abs((nx*(y2-y1) + x2*(y1-ny) + x2*(ny-y2))/2);	//PBC
							areaC = Math.abs((nx*(y1-y1) + x1*(y1-ny) + x2*(ny-y1))/2);	//PAC
						   						   
							if((areaA + areaB + areaC) == area) {
								posArray.splice(i,1);
								drawTriangle();
							}
						}
					}
				}	  
				
				function doMouseDown(event) {					
					event.preventDefault();					
					mousePress = true;
					
					startX = parseInt(event.pageX - offsetX);
					startY = parseInt(event.pageY - offsetY);
					
					if(posArray.length > 0) {
						var x1, x2, y1, y2 = 0;
						var nx = startX;
						var ny = startY;
						var area, areaA, areaB, areaC = 0;
						
						for(var i=0;i<posArray.length;i++) {
							x1 = posArray[i].x1;
							x2 = posArray[i].x2;
							y1 = posArray[i].y1;
							y2 = posArray[i].y2;
						   
							area = Math.abs((x1*(y2-y1) + x2*(y1-y1) + x2*(y1-y2))/2);   //ABC
							areaA = Math.abs((nx*(y1-y2) + x1*(y2-ny) + x2*(ny-y1))/2);     //PAB
							areaB = Math.abs((nx*(y2-y1) + x2*(y1-ny) + x2*(ny-y2))/2);	//PBC
							areaC = Math.abs((nx*(y1-y1) + x1*(y1-ny) + x2*(ny-y1))/2);	//PAC
						   						   
							if((areaA + areaB + areaC) == area) {
								mousedrag = true;
								id = i;
							}
						}
					}
				}
				
				function doMouseUp(event) {
					event.preventDefault();
					mousePress = false;
					
					canvas_up_x = parseInt(event.pageX - offsetX);
					canvas_up_y = parseInt(event.pageY - offsetY);
					
					if(!(canvas_up_x == startX) || !(canvas_up_y == startY)) {
						if(mousedrag) {
							var dx = canvas_up_x - startX;
							var dy = canvas_up_y - startY;
							posArray[id].x1 = posArray[id].x1 + dx;
							posArray[id].y1 = posArray[id].y1 + dy;
							posArray[id].x2 = posArray[id].x2 + dx;
							posArray[id].y2 = posArray[id].y2 + dy;
							drawTriangle();
						}
						else {
							var color = 'hsl(' + 360 * Math.random() + ', 50%, 50%)';
						    posArray.push({x1:startX, y1:startY, x2:canvas_up_x, y2:canvas_up_y, color:color});
							drawTriangle();
						}
					}	   
					mousedrag = false;
				}

				function doMouseMove(event)
				{
					/*
					if(mousePress) {
						drawTriangle();
						//ctx.clearRect(0, 0, c.width, c.height);
						
						canvas_move_x = event.pageX - offsetX;
						canvas_move_y = event.pageY - offsetY;
						if(mousedrag) {
							event.preventDefault();
							event.stopPropagation();
							var dx = canvas_move_x - startX;
							var dy = canvas_move_y - startY;
							startX = startX + dx;
							startY = startY + dy;
						}					
						var path=new Path2D();
						ctx.moveTo(startX,startY);
						ctx.lineTo(canvas_move_x,canvas_move_y);
						ctx.lineTo(canvas_move_x,startY);
						//ctx.fillStyle = "blue";
						ctx.fill(path);
					}
					*/
				}
			

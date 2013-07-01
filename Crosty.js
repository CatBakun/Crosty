Crosty = {
	//Crosty es un singleton que me da un monton de objetos y funciones 
	//para llevar a cabo el flujo de ejecucion de un juego. 
	
	
	App : function(div_id){
		this.div = document.getElementById(div_id);
		this.canvas = document.createElement("canvas");
		this.div.appendChild(this.canvas);
	},
	
	/* Una aplicacion tiene muchas escenas.
	 * */
	Scene : function(){
		this.shapes = [];
		
		this.add_shape = function(shape){
			this.shapes.push(shape);
		};
		
		this.update = function(){
			for(var i in this.shapes){
				this.shapes[i].update();
			}
		};
	},
	
	/* Crosty me deja dibujar formas. Una forma tiene entre otros atributos
	 * una imagen asociada. 
	 * */
	Shape : function(ops){
		this.width = ops.width || 0;
		this.height = ops.height || ops.width || 0;
		this.img = Crosty.Image(ops.img || null);
	},
	
	
	
	
	/* Crosty tiene un tipo de imagen propio que es diferente al del DOM
	 * porque..
	 * */
	Image : function(image){
		if(typeof(image) =="string"){
			this.url = image;
			this.dom_img = new Image(image);
		}
	}
}

Crosty.Tests = {
	
	test_create_scene : function(){
		var sc = new Crosty.Scene();
		sc.add_shape(new Crosty.Shape({}));
	},
	
	test_create_canvas : function(){
		var a = new Crosty.App("my_game");
		console.log(a);
	},
	
	test_create_shape : function(){
		var s = new Crosty.Shape({});
		console.log("test_create_shape",s);
	},
	
	run : function(){
		var me = Crosty.Tests.run
			for(var i in Crosty.Tests){
				var test_fn = Crosty.Tests[i];
				if(test_fn !== me){
					test_fn();
				}
			}
	}
}

function ready() {
	Crosty.Tests.run();
}

// Dean Edwards/Matthias Miller/John Resig

function init() {
  // quit if this function has already been called
  if (arguments.callee.done) return;

  // flag this function so we don't do the same thing twice
  arguments.callee.done = true;

  // kill the timer
  if (_timer) clearInterval(_timer);

  // do stuff
  ready()
};

/* for Mozilla/Opera9 */
if (document.addEventListener) {
  document.addEventListener("DOMContentLoaded", init, false);
}

/* for Internet Explorer */
/*@cc_on @*/
/*@if (@_win32)
  document.write("<script id=__ie_onload defer src=javascript:void(0)><\/script>");
  var script = document.getElementById("__ie_onload");
  script.onreadystatechange = function() {
    if (this.readyState == "complete") {
      init(); // call the onload handler
    }
  };
/*@end @*/

/* for Safari */
if (/WebKit/i.test(navigator.userAgent)) { // sniff
  var _timer = setInterval(function() {
    if (/loaded|complete/.test(document.readyState)) {
      init(); // call the onload handler
    }
  }, 10);
}

/* for other browsers */
window.onload = init;


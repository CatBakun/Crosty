Crosty = {
	//Crosty es un singleton que me da un monton de objetos y funciones 
	//para llevar a cabo el flujo de ejecucion de un juego. 
	
	
	App : function(div_id){
		this.div = document.getElementById(div_id);
		this.scenes = [];
		
		this.add_scene = function(scene){
			this.div.appendChild(scene.canvas);
			scene.set_size(this.div.offsetWidth, this.div.offsetHeight);
			this.scenes.push(scene);
		};
		
		this.set_active_scene = function(scene){
			if(this.active_scene){
				this.active_scene.active = false;
				this.active_scene.hide();
			}
			this.active_scene = scene;
			scene.active = true;
			scene.show();
		};
		
		this.run = function(){
			that = this;
			window.setInterval(function(){
				that.active_scene.update()
			}, 1);
		};
	},
	
	/* Una aplicacion tiene muchas escenas.
	 * */
	Scene : function(){
		
		this.active = false;
		
		this.canvas = document.createElement("canvas");
		this.canvas.style.display = "none";
		this.context = this.canvas.getContext("2d");
		
		this.shapes = [];
		
		this.add_shape = function(shape){
			shape.scene = this;
			shape.context = this.context;
			this.shapes.push(shape);
		};
		
		this.clear_scene = function(){
			this.context.clearRect(0, 0, this.width, this.height);
		};
		
		this.set_size = function(w,h){
			this.canvas.width = w;
			this.canvas.height = h;
			this.width = w;
			this.height = h;
		};
		
		
		this.update = function(){
			this.clear_scene();
			for(var i in this.shapes){
				this.shapes[i].update();
			}
		};
		
		this.show = function(){
			this.canvas.style.display = "block";
		};
		
		this.hide = function(){
			this.canvas.style.display = "none";
		};
	},
	
	/* Crosty me deja dibujar formas. Una forma tiene, entre otros atributos,
	 * una imagen asociada. 
	 * */
	Shape : function(ops){
		this.img = new Crosty.Image(ops.img || null);
		this.width = ops.width || this.img.width || 0;
		this.height = ops.height || this.img.width || ops.width || 0;

		this.update = ops.update;
	},
	
	
	
	
	/* Crosty tiene un tipo de imagen propio que es diferente al del DOM
	 * porque..
	 * */
	Image : function(image){
		if(typeof(image) =="string"){
			this.url = image;
			this.dom_img = new Image();
			this.dom_img.src = image;
			this.width = this.dom_img.width;
			this.height = this.dom_img.height;
		}
	}
}

Crosty.Tests = {
	
	test_create_scene : function(){
		var sc = new Crosty.Scene();
		sc.add_shape(new Crosty.Shape({}));
	},
	
	test_create_app : function(){
		var app = new Crosty.App("my_game");
		var sc = new Crosty.Scene();
		sc.clear_scene = function(){};
		sc.add_shape(new Crosty.Shape({
			
			img : "http://images1.wikia.nocookie.net/__cb20121123154157/imotwom/images/d/d4/Clever_Monkey.png",
			
			update : function(){
				this.context.drawImage(
					this.img.dom_img,
					Math.random() * this.scene.width,
					Math.random() * this.scene.height
				);
			}
		}));
		app.add_scene(sc);
		app.set_active_scene(sc);
		app.run();
	},
	
	test_create_shape : function(){
		var s = new Crosty.Shape({});
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


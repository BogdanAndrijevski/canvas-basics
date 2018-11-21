let canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


let c = canvas.getContext('2d');


let mouse = {
    x: undefined,
    y: undefined
    
};

let colorArray = [
     '#2C3E50',
     '#E74C3C',
     '#ECF0F1',
     '#3498DB',
     '#2980B9',
]



let altColorArray = [
  '#F8B195',
  '#F67280',
  '#C06C84',
  '#6C5B7B',
  '#355C7D',
]


window.addEventListener('mousemove', function (event) {
  mouse.x = event.x; 
  mouse.y = event.y;
 
  // console.log(mouse);
});


window.addEventListener('resize', function () {
 
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

function Circle(x, y, dx, dy, radius) {
  this.x = x;
  this.y = y;
  this.dx =dx;
  this.dy = dy;
  this.radius = radius;
  this.minRadius = radius;
  this.maxRadius = 20;

  this.primaryColor = colorArray[Math.floor(Math.random() * colorArray.length)];
  this.altColor = altColorArray[Math.floor(Math.random() * colorArray.length)];

  this.color = this.primaryColor;

  this.draw = function () {
    c.beginPath();
    c.arc(this.x, this.y, this.radius, 0, Math.PI *2, false);
    c.fillStyle = this.color;
    c.fill();
  }

  this.update = function () {
    if( this.x + this.radius > canvas.width ||
        this.x - this.radius < 0 ){
        this.dx = - this.dx;
      }

      if( this.y + this.radius > canvas.height ||
          this.y - this.radius < 0 ) {
          this.dy = - this.dy;
      }
      
      this.x += this.dx;
      this.y += this.dy;

      //interactivity
    
      let d = Math.pow((this.x-mouse.x),2 ) + Math.pow((this.y - mouse.y),2)
     
      if ( d < (Math.pow(130 , 2)) && d > (Math.pow(80, 2)) ) {
     
       
          if(this.radius < this.maxRadius){
                 this.radius += 0.2;
                this.color = this.altColor;
          }
        }
          else if(this.radius > this.minRadius){ 
              this.radius -= 0.1;
            }
       
       if(this.radius < this.minRadius) 
            {
              this.color = this.primaryColor;
            }
      this.draw();
  }

}


let circleArray = [];


function init() {
  circleArray = [];
  for (let i = 0; i < 800; i++) {
      let radius = Math.random() * 3 + 1;
      let x = Math.random() * (canvas.width - radius * 2) + radius;
      let y = Math.random() * (canvas.height - radius * 2) + radius;
     
      let dx = (Math.random() - 0.5) ;
      let dy = (Math.random() - 0.5) ;
      circleArray.push(new Circle(x, y, dx, dy, radius)); 
  }
}

function animate() {
      requestAnimationFrame(animate);
      c.clearRect( 0 , 0 , canvas.width , canvas.height);
     
      circleArray.forEach(element => {
        element.update();
      });
}

init();
animate();


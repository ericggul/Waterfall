var canvas = document.querySelector('canvas');
var c = canvas.getContext('2d');

canvas.width = innerWidth;
canvas.height = innerHeight;

// Set Vairables

const getRandom = (a,b) =>{
    return (Math.random()*(b-a+1)+a);
}

const getRandomColor = (colorArray) =>{
    let i = colorArray.length;
    let j = Math.floor(Math.random()*(i));
    return colorArray[j]
}

var colorArray = ['#57d3e6', '#6dc8d6', '#7bdeed', '#7ed8e6'];


function ball (x,y,dx,dy,radius,color) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = color;

    this.update = function(t){
        if(this.y + this.radius + this.dy > canvas.height){
            this.y = getRandom(20,24);
            this.dy = -1;
            this.dx = 0.1;
            this.radius = radius;
        } else{
            this.dy += getRandom(0.00007,0.0009)*t;
            this.dx = this.dx*(getRandom(-1.2,1.2));
        }

        this.x += this.dx;
        this.y += this.dy;
        this.radius *= 0.98;     
        this.draw();
    };

    this.draw = function(){
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
        c.closePath;
    }
}

var ballArray = [];
const init = () =>{
    for(let i = 0; i<3000; i++){
        var radius = getRandom(0.5,2) ** 2.1;
        var color = getRandomColor(colorArray);
        var x = getRandom(0,6)**2 + 100;
        var y = getRandom(20,Math.sqrt(innerHeight) ** 2);
        var dx = 0.1;
        var dy = 0;
        ballArray.push(new ball(x,y,dx,dy,radius,color));
    }
}

const animate = () =>{
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height );
    for (let i = 0; i< ballArray.length; i++){
        ballArray[i].update(getRandom(0.1,8));
    }
}

init();
animate();
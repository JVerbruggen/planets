var factory;
function initPlanets(){
    factory = new PlanetFactory();
}

class TracePoint{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

class Planet{
    constructor(mass,radius,color,x,y,vx,vy){
        this.x = x;
        this.y = y;

        this.vx = vx;
        this.vy = vy;
        this.mass = mass;
        this.radius = radius;
        this.color = color;
        this.exists = true;
        this.traceLength = 300;
        this.trace = [];
    }

    addToTrace(x,y){
        this.trace.push(new TracePoint(x,y));
        if(this.trace.length > this.traceLength){
            this.trace.shift();
        }
    }

    drawTrace(){
        for(var i=1;i<this.trace.length;i++){
            var j = i-1;

            let a = this.trace[i];
            let b = this.trace[j];
            stroke(map(i,1,this.trace.length,0,255));
            line(a.x - translateX, a.y - translateY, b.x - translateX, b.y - translateY);
        }
    }

    doTick(){
        this.x += this.vx;
        this.y += this.vy;
    }

    draw(){
        this.addToTrace(this.x, this.y);
        this.drawTrace();

        stroke(this.color);
        strokeWeight(1);
        fill(this.color);
        circle(this.x - translateX, this.y - translateY,2*this.radius);
    }

    distance(other){
        let dy = other.y - this.y;
        let dx = other.x - this.x;
        return Math.sqrt(dy*dy+dx*dx);
    }

    addForce(vx, vy){
        this.vx += vx;
        this.vy += vy;
    }

    collide(other){
        other.exists = false;

        let addVX = other.vx;
        let addVY = other.vy;
        addVX = addVX * other.mass / this.mass;
        addVY = addVY * other.mass / this.mass;

        this.mass += other.mass;
        this.radius += other.radius;

        this.addForce(addVX, addVY);

        gameMode.collided(this,other);
    }
}

class PlanetFactory{
    constructor(){
        this.planets = [];
    }

    spawn(mass,radius,x,y,vx,vy){
        colorMode(HSB);
        let c = color(map(Math.random(),0.0,1.0,0,360), 255, 255);
        this.planets.push(new Planet(mass,radius,c,x,y,vx,vy));
    }

    despawn(planet){
        this.planets.splice(this.planets.indexOf(planet),1);
    }
}
var mouseState;
function initMouse(){
    mouseState = new MouseUpState();
}

class MouseDownStateSpawning{
    constructor(){
        this.originX = absoluteMX();
        this.originY = absoluteMY();
    }

    onMouseUp(){
        let vx = this.originX - absoluteMX();
        let vy = this.originY - absoluteMY();
        vx /= 50;
        vy /= 50;
        factory.spawn(10, 10, this.originX + translateX, this.originY + translateY, vx, vy);

        mouseState = new MouseUpState();
    }

    onMouseDown(){
        stroke(255);
        strokeWeight(2);
        line(this.originX, this.originY, absoluteMX(), absoluteMY());
    }
}

class MouseDownStateFixToPlanet{
    constructor(callback){
        this.debounce = false;
        this.callback = callback;
    }

    onMouseUp(){
        mouseState = new MouseUpState();
    }

    onMouseDown(){
        if(this.debounce) return;
        this.debounce = true;

        let foundPlanet = null;

        for(var planet of factory.planets){
            let dx = Math.abs(planet.x - relativeMX());
            let dy = Math.abs(planet.y - relativeMY());

            if(dx <= planet.radius && dy <= planet.radius){
                foundPlanet = planet;
                break;
            }
        }

        this.callback(foundPlanet);
    }
}

class MouseUpState{
    onMouseUp(){
        
    }

    onMouseDown(){
        if(!inFrame(relativeMX(), relativeMY())) return;
        mouseState = gameMode.mouseDownState();
    }
}
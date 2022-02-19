var gameMode;
function initMode(){
    gameMode = new SpawnPlanetMode(null);
}

class GameMode{
    drawMode(){
        textSize(15);
        fill(255, 255, 255);
        stroke(255, 255, 255);

        if(this.fixedTo != null){

            noFill();
            circle(this.fixedTo.x - translateX, this.fixedTo.y - translateY, (this.fixedTo.radius*2) + 10);

            translateX = this.fixedTo.x - (drawWidth/2);
            translateY = this.fixedTo.y - (drawHeight/2);
        }
    }

    pressShift(){}
    mouseDownState(){}
    collided(planet,other){
        if(this.fixedTo == other){
            this.fixedTo = planet;
        }
    }
}

class SpawnPlanetMode extends GameMode{
    constructor(fixedTo){
        super();
        this.fixedTo = fixedTo;
    }

    drawMode(){
        super.drawMode();
        strokeWeight(1);
        textSize(15);
        text("Spawn mode", 10, 15);
    }

    pressShift(){
        gameMode = new FixToPlanetMode(this.fixedTo);
    }

    mouseDownState(){
        return new MouseDownStateSpawning();
    }
}

class FixToPlanetMode extends GameMode{
    constructor(fixedTo){
        super();
        this.fixedTo = fixedTo;
    }

    drawMode(){
        super.drawMode();
        strokeWeight(1);
        textSize(15);
        text("Fix-to-planet mode", 10, 15);
    }

    pressShift(){
        gameMode = new SpawnPlanetMode(this.fixedTo);
    }

    mouseDownState(){
        return new MouseDownStateFixToPlanet((planet) => this.fixedTo = planet);
    }

    
}
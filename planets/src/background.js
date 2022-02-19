var layers = [];

function initStarBackground(){
    layers.push(new StarBackground(1, 40, 0.3))
    layers.push(new StarBackground(2, 20, 0.6))
    layers.push(new StarBackground(3, 10, 0.8))
}

function drawBackground(){
    for(var layer of layers){
        layer.draw();
    }
}

class StarBackgroundStar{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }

    draw(tx, ty){
        if((this.x - tx) < 0) this.x += drawWidth;
        if((this.y - ty) < 0) this.y += drawHeight;

        let drawX = (this.x - tx);
        let drawY = (this.y - ty);

        drawX = drawX % drawWidth;
        drawY = drawY % drawHeight;
        point(drawX,drawY);
    }
}

class StarBackground{
    constructor(size, amount, movement){
        this.size = size;
        this.amount = amount;
        this.movement = movement;
        this.stars = [];
    }

    draw(){
        while(this.stars.length < this.amount){
            this.stars.push(new StarBackgroundStar(parseInt(Math.random() * drawWidth), parseInt(Math.random() * drawHeight)));
        }

        stroke(255);
        strokeWeight(this.size);
        for(var star of this.stars){
            star.draw(parseInt(translateX * this.movement), parseInt(translateY * this.movement));
        }
        
    }
}
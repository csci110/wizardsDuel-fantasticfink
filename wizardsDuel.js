import {game} from "./sgc/sgc.js";
import {Sprite} from "./sgc/sgc.js";

game.setBackground("floor.png");

class PlayerWizard extends Sprite {
    constructor () {
        super();
        this.name = "Marcus the Wizard";
        this.setImage("marcusSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = this.width;
        this.y = this.height;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.speedWhenWalking = 100;
    }
//Move Down   
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

//Move up
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    
//Keep Marcus in the display area
    handleGameLoop() {
        this.y = Math.max(0, this.y);
        this.y = Math.min(552, this.y);
        
    }
}



let marcus = new PlayerWizard;



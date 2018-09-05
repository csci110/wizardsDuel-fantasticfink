import {game} from "./sgc/sgc.js";
import {Sprite} from "./sgc/sgc.js";

// Sets the background for the game
game.setBackground("floor.png");

//Creates PlayerWizard class as child of Sprite class
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
        this.defineAnimation("right", 3, 5);
    }
    
    // Move Down   
    handleDownArrowKey() {
        this.playAnimation("down");
        this.speed = this.speedWhenWalking;
        this.angle = 270;
    }

    // Move up
    handleUpArrowKey() {
        this.playAnimation("up");
        this.speed = this.speedWhenWalking;
        this.angle = 90;
    }
    
    // Keep Marcus in the display area
    handleGameLoop() {
        this.y = Math.max(0, this.y);
        this.y = Math.min(552, this.y);
        this.speed = 0;
    }
    
    // Press Space Bar to shoot spell
    handleSpacebar() {
        let spell = new Spell();
        // This sets the position of the spell object equal to the position
        // of any object created from teh PlayerWizard class
        spell.x = this.width;
        spell.y = this.y;
        spell.name = "A spell cast by Marcus";
        spell.setImage("marcusSpellSheet.png");
        spell.angle = 0;
        this.playAnimation("right");
    }
}

class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    
    handleBoundaryContact() {
        // Delete spell when it leaves the display area
        game.removeSprite(this);
        
    }
}

let marcus = new PlayerWizard;



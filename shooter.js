// Includes game and Sprite modules from the file ./sgc/sgc.js
import {game} from "./sgc/sgc.js";
import {Sprite} from "./sgc/sgc.js";

// Sets the background for the game
game.setBackground("floor.png");

// Creates PlayerWizard class as child of Sprite class
class PlayerWizard extends Sprite {
    constructor () {
        super();
        this.name = "Marcus the Wizard";
        this.setImage("marcusSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = this.height;
        this.y = this.width;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("right", 3, 5);
        this.defineAnimation("left", 9, 11);
        this.speedWhenWalking = 100;
        this.spellCastTime = 0;
    }
    
    // Move Left  
    handleLeftArrowKey() {
        this.playAnimation("left");
        this.speed = this.speedWhenWalking;
        this.angle = 180;
    }

    // Move Right
    handleRightArrowKey() {
        this.playAnimation("right");
        this.speed = this.speedWhenWalking;
        this.angle = 0;
    }
    
    // Keep Marcus in the display area
    handleGameLoop() {
        this.x = Math.max(0, this.x);
        this.x = Math.min(750, this.x);
        this.y = 0;
        this.y = 550;
        this.speed = 0;
    }
    
    // Press Space Bar to shoot spell
    handleSpacebar() {
        let now = game.getTime();  // get the number of seconds since game start
        if (now - this.spellCastTime >= 2) {
            this.spellCastTime = now;
            let spell = new Spell();
            // This sets the position of the spell object equal to the position
            // of any object created from the PlayerWizard class
            spell.x = this.x;
            // The spell starts at the y coordinate the same as Marcus's 
            // position MINUS his height, allowing the spell to start just 
            // above him while avoiding collision detection.
            spell.y = this.y - this.height;
            spell.name = "A spell cast by Marcus";
            spell.setImage("marcusSpellSheet.png");
            spell.angle = 90;
            this.playAnimation("up");
            }
    }
}

// Creates Spell class
class Spell extends Sprite {
    constructor() {
        super();
        this.speed = 200;
        this.height = 48;
        this.width = 48;
        this.defineAnimation("magic", 0, 7);
        this.playAnimation("magic", true);
    }
    
    // Removes spell after it is fired
    handleBoundaryContact() {
        game.removeSprite(this);
        
    }
    
    // Removes spell sprite
    handleCollision(otherSprite) {
        if (this.getImage() !== otherSprite.getImage()) {
        // Adjust mostly blank spell image to vertical center.
        let verticalOffset = Math.abs(this.y - otherSprite.y);
        if (verticalOffset < this.height / 2) {
            game.removeSprite(this);
            new Fireball(otherSprite);
      }
  }
  return false;
    }
}

// Creates NonPlayerWizard class
class NonPlayerWizard extends Sprite {
    constructor() {
        super();
        this.name = "The Mysterious Stranger";
        this.setImage("strangerSheet.png");
        this.width = 48;
        this.height = 48;
        this.x = game.displayWidth - 2 * this.width;
        this.y = this.height;
        this.angle = 0;
        // Speed up the Dark Wizard
        this.speed = 75;
        this.defineAnimation("down", 6, 8);
        this.defineAnimation("up", 0, 2);
        this.defineAnimation("left", 9, 11);
        this.defineAnimation("right", 3, 5);
    }
    
    handleGameLoop() {
        
        if (this.x <= 0) {
            this.x = 0;
            this.angle = 0;
            this.playAnimation("down");
            }
    
        if (this.x >= game.displayWidth - this.width) {
            this.x = game.displayWidth - this.width;
            this.angle = 180;
            this.playAnimation("up");
            }
        
        if (this.angle === 90) {
            this.playAnimation("up");
            }
        
        if (this.angle === 270) {
            this.playAnimation("down");
            }
            
        if (Math.random() < 0.03) {
        let spell = new Spell();
        // This sets the position of the spell object equal to the position
        // of any object created from the PlayerWizard class
        spell.x = this.x - this.width;
        spell.y = this.y;
        spell.name = "A spell cast by the Dark Wizard";
        spell.setImage("strangerSpellSheet.png");
        spell.angle = 270;
        this.playAnimation("left");
        }
    }
}

// Creates/ends fireball
class Fireball extends Sprite {
    constructor(deadSprite) {
        super();
        this.x = deadSprite.x;
        this.y = deadSprite.y;
        this.setImage("fireballSheet.png");
        this.name = "A Ball of Fire";
        game.removeSprite(deadSprite);
        this.defineAnimation("explode", 0, 16);
        this.playAnimation("explode");
        
    }
    
    handleAnimationEnd() {
        game.removeSprite(this);
        if (!game.isActiveSprite(stranger)) {
            game.end("Congratulations!\n\nMarcus has defeated The Mysterious"
            + "\nStranger in the Dark Cloak!");}
        if (!game.isActiveSprite(marcus)) {
            game.end("You Suck!\n\nMarcus is defeated by The Mysterious"
            + "\nStranger in The Dark Cloak."
            +  "\nBetter luck next time!");
        }
    }
}

    
// Creates the Stranger
let stranger = new NonPlayerWizard();
    
// Creates Marcus
let marcus = new PlayerWizard;

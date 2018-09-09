// excute this code the dom has fully loaded
$(document).ready(function(){
    //variable declaration


    //create and object to hold our characters/

    var characters = {
        "kenobi":{
            name: "Obi-Wan kenobi",
            health: 200,
            attack:  5,
            imageUrl:"images/obi-wan.jpg",
            enemyAttackBack: 15
        },
        "Luke Skywalker":{
            name:"Luke Skywalker",
            health: 120,
            attack: 13,
            imageUrl:"images/luke-skywalker.jpg",
            enemyAttackBack:7
        },
        "Darth Sidious":{
            name: "Darth",
            health: 130,
            attack: 0,
            imageUrl:"images/darth-sidious.png",
            enemyAttackBack:25
        },
        "Darth Maul":{
            name: "Darth Maul",
            health: 180,
            attack: 25,
            imageUrl:"images/darth-maul.jpg",
            enemyAttackBack:0
        }
    };
   // when a character is selected this will be populated
   var attacker;
   // populate the rest of characters that has not being selected can be the challenger
   var combatants = [];
   // will be populate when the player chooses an opponent
    var defender;
 // Will keep track of turns during combat. Used for calculating player damage;
    var turnCounter = 1;
    // keeps tracks of  opponents defeated
    var killCount =0;
 // functions that makes the game run
 //=================================================================================
  // this function will render a character card to the page.
  // the character rendered. and their status is deteremined by the arguement.

  var renderCharacter = function(character,renderArea){
// this block of code builds the caracter card, and renders it to the page.
  
var charDiv = $("<div class ='character' data-name ='"+ character.name + "'>");
var charName = $("<div class = 'character-name'>").text(character.name);
var charImage =$("<img alt ='image' class='character-image'>").attr("src",character.imageUrl);
var charHealth =$("<div class ='character-health'>").text(character.health);
charDiv.append(charName).append(charImage).append(charHealth);
 $(renderArea).append(charDiv);
  };
  // this function will load all the characters into the character section to be selected.
   var initializeGame = function(){
       // loops through the characters object and call the renderCharacter function on each character to render their card.
      for(var key in characters) {
          renderCharacter(characters[key],"#characters-section");
      }
   } ;

   // remember to run the function here
   initializeGame();
   // this function handles updating the selected player or the current defender. if there is no selected player/defender
   // function will also place the character based  on the areaRender chosen(selected-character or defender);

var updateCharacter = function(charObj, areaRender){
    // first empty the area so that we can re-render the new object
    $(areaRender).empty();
    renderCharacter(charObj,areaRender);
};
// this function will render the available-ti-attack, this will run once after a character  has been selected
 var renderEnemies = function(enemyArr){
     for(var i = 0; i<enemyArr.length; i++){
         renderCharacter(enemyArr[i],"#available-to-attack-section");
     }
 };
  // function to  handle rendering game messages.
  var renderMessage = function(message){
      // builds the message and appends it to the the page.
     var gameMessageSet = $("#game-message");
     var newMessage =$("<div>").text(message);
     gameMessageSet.append(newMessage);
  };
  // function which handles restarting the game victory or defeat
var restartGame = function(resultMessage){
    // When the 'restart" button is clicked, reload the page
    var restart =$("<button> Restart </button>").click(function(){
        location.reload();
    });

    // builds the div that displays victories and defeats
  
     var gameState = $("<div>"). text(ResultMessage);

     // Render the restart button and the defeat message
     $("body").append(gameState);
     $("body").append(restart);
};
 // function to the clear the game message section
var clearMessage = function(){
    var gameMessage = $("#game-message");
    gameMessage.text("");
};
///////////////////===

// on  click event for selectiong our character.

$("#characters-section").on("click",".character", function(){
    // save the clicking for characters name
    
    var name =$(this).attr("data-name");
    console.log(this);
    // if a player has not been chosen yet information
    if(!attacker){
        // we populate attacker with the selected character's
        attacker = characters[name];
        for(var key in characters){
            if(key !==name){
                combatants.push(characters[key]);
            }

        }
        ///////////
        // hides the character select div.
        $("#characters-section").hide();
    // then render our selected character and opponents
      updateCharacter(attacker, "#selected-character");
      renderEnemies(combatants);
    }
});
////////////////////////////////////
// creates an event for each enemy.
$("#available-to-attack-section").on("click",".character",function(){
    // saving the opponent's name
  var name = $(this).attr("data-name");

  // if there is no defender, the clicked enemy will become the defender
  if($("#defender").children().length ===0){
      defender = characters[name];
      updateCharacter(defender,"#defender");

      //remove element as will now be a new defender
      $(this).remove();
      clearMessage();
  }
});
// when you click the attack button, run the following game logic

$("#attack-button").on("click",function(){
 // if there is a defender, combat will occur

 if($("#defender").children().length !== 0){
     // creates a message for our attack and our opponets counter attack
    var attackMessage = "You attacked" + defender.name + "for" + attacker.attack * turnCounter + "damage.";
    var counterAttackMessage = defender.name + "attacked you back for" + defender.enemyAttackBack + "damage";
    clearMessage();

    // reduce defender health by your attack value
    defender.health -= attacker.attack * turnCounter;

// if the enemy still has health

if(defender.health >0 ){
    // Render the enemy's updated character card.
    updateCharacter(defender,"#defender");
    // Render the combat messages
    renderMessage(attackMessage);
    renderMessage(counterAttackMessage);

    // reduce your health by the opponent's attack value/
    attacker.health -= defender.enemyAttackBack;
    
    // render the player's updated character card.

    // render the players updated character
    updateCharacter(attacker,"#selected-character");

    // if you have less than zero health the game ends.
    // we call the restartGame function to allow the user to restart the game and play game.

if(attacker.health <=0) {
   clearMessage();
   restartGame("you have been defeated.. GAME OVER!!!");
   $("#attack-button"),off("click");
}
 }
 else{
     // if the enemy has less than zero health they are defeated.
     // remove your oppnent'
     $("#defender").empty();
     var gameStateMessage ="you have defeated" + defender.name +", you can choose to fight the enemy.";
     renderMessage(gameStateMessage);
   
     // Increment your kill count.
     killCount++;
     // if you have killed all of your oppnents you win.
     // call the restartGame function to allow the user to restgart the game and play.
     if (killCount >= combatants.length) {
        clearMessage();
        $("#attack-button").off("click");
        restartGame("You Won!!!! GAME OVER!!!");
      }
    }
    // Increment turn counter. This is used for determining how much damage the player does.
    turnCounter++;
  }
  else {
    // If there is no defender, render an error message.
    clearMessage();
    renderMessage("No enemy here.");
  }
});
});

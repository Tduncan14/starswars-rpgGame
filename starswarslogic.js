// excute this code the dom has fully loaded
$(document).ready(function(){
    //variable declaration


    //create and object to hold our characters/

    var characters = {
        "kenobi":{
            name: "Obi-Wan kenobi",
            health: 200,
            attack:  5,
            imageUrl:"assets/images/obi-wan.jpg",
            enemyAttackBack: 15
        },
        "Luke Skywalker":{
            name:"Luke Skywalker",
            health: 120,
            attack: 13,
            imageUrl:"assets/images/luke-skywalker.jpg",
            enemyAttackBack:7
        },
        "Darth Sidious":{
            name: "Darth",
            health: 130,
            attack: 0,
            imageUrl:"assets/images/darth",
            enemyAttackBack:25
        },
        "Darth Maul":{
            name: "Darth Maul",
            health: 180,
            attack: 25,
            imageUrl:"assets/images/darth-maul.jpg",
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
var charHealth =$("<div class ='character-health'>")

  };

})
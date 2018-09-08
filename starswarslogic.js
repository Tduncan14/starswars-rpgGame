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

})
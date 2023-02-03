# Goose-Feed-Game
This is a repository for the files of Tristan Peregrine's Goose Feeding Game
## Contents
index.html containts all the elements of the page broken up into a navbar, a level select, and a gallery where the geese appear. 

The Navbar conatins A Reset Button, The Game Title, Round Details, Mode Select, and a button for the Instructions.
There are ten levels to each mode. Only level one is available on reset with locked levels being greyed out.
The Goose Gallery contains all the geese to be fed.

styles.scss styles the game and allows for appropriate sizing on variable screen widths.

styles.scss.map is used to convert the scss file to the readable and usable styles.css that is the styling sheet for index.html.  

Goose-Feed-Game.pdf is a diary log of my progression building the game including psuedo code and milestones hit along the way.

## Gameplay

* The aim of the game is to feed all the geese by clicking on them when they appear and before they disappear.
* There are two modes, Standard and Flying.
  1. Standard: In this mode geese appear at random places in the gallery and remain static until they are fed or flee.
  2. Flying: In this mode geese appear at the bottom of the screen and move the the edge of the gallery. They must be fed before they reach the gallery edge else they will have fled.
* A level can only be selected once one has finsihed. 
* A new level is only unlocked when 50% of the previous level is complete.
* Levels get progressively harder with Flying being harder than standard by default.
* Progress of a mode is saved between changing modes but lost on page reload or pressing Reset.
* Each mode has ten levels/rounds. 

Good Luck beating all ten levels!!



## Calculator's website:
https://tristanpere.github.io/Goose-Feed-Game/
## Setup / Installation
 
 Within your computers terminal:
 * Locate to a directory you wish to use as a save location
 * Copy git repo url to clone it
 ```bash
 git clone https://github.com/TristanPere/Goose-Feed-Game/
 ```
 * Paste into terminal 
 * Change directories into /Goose-Feed-Game/
 * Open index.html

# Tag
Originally intended to just be a basic hunter and prey scenario game where one player was supposed to be a butcher with the goal of chasing down and tagging the second user before they could get to the end of the map. The theme evolved into a tag game where the roles of the two players alternate. In this new version of the original game, it is a two player tag game. The two players are placed in a setting with platforms that they need to jump or fall onto and also encounter some obstacles to give them a little bit of a tough time. The game displays a message saying who is supposed to be tagged, the person who is supposed to be tagged has to get to the bottom of the map on either of the two finish lines before being tagged by the other user. After every game the roles switch so both users can get the full experience. The game also comes with some short instructions on how to play it along with an option to check your score. 

## Link
[deployed game link](https://robertoooc.github.io/project1-pitch/)








## Tech Being Used
* HTML/CSS - Canvas to display game
* Javascript
## WireFrames
<img src="https://i.postimg.cc/dQT4dQyB/Untitled-Draft-1.jpg" alt="game layout">

## MVP Goals
* Render a starting menu page
* Within menu page give options that would include starting game, checking how many times a user wins, instruction guide
* Render game page with piglet and butcher
* Render borders, static obstacles, and moving obstacles that either user can't move through
* Allow both users to move around using (wasd) and (up,down,left, right) keys
* Create logic to check if butcher catches up to piglet and wins
* Create logic to check if piglet makes it to the end before being caught and win



## Stretch Goals
* Keep track of how many wins each user has
* Before starting game, give an option to users to select different characters 
* If enough time available, create more than one level/setting of the game

## Potential Roadblocks
* Might encounter issues with users pressing their selected keys at the same time
* Might have some issues with animating and allowing jumps/falls

## Main-Approach
Right from the start I went with the object oriented programming route because it made the most sense to use. This route would allow me to store character and obstacle information, and be able to update it as needed. Along with using classes I chose to use HTML Canvas as my main display to update the events throughout the game. For this game specifically it definitely was the right choice because of the visuals, but coming into this project I wasn't too familiar with canvas which was the main reason why I felt encouraged to use it and get a better understanding of it's properties. Once I finally had moving characters and implemented a gravity and jump feature I encountered many problems with trying to prevent a character from falling off the screen or falling through a platform. For the hit detection I originally tried working with figuring out whether a charachter hit any side of a obstacle and trying to make a character's movement stop then and there, but with the implementation of gravity and jumping it was not working no matter what I tried. I didn't want to hardcode any specific values into this project to develop a better sense of working with algorithims and so I could keep adding on things in the future. It was then until I finally came up with the idea of mapping out the entire canvas in an 2d array. This was my breakthrough because it meant that everytime I created a new obstacle I could update the array of the canvas, by doing this when a user wants to move I could check whether that spot that a user wants to move to is taken or free. From there I just kept working off of what I had and referenced my 2d array throughout the whole code which helped a lot.

## Reflection -
After finishing this project, there were some parts of my code that I don't think I full grasped. One of them being the implementation of gravity and a jumping feature, originally I was just incrementing and decrementing pixels by a fixed amount which didn't give a great illusion and user experience. I did end up having to look at tutorials on implementing those features. Once I took the new approach that I learnt from them, I understood the concepts well and to a certain degree but not completely enough to manipulate them and not encounter any issues with them later down the line. This was the main thing that caused some small bugs later down the line even after I completed the project. I had a very tough time trying to get characters to stop falling through objects or jump through them, although at last I finally had something that was most working it would've been nice to try to understand the concept better to have taken a shorter and more efficient approach than I did. Another problem that I encountered was working with sprites and animating them, I think it was mostly because it was the first time that I had seen or experienced working with them that made it tough on me but I would like to go back and brief up a better understanding of working with them. Although I encountered many issues with this project along the way I am still proud of it, especially my implementation of a 2d array to map out the canvas. That was my 'Aha' moment which flipped the entire dynamic of my project to be more productive.

## Sources used 
* [source for gravity](https://youtu.be/4q2vvZn5aoo)
* [learning how to use sprites](https://youtu.be/MHGgVlrlkYc)
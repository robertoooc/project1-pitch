let pressedKeys ={}
const canvas = document.getElementById('canvas')
let scoreBoard = document.getElementById('scoreboard')
let menuContainer = document.getElementById('menuPage')
let bottomButtons = document.getElementById('bottomButton')
let backToMenu=document.getElementById('backToMenu')
let menuStart=document.getElementById('menuStart')
let instructions=document.getElementById('instructions')
let instructionsMessage=document.getElementById('instructionsm')
let score=document.getElementById('score')
let endButton = document.getElementById('end')
let startButton = document.getElementById('start')
let message = document.getElementById('message')
//grabbing all html elements to update later on or add event listeners
instructionsMessage.style.display ="none"
message.style.display = 'none'
backToMenu.style.display ='none'

let endGame = false
let user1 = false
//creating variables that will let game start

backToMenu.addEventListener('click',function(){
    message.style.display = 'none'
    scoreBoard.style.display= 'none'
    canvas.style.display = 'none'
    menuContainer.style.display = 'inline-block'
    backToMenu.style.display = "none"
    endButton.style.display = "none"
    startButton.style.display = 'none'
})
menuStart.addEventListener('click',function(){
    instructionsMessage.style.display ="none"
    canvas.style.display = 'inline-block'
    menuContainer.style.display = 'none'
    startGame()
})


instructions.addEventListener('click',function(){
    scoreBoard.style.display ="none"
    instructionsMessage.style.display ="block"

})
score.addEventListener('click',function(){
    instructionsMessage.style.display ="none"
    scoreBoard.innerText = `Mask wins: ${mask.wins} \n Frog wins: ${frog.wins} \n number of games: ${Players.numGames}`
    scoreBoard.style.display = 'block'
})
startButton.style.display ='none'
endButton.style.display ='none'
endButton.addEventListener('click',function(){
    endGame = true
    backToMenu.style.display = "inline-block"    
    startButton.style.display = "inline-block"    
})
startButton.addEventListener('click',startGame)

const ctx = canvas.getContext('2d')


let cWidth = parseInt(window.getComputedStyle(canvas)['width'])
let cHeight = parseInt(window.getComputedStyle(canvas)['height'])
//getting the computed width and height but turning that value into an integer and cutting off any decimals
let checkheight = false
let checkwidth = false
let check =false
while(check==false){
    cWidth % 10!==0 ? cWidth++ : checkwidth = true
    cHeight % 10!==0 ? cHeight++ : checkheight = true
    checkwidth&&checkheight ? check=true : check =false
}
//turning the computed height into values that are divisible by 10 to help out later down the line

canvas.setAttribute('height',cHeight.toString())
canvas.setAttribute('width',cWidth.toString())
//setting the canvas height and width but turning them back into strings
let grid = []
for(let i = 0; i <=cWidth; i++){
    grid[i] = []
    for(let j = 0; j<=cHeight; j++){
        grid[i][j] = 1
    }
}
//creating a 2d array to map out the entire canvas so later on I can reference it rather than every single object
function startGame(){

    if(user1==true){
        user1 = false
        message.innerText = `It's the Mask's turn to chase the Frog`
    }
    else{
        user1 = true
        message.innerText= `It's the Frog's turn to chase the Mask`
    }
    //checks who has been it and switches roles for the users
    Players.numGames++
    endGame = false
    message.style.display = 'inline'
    startButton.style.display ='none'
    endButton.style.display = "inline-block"
    mask.x = 0
    mask.y = 10
     frog.x = cWidth-playerSize
     frog.y = 10
    animate()  
    //resets character to the starting positions and calls the animate function
}


class Objects{
    constructor(x,y,width,height,imageSrc){
        this.x =x
        this.y = y
        this.width = width
        this.height = height
        this.direction = ' '
        this.image = new Image()
        this.image.src = imageSrc
    }
    create(){
        for(let i = this.x; i <=this.x+this.width; i++){
            for(let j = this.y; j<=this.y+this.height; j++){
                grid[i][j]='taken'
            }
        }
        //everytime a new obstacle is created the 2d array is updated to let me know which spots are taken
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        //drawing out the obstacles
    }
    moving(){
        if(this.direction=='left'){     
            this.x--
            
            if(grid[this.x-1][this.y]=='taken'){
                this.direction ='right'
                //checking if the next spot is already taken, if so changes direction
            }
            for(let i = this.x; i <=this.x+this.width; i++){
                for(let j = this.y; j<=this.y+this.height; j++){
                    grid[i+1][j]=1
                }  } //updating the 2d array telling it that the spot that it previoulsy held is now open and should allow a user to fall through
            
        }
        if(this.direction=='right'){
            if(typeof(grid[this.x+this.width+1][this.y])=='string'){
                this.direction ='left'
                //checking if the next spot is already taken, if so changes direction
            }
            for(let i = this.x; i <=this.x+this.width; i++){
                for(let j = this.y; j<=this.y+this.height; j++){
                    grid[i-1][j]=1
                }
            }//updating the 2d array telling it that the spot that it previoulsy held is now open and should allow a user to fall through
            this.x++

        }
        this.create()
    }
    end(){
        this.create()
        for(let i = this.x; i <=this.x+this.width; i++){
            for(let j = this.y; j<=this.y+this.height; j++){
                grid[i][j]= 0
            }
        }
        //this is for the finish line and setting its x and y coordinates to 0 to just make it easier later on to check if a user enters it
    } 
}
class Images {
    constructor(x,y,width,height, imageSrc){
        this.x = x
        this.y = y
        this.width = width
        this.height= height
        this.image = new Image()
        this.image.src = imageSrc
    }
    create(){
        ctx.clearRect(0,0,cWidth,cHeight)
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height)
    }
}//just creating the background image, couldve been done better by being implemented into the object class but didn't want to break the code
let background = new Images(0,0,cWidth,cHeight, "https://www.gameart2d.com/uploads/3/0/9/1/30917885/7536921_orig.png")
let userHeight = Math.round(cWidth/25)
let blockHeight = Math.round(cWidth/37)
let playerSize = Math.round(blockHeight*9/8)
let topWidth = Math.round(cWidth/3)
let topRowHeight = Math.round(cHeight/8)
//creating variables relative to the computed height and width
let block3 = new Objects(0,topRowHeight,topWidth,blockHeight,"./sprites/2.png") 
let block = new Objects(cWidth-(topWidth),topRowHeight,topWidth,blockHeight,"./sprites/2.png")  
let block4 = new Objects(Math.round((cWidth/5)*2),topRowHeight*2+blockHeight,Math.round(cWidth/5),blockHeight,"./sprites/2.png")
let block5 = new Objects(topWidth,(topRowHeight*2)+(blockHeight)*2,topWidth,blockHeight,"./sprites/2.png")
let block6 = new Objects((Math.round(topWidth*3/4)),(topRowHeight*2)+(blockHeight*3),Math.round(cWidth/2),blockHeight,"./sprites/2.png")
let block7 = new Objects((Math.round(topWidth*2/4)),Math.round(cHeight/2),Math.round(cWidth*1/4),blockHeight,"./sprites/2.png")
let block12 = new Objects(Math.round(cWidth*3/5),Math.round(cHeight/2),Math.round(cWidth*1/4),blockHeight,"./sprites/2.png")
let block10 = new Objects(Math.round(cWidth*3/5),Math.round(cHeight* 7/10)+blockHeight,Math.round((cWidth/5)*2),blockHeight,"./sprites/2.png")
let block11 = new Objects(0,Math.round(cHeight* 7/10)+blockHeight,Math.round((cWidth/5)*2),blockHeight,"./sprites/2.png")
let block9 = new Objects(cWidth-Math.round(topWidth*3/4),Math.round(cHeight* 7/10),Math.round(topWidth*3/4),blockHeight,"./sprites/2.png")
let block8 = new Objects(0,Math.round(cHeight* 7/10),Math.round(topWidth*3/4),blockHeight,"./sprites/2.png")
let obstacle3=new Objects(Math.round(topWidth*2/5),Math.round(cHeight* 7/10)-blockHeight,blockHeight,blockHeight,"./sprites/stone.png")
let obstacle4=new Objects(cWidth-Math.round(topWidth*2/5),Math.round(cHeight* 7/10)-blockHeight,blockHeight,blockHeight,"./sprites/stone.png")
let finishLine2 = new Objects(cWidth-(blockHeight*3),cHeight-(blockHeight*3),blockHeight*3,blockHeight*3,"./sprites/rightFinishLine.png" )
let finishLine = new Objects(0,cHeight-(blockHeight*3),blockHeight*3,blockHeight*3,"./sprites/leftFinishLine.png" )
let obstacle1 =new Objects(Math.round(topWidth*3/5),topRowHeight-blockHeight,blockHeight,blockHeight,"./sprites/stone.png")
let obstacle2=new Objects(cWidth-Math.round(topWidth*3/5),topRowHeight-blockHeight,blockHeight,blockHeight,"./sprites/stone.png")
let obstacle6 = new Objects(Math.round(cWidth*3/5)-(blockHeight*2),Math.round(cHeight/2),Math.round(blockHeight*3/2),blockHeight,"./sprites/crate.png", 'left')
obstacle6.direction = 'left'
let obstacle5 = new Objects((Math.round(topWidth*2/4))+Math.round(cWidth*1/4)+blockHeight,Math.round(cHeight/2),Math.round(blockHeight*3/2),blockHeight,"./sprites/crate.png",'right')
obstacle5.direction = 'right'
const speed = Math.round(cWidth/48)
const downAccelerate = 1
//setting the layout of the map, avoiding using specific pixel sizes with the intention to make the canvas a relative size to the screen at any size
class Players{
    static numGames = 0
    constructor(name,x,y,imageSrc){
        this.wins = 0
        this.x = x
        this.y = y
        this.jump = {
            up: 0,
            gravity: 0
        }
        this.width = blockHeight
        this.height = blockHeight   
        this.name = name
        this.image = new Image()
        this.image.src = imageSrc
        this.direction 
        this.numImgs = 0 
        this.frameNum = 0
        this.drawVar = ' '
        this.platform = true
        
    }
         
    gravityUpdate(){   
        this.y+=this.jump.gravity
        if(grid[this.x][this.y]!='taken'){
            this.y-=this.jump.up
            //the if statement's purpose is to make sure that the character can't jump through a platform from underneath
        
            //this gives the jumping feature subtracts the jump variable from the y position of character because a smaller y means a higher position
        }
        if((this.y + this.height + this.jump.gravity < cHeight)){
            this.jump.gravity+=downAccelerate       
            //if statement checks that the y position of a player plus the gravity isn't past the the limits of the canvas
            //if true it increases the gravity over time to give a realistic falling effect
        }
        else{
            this.jump.gravity = 0
            this.jump.up = 0
            //in the case that the character is not jumping or falling it sets its value to 0 to avoid falling through objects
        }

        if(this.platform==false){
            //checking for the jumping and falling actions
            if(this.jump.gravity < this.jump.up){
                this.image.src = `./sprites/${this.name}Jump(32x32).png`
                this.drawVar = 0
                //giving a jumping sprite when a character jumps
                //the drawVar tells the code that it's only one image and shouldn't crop anything like we do when running
            }
            else if(this.jump.gravity>= this.jump.up && this.jump.gravity >2){
                this.image.src = `./sprites/${this.name}Idle(32x32).png`
                this.frameNum ==10 ? this.frameNum=0:this.frameNum++
                this.drawVar = this.frameNum*32
                //setting the falling action to a idle sprite because the falling sprite was just one solo image and was giving many problems and disappearing
            } 
        }
        if(this.platform==true){
            this.drawVar = this.frameNum*32
            //don't need to set a img src because it's done in the movement function along with setting the frameNum which is used to crop the sprite
            //multiplting by 32 because that's the size of each individual image
        }


            ctx.drawImage(this.image,this.drawVar,0,32,32,this.x,this.y,this.width,this.height)
            //making sure to add this at the bottom so only one image is drawn at a time and not causing any errors

        }




    
    }
        



let frog = new Players('frog',50,70,'./sprites/frogRunLeft(32x32).png')
let mask = new Players('mask',5,10,'./sprites/maskRunRight(32x32).png')
//creating the two players so they're available to use througout the game 

const jumpVar = Math.round(cHeight/62)
//setting the jump variable relative to the size of the canvas
function movement(){
        if(pressedKeys.ArrowUp&&frog.jump.gravity<=1 ){
            //first checking that a character cannot jump mid air
            //if gravity is 1 or less it means that a user is on some platform or on the ground
        if((typeof(grid[frog.x][frog.y])!='string')&&typeof(grid[frog.x][frog.y+frog.height])!='string'){
            //safety to try and avoid a character from jumping through platforms
            frog.jump.up +=jumpVar
            frog.platform = false
            frog.frameNum =0
            //updating variables to tell the code to jump, updating the platform boolean because once in the air the character is not supported by a platform until it lands again,updating the frameNum for when the idling/falling action starts

        }
        }             
        if(pressedKeys.w&&mask.jump.gravity<=1){
        if((typeof(grid[mask.x][mask.y])!='string')&&typeof(grid[mask.x][mask.y+mask.height])!='string'){
            mask.jump.up += jumpVar
            mask.platform = false  
            mask.frameNum =0              
        }
        }
            if(pressedKeys.ArrowLeft){
                if((typeof(grid[(frog.x)-speed][frog.y])!='string')&&(typeof(grid[(frog.x)-speed][frog.y+frog.height])!='string')){
                    //basically checks if the next spot that the user wants to take is taken or not by an obstacle or platform
                    //if not then it will run this code segment to update the image src and update the frameNum to loop through the sprite as it moves 
                    frog.image.src = './sprites/frogRunLeft(32x32).png'
                    frog.frameNum ==11 ? frog.frameNum=0:frog.frameNum++
                    frog.x -= speed
                }
            }
            if( pressedKeys.a){
                if((typeof(grid[(mask.x)-speed][mask.y])!='string')&&(typeof(grid[(mask.x)-speed][mask.y+mask.height])!='string')){


                    mask.image.src = './sprites/maskRunLeft(32x32).png'
                    mask.frameNum ==11 ? mask.frameNum=0:mask.frameNum++
                    mask.x -= speed
                }
            }
            if(pressedKeys.ArrowRight){
                if((typeof(grid[(frog.x+frog.width)+speed][frog.y])!='string')&&(typeof(grid[(frog.x+frog.width)+speed][frog.y+frog.height])!='string')){

                    frog.image.src = './sprites/frogRunRight(32x32).png'
                    frog.frameNum ==11 ? frog.frameNum=0:frog.frameNum++
                    frog.x +=speed
                }
            }
            if(pressedKeys.d){
                if((typeof(grid[(mask.x+mask.width)+speed][mask.y])!='string')&&(typeof(grid[(mask.x+mask.width)+speed][mask.y+mask.height])!='string')){

                    mask.image.src = './sprites/maskRunRight(32x32).png'
                    mask.frameNum ==11 ? mask.frameNum=0:mask.frameNum++
                    mask.x += speed
                }                        
            }



        }
        function defaultSetting(){
            //just updating the canvas after every animation by drawing out all the elements again
            background.create()
            block.create()
            block3.create()
            block4.create()
            block5.create()
            block6.create()
            block7.create()
            block8.create()
            block9.create()
             block10.create()
             block11.create()
             block12.create()
             obstacle1.create()
             obstacle2.create()
             obstacle3.create()
            obstacle4.create()
            obstacle5.moving()
            obstacle6.moving()
            //these two are calling a different method because they are the moving objects with diferent properties from the others
             finishLine.end()
             finishLine2.end()
             //these are the two finish lines at the end and calling a differnt method from the others
        }       
        document.addEventListener('keydown', function(e){
            pressedKeys[e.key] = true
            if(endGame==false){
                movement()         
            }
        })
        document.addEventListener('keyup', function(e){
            pressedKeys[e.key] = false
            if(endGame==false){
                movement()         
            }            
        }) 
        //the two addeventListeners that are going to update the pressedkey object telling it when some keys are pressed and when they're no longer pressed to not allow movement after a key is let go
        //then calling the movement function where it will update the character's movements
        function animate(){
            defaultSetting()
            frog.gravityUpdate()
            mask.gravityUpdate()
            //upating the setting and character images
            if(mask.jump.gravity != 0 &&grid[mask.x+mask.width][mask.y+mask.height]=='taken'||grid[mask.x][mask.y+mask.height+mask.jump.gravity]=='taken'){
                mask.jump.gravity =0
                mask.jump.up =0
                mask.platform = true
                //should find a better way to do this because without this section the users will fall through platforms 
            }
            if(frog.jump.gravity != 0 &&grid[frog.x+frog.width][frog.y+frog.height]=='taken'||grid[frog.x][frog.y+frog.height+frog.jump.gravity]=='taken'){
                frog.jump.gravity =0
                frog.jump.up =0
                frog.platform = true
            }
            user1 ==true ? obstacleBump(mask,frog,finishLine): obstacleBump(frog,mask,finishLine)
            //checking who's turn it is to be tagged, based on who is being tagged it just changes the order in which it calls the obstaclebump function to distinguish correct wins
            if(endGame==false){
                requestAnimationFrame(animate)
                //if a user wins, the endgame boolean is set to true in which case here it will continue playing until so
            }
            else if(endGame == true){
                //once game is ended it will let the back to menu and start a new game button visible again at the bottom of the screen
                endButton.style.display = "none"
                backToMenu.style.display ='inline-block'
                startButton.style.display = "inline-block"
            }
        }
            function obstacleBump(obj1,obj2,finishLine){
                //checking if the two characters bump into each other (tag)
                 let tSide = obj1.y + obj1.height <= obj2.y
                let bSide = obj2.y + obj2.height <= obj1.y
                let rSide = obj1.x + obj1.width <= obj2.x 
                let lSide = obj2.x + obj2.width <= obj1.x
                if(bSide==false&&tSide==false&&lSide==false&&rSide==false){
                   obj2.wins++
                   endGame = true
                   message.style.display = "inline"
                   message.innerText = `The ${obj2.name.toUpperCase()} is the Winner!!`
                   //depending on who is being tagged the obj2 character tagged their oponent and won 
                   //will display a message saying who won and will increment their wins
                }
                if(grid[obj1.x][obj1.y]==0){
                    obj1.wins++
                    message.style.display = "inline" 
                    message.innerText = `${obj1.name.toUpperCase()} is the Winner!!`
                    endGame = true
                    //depending on who is being tagged the obj1 character made it to the finish line without being tagged
                   //will display a message saying who won and will increment their wins
                }
    }

    

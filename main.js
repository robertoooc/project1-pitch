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
instructionsMessage.style.display ="none"
message.style.display = 'none'
let endGame = false
backToMenu.style.display ='none'


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
    //scoreBoard.innerText = 'Welcome to Piglet Run, to begin a new Game press the Start playing Button\n This is a multiplayer game, a predator/(the butcher) and prey/(piglet) situation\n the keys to control the butcher are W/(jump) A/(shift left) D/(shift right)\n The keys to control piglet are  \n To check the scoreBoard press the Score Board button \n '
})
score.addEventListener('click',function(){
    instructionsMessage.style.display ="none"
    scoreBoard.innerText = `piglet wins: ${piglet.wins} \n butcher wins: ${butcher.wins} \n number of games: ${Players.numGames}`
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
//let p = document.querySelector('p')
const ctx = canvas.getContext('2d')



let cWidth = parseInt(window.getComputedStyle(canvas)['width'])
let cHeight = parseInt(window.getComputedStyle(canvas)['height'])
let checkheight = false
let checkwidth = false
let check =false
while(check==false){
    cWidth % 10!==0 ? cWidth++ : checkwidth = true
    cHeight % 10!==0 ? cHeight++ : checkheight = true
    checkwidth&&checkheight ? check=true : check =false
}
//console.log(cWidth, cHeight)
canvas.setAttribute('height',cHeight.toString())
canvas.setAttribute('width',cWidth.toString())
let grid = []
for(let i = 0; i <=cWidth; i++){
    grid[i] = []
    for(let j = 0; j<=cHeight; j++){
        grid[i][j] = 1
    }
}
function startGame(){
    message.style.display = 'none'
    Players.numGames++
    endGame = false
    startButton.style.display ='none'
    endButton.style.display = "inline-block"
     piglet.x = 0
     piglet.y = 10
     butcher.x = cWidth-playerSize
     butcher.y = 10
     //piglet.direction = 'right'
                    //piglet.imageSrc = 'sprites/maskRunRight(32x32).png'
                    //butcher.direction = 'left'
                    //butcher.imageSrc = 'sprites/frogRunRight(32x32).png'
    animate()  
}


class Objects{
    constructor(x,y,width,height,imageSrc){
        this.x =x
        this.y = y
        this.width = width
        this.height = height
        //this.color = color
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
        //ctx.fillStyle=this.color
        //ctx.fillRect(this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
    }
    moving(){
        if(this.direction=='left'){     
            this.x--
            
            if(grid[this.x-1][this.y]=='taken'){
                this.direction ='right'
            }
            for(let i = this.x; i <=this.x+this.width; i++){
                for(let j = this.y; j<=this.y+this.height; j++){
                    grid[i+1][j]=1
                }  }

        }
        if(this.direction=='right'){
            if(typeof(grid[this.x+this.width+1][this.y])=='string'){
                this.direction ='left'
                ///console.log('stop')
            }
            for(let i = this.x; i <=this.x+this.width; i++){
                for(let j = this.y; j<=this.y+this.height; j++){
                    grid[i-1][j]=1
                }
            }
            this.x++

        }
        //console.log(this.direction)
        
        //this.x++
        this.create()
    }
    animation(){

    }
    end(){
        this.create()
        for(let i = this.x; i <=this.x+this.width; i++){
            for(let j = this.y; j<=this.y+this.height; j++){
                grid[i][j]= 0
            }
        }
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
}
let background = new Images(0,0,cWidth,cHeight, "https://www.gameart2d.com/uploads/3/0/9/1/30917885/7536921_orig.png")
let userHeight = Math.round(cWidth/25)
let blockHeight = Math.round(cWidth/37)
let playerSize = Math.round(blockHeight*9/8)
let topWidth = Math.round(cWidth/3)
let topRowHeight = Math.round(cHeight/8)
let block3 = new Objects(0,topRowHeight,topWidth,blockHeight,"./sprites/2.png") //90 
let block = new Objects(cWidth-(topWidth),topRowHeight,topWidth,blockHeight,"./sprites/2.png") //90 
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

let finishLine2 = new Objects(cWidth-(blockHeight*2),cHeight-(blockHeight*2),blockHeight*2,blockHeight*2,"./sprites/rightFinishLine.png" )
let finishLine = new Objects(0,cHeight-(blockHeight*2),blockHeight*2,blockHeight*2,"./sprites/leftFinishLine.png" )
let obstacle1 =new Objects(Math.round(topWidth*3/5),topRowHeight-blockHeight,blockHeight,blockHeight,"./sprites/stone.png")
let obstacle2=new Objects(cWidth-Math.round(topWidth*3/5),topRowHeight-blockHeight,blockHeight,blockHeight,"./sprites/stone.png")
let obstacle6 = new Objects(Math.round(cWidth*3/5)-(blockHeight*2),Math.round(cHeight/2),Math.round(blockHeight*3/2),blockHeight,"./sprites/crate.png", 'left')
obstacle6.direction = 'left'
let obstacle5 = new Objects((Math.round(topWidth*2/4))+Math.round(cWidth*1/4)+blockHeight,Math.round(cHeight/2),Math.round(blockHeight*3/2),blockHeight,"./sprites/crate.png",'right')
obstacle5.direction = 'right'
const speed = Math.round(cWidth/48)
//console.log(playerSize)
const downAccelerate = 1

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
        
    }
    create(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
        }           
    gravityUpdate(){   
        //console.log(this.imageSrc)
        
        this.y+=this.jump.gravity

        if(grid[this.x][this.y]!='taken'){
            //this.direction = 'jump'
            this.y-=this.jump.up
        }
        if((this.y + this.height + this.jump.gravity < cHeight)){
            //this.direction= 'right'
            this.jump.gravity+=downAccelerate
            this.count++             
        }
        else{
            this.jump.gravity = 0
            this.jump.up = 0
            this.count =0
        }

        // if(this.jump.gravity<1){
        //     if(this.name=='frog'){
        //         this.jump.gravity <this.jump.up ? this.image.src = 'sprites/frogJump(32x32).png':this.image.src ='sprites/frogFall(32x32).png'
        //     }
        //     else{
        //         this.jump.gravity <this.jump.up ? this.image.src = 'sprites/maskJump(32x32).png':this.image.src ='sprites/maskFall(32x32).png'
        //     }
        //     //this.name == 'frog' ? this.image.src ='sprites/frogFall(32x32).png' : this.image.src ='sprites/maskFall(32x32).png' 
        //     ctx.drawImage(this.image,this.x,this.y,this.width,this.height)
        // }
        // if(this.jump.gravity<2){
        //     this.numImgs = 12
        //     if(this.frameNum == this.numIgs){
        //         this.frameNum = 0
        //     }
        //     ctx.drawImage(this.image,this.frameNum*32,0,32,32, this.x, this.y, this.width, this.height)
        //     this.count++
        // }
        //console.log(this.image.src)
        // if((this.jump.gravity <2) &&(this.image.src !== `sprites/${this.name}Fall(32x32).png`)){
            //     console.log('yes')
            //     this.drawVar = 0
            // }
            // else if(this.jump.gravity<2){
                //     this.drawVar = this.frameNum*32
                // }
                //console.log(this.image.src)
            if((this.jump.gravity<2)){
                if(this.image.src != `./sprites/${this.name}Fall(32x32).png`){
                    this.drawVar = this.frameNum*32
                    console.log(this.image.src != `./sprites/${this.name}Fall(32x32).png`)
                }
                else{
                    this.drawVar = 0
                    console.log('no')
                }
            }//put everything underneath in an else
            else if(this.jump.gravity < this.jump.up){
                this.image.src = `./sprites/${this.name}Jump(32x32).png`
                this.drawVar = 0
            }
            else{
                this.image.src =`./sprites/${this.name}Fall(32x32).png`
                this.drawVar = 0
            }

            //console.log(this.image.src,this.image,this.drawVar,0,32,32,this.x,this.y,this.width,this.height)
        ctx.drawImage(this.image,this.drawVar,0,32,32,this.x,this.y,this.width,this.height)


    
    }
        

}
//sprites/frogRunLeft(32x32) copy.png, 
let butcher = new Players('frog',50,70,'./sprites/frogRunLeft(32x32).png')
let piglet = new Players('mask',5,10,'./sprites/maskRunRight(32x32).png')
const jumpVar = Math.round(cHeight/62)
function movement(){
        if(pressedKeys.ArrowUp&&butcher.jump.gravity==0 ){
        if((typeof(grid[butcher.x][butcher.y])!='string')&&typeof(grid[butcher.x][butcher.y+butcher.height])!='string'){
            butcher.jump.up +=jumpVar
        }
        }             
        if(pressedKeys.w&&piglet.jump.gravity==0){
        if((typeof(grid[piglet.x][piglet.y])!='string')&&typeof(grid[piglet.x][piglet.y+piglet.height])!='string'){
            piglet.jump.up += jumpVar                
        }
        }
            if(pressedKeys.ArrowLeft){
                if((typeof(grid[(butcher.x)-speed][butcher.y])!='string')&&(typeof(grid[(butcher.x)-speed][butcher.y+butcher.height])!='string')){

                    butcher.image.src = './sprites/frogRunLeft(32x32).png'
                    butcher.frameNum ==11 ? butcher.frameNum=0:butcher.frameNum++
                    console.log(butcher.image.src)
                    butcher.x -= speed
                }
            }
            if( pressedKeys.a){
                if((typeof(grid[(piglet.x)-speed][piglet.y])!='string')&&(typeof(grid[(piglet.x)-speed][piglet.y+piglet.height])!='string')){
                    //piglet.direction = 'left'

                    piglet.image.src = './sprites/maskRunLeft(32x32).png'
                    piglet.frameNum ==11 ? piglet.frameNum=0:piglet.frameNum++
                    piglet.x -= speed
                }
            }
            if(pressedKeys.ArrowRight){
                if((typeof(grid[(butcher.x+butcher.width)+speed][butcher.y])!='string')&&(typeof(grid[(butcher.x+butcher.width)+speed][butcher.y+butcher.height])!='string')){
                    //butcher.direction = 'right'
                    butcher.image.src = './sprites/frogRunRight(32x32).png'
                    butcher.frameNum ==11 ? butcher.frameNum=0:butcher.frameNum++
                    butcher.x +=speed
                }
            }
            if(pressedKeys.d){
                if((typeof(grid[(piglet.x+piglet.width)+speed][piglet.y])!='string')&&(typeof(grid[(piglet.x+piglet.width)+speed][piglet.y+piglet.height])!='string')){
                    //piglet.direction = 'right'
                    piglet.image.src = './sprites/maskRunRight(32x32).png'
                    piglet.frameNum ==11 ? piglet.frameNum=0:piglet.frameNum++
                    piglet.x += speed
                }                        
            }
        }
        function defaultSetting(){
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
             finishLine.end()
             finishLine2.end()
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
        //animate()
        function animate(){
            defaultSetting()
            butcher.gravityUpdate()
            piglet.gravityUpdate()
            //console.log(piglet.imageSrc)
            if(piglet.jump.gravity != 0 &&grid[piglet.x+piglet.width][piglet.y+piglet.height]=='taken'||grid[piglet.x][piglet.y+piglet.height+piglet.jump.gravity]=='taken'){
                piglet.jump.gravity =0
                piglet.jump.up =0
            }
            if(butcher.jump.gravity != 0 &&grid[butcher.x+butcher.width][butcher.y+butcher.height]=='taken'||grid[butcher.x][butcher.y+butcher.height+butcher.jump.gravity]=='taken'){
                butcher.jump.gravity =0
                butcher.jump.up =0
            }
            obstacleBump(piglet,butcher,finishLine)
            if(endGame==false){
                requestAnimationFrame(animate)
            }
            else if(endGame == true){
                endButton.style.display = "none"
                backToMenu.style.display ='inline-block'
                startButton.style.display = "inline-block"
            }
        }
            function obstacleBump(obj1,obj2,finishLine){
                 let tSide = obj1.y + obj1.height <= obj2.y
                let bSide = obj2.y + obj2.height <= obj1.y
                let rSide = obj1.x + obj1.width <= obj2.x 
                let lSide = obj2.x + obj2.width <= obj1.x
                if(bSide==false&&tSide==false&&lSide==false&&rSide==false){
                    butcher.wins++
                   endGame = true
                   message.style.display = "inline"
                   message.innerText = `The butcher is the Winner!!`
                }
                if(grid[obj1.x][obj1.y]==0){
                    piglet.wins++
                    message.style.display = "inline" 
                    message.innerText = `Piglet is the Winner!!`
                    endGame = true
                }
    }

    

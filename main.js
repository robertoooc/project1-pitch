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
console.log(cWidth, cHeight)
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
    animate()  
}


class Objects{
    constructor(x,y,width,height,color,direction){
        this.x =x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
        this.direction = direction
    }
    create(){
        for(let i = this.x; i <=this.x+this.width; i++){
            for(let j = this.y; j<=this.y+this.height; j++){
                grid[i][j]='taken'
            }
        }
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
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
                console.log('stop')
            }
            for(let i = this.x; i <=this.x+this.width; i++){
                for(let j = this.y; j<=this.y+this.height; j++){
                    grid[i-1][j]=1
                }
            }
            this.x++

        }
        console.log(this.direction)
        
        //this.x++
        this.create()
    }
    end(){
        for(let i = this.x; i <=this.x+this.width; i++){
            for(let j = this.y; j<=this.y+this.height; j++){
                grid[i][j]= 0
            }
        }
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    } 
}


// let block = new Objects(0,cHeight-20,cWidth,20,"orange")
// let block2 = new Objects(0,40,440,20,"black")
// let block3 = new Objects(0,120,440,20,"black")
// let block4 = new Objects(70,240,cWidth-70,20,"black")
// let block5 = new Objects(0,390,cWidth-70,20,"black")
// let block6 = new Objects(0,490,100,20,"black")
// let block7 = new Objects(190,490,160,20,"black")
// let block8 = new Objects(440,490,cWidth-440,20,"black")
// let block9 = new Objects(0,590,70,20,"black")
// let block10 = new Objects(130,590,370,20,"black")
// let block11 = new Objects(cWidth-70,590,70,20,"black")
// let obstacle1 =new Objects(156,210,30,30,"black")
// let obstacle2=new Objects(400,210,30,30,"black")
// let obstacle3=new Objects(490,460,30,30,"black")
// let obstacle4=new Objects(440,cHeight-50,30,30,"black")
//let block = new Objects(0,cHeight-20,cWidth,20,"orange")

//let block2 = new Objects(0,10,440,20,"black")
let userHeight = Math.round(cWidth/25)
let blockHeight = Math.round(cWidth/37)
let playerSize = Math.round(blockHeight*9/8)
let topWidth = Math.round(cWidth/3)
let topRowHeight = Math.round(cHeight/8)
let block3 = new Objects(0,topRowHeight,topWidth,blockHeight,"black") //90 
let block = new Objects(cWidth-(topWidth),topRowHeight,topWidth,blockHeight,"black") //90 
let block4 = new Objects(Math.round((cWidth/5)*2),topRowHeight*2+blockHeight,Math.round(cWidth/5),blockHeight,"yellow")
let block5 = new Objects(topWidth,(topRowHeight*2)+(blockHeight)*2,topWidth,blockHeight,"blue")
let block6 = new Objects((Math.round(topWidth*3/4)),(topRowHeight*2)+(blockHeight*3),Math.round(cWidth/2),blockHeight,"black")
let block7 = new Objects((Math.round(topWidth*2/4)),Math.round(cHeight/2),Math.round(cWidth*1/4),blockHeight,"pink")
let block12 = new Objects(Math.round(cWidth*3/5),Math.round(cHeight/2),Math.round(cWidth*1/4),blockHeight,"pink")
let block10 = new Objects(Math.round(cWidth*3/5),Math.round(cHeight* 7/10)+blockHeight,Math.round((cWidth/5)*2),blockHeight,"orange")
let block11 = new Objects(0,Math.round(cHeight* 7/10)+blockHeight,Math.round((cWidth/5)*2),blockHeight,"green")
let block9 = new Objects(cWidth-Math.round(topWidth*3/4),Math.round(cHeight* 7/10),Math.round(topWidth*3/4),blockHeight,"hotpink")
let block8 = new Objects(0,Math.round(cHeight* 7/10),Math.round(topWidth*3/4),blockHeight,"black")
let obstacle3=new Objects(Math.round(topWidth*2/5),Math.round(cHeight* 7/10)-blockHeight,blockHeight,blockHeight,"black")
let obstacle4=new Objects(cWidth-Math.round(topWidth*2/5),Math.round(cHeight* 7/10)-blockHeight,blockHeight,blockHeight,"black")

 let finishLine2 = new Objects(cWidth-(blockHeight*2),cHeight-50,blockHeight*2,blockHeight*2,"blue" )
 let finishLine = new Objects(0,cHeight-50,blockHeight*2,blockHeight*2,"blue" )
 let obstacle1 =new Objects(Math.round(topWidth*3/5),topRowHeight-blockHeight,blockHeight,blockHeight,"black")
 let obstacle2=new Objects(cWidth-Math.round(topWidth*3/5),topRowHeight-blockHeight,blockHeight,blockHeight,"black")
 let obstacle6 = new Objects(Math.round(cWidth*3/5)-(blockHeight*2),Math.round(cHeight/2),blockHeight,blockHeight,"red", 'left')
 let obstacle5 = new Objects((Math.round(topWidth*2/4))+Math.round(cWidth*1/4)+blockHeight,Math.round(cHeight/2),blockHeight,blockHeight,"purple",'right')
 const speed = Math.round(cWidth/48)
 console.log(playerSize)
 const downAccelerate = 1

class Players{
    static numGames = 0
    constructor(x,y,color){
        this.wins = 0
        this.x = x
        this.y = y
        this.jump = {
            up: 0,
            gravity: 0
        }
        this.width = blockHeight
        this.height = blockHeight      
        this.color = color
        
    }
    create(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)         
    }           
    gravityUpdate(){            
        //p.innerText = `${cHeight}, ${this.y+this.height}`
        this.y+=this.jump.gravity
        if(grid[this.x][this.y]!='taken'){
            this.y-=this.jump.up
        }
        if((this.y + this.height + this.jump.gravity < cHeight)){
            this.jump.gravity+=downAccelerate
            this.count++             
        }
        else{
            this.jump.gravity = 0
            this.jump.up = 0
            this.count =0
        }
        this.create()
    }
}
let butcher = new Players(50,70,'red')
let piglet = new Players(5,10,'pink')
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
                    butcher.x -= speed
                }
            }
            if( pressedKeys.a){
                if((typeof(grid[(piglet.x)-speed][piglet.y])!='string')&&(typeof(grid[(piglet.x)-speed][piglet.y+piglet.height])!='string')){
                    piglet.x -= speed
                }
            }
            if(pressedKeys.ArrowRight){
                if((typeof(grid[(butcher.x+butcher.width)+speed][butcher.y])!='string')&&(typeof(grid[(butcher.x+butcher.width)+speed][butcher.y+butcher.height])!='string')){
                    butcher.x +=speed
                }
            }
            if(pressedKeys.d){
                if((typeof(grid[(piglet.x+piglet.width)+speed][piglet.y])!='string')&&(typeof(grid[(piglet.x+piglet.width)+speed][piglet.y+piglet.height])!='string')){
                    piglet.x += speed
                }                        
            }
        }
        function defaultSetting(){
            ctx.fillStyle = "aquamarine"
            ctx.fillRect(0,0,cWidth,cHeight)
            block.create()
            //block2.create()
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

    

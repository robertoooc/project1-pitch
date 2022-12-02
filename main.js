//grabbing canvas
const canvas = document.getElementById('canvas')
//assigning canvas' resolution relative to the window
canvas.setAttribute('height',getComputedStyle(canvas)['height'])
canvas.setAttribute('width',getComputedStyle(canvas)['width'])

//getting rendering context from the Canvas
const ctx = canvas.getContext('2d')

class Objects{
    constructor(x,y,width,height,color){
        this.x =x
        this.y = y
        this.width = width
        this.height = height
        this.color = color
    }
    create(){
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    } 
    update(){

    }
}

let leftWall = new Objects(0,0,1,canvas.height,"orange")
let topWall = new Objects(0,0,canvas.width,1,"orange")
let rightWall = new Objects(canvas.width -1,0,1,canvas.height,"orange")
let bottomWall = new Objects(0,canvas.height-1,canvas.width,1,"orange")
// let obstacle = new Objects(300,54,50,50,"black")
// obstacle.create()
// let line = new Objects()
let access = true
const downAccelerate = 0.5

//made a class that will help out with player movement
class Players{
    constructor(x,y,color){
        this.name
        this.x = x
        this.y = y
        this.access
        this.jump = {
            up: 10,
            gravity: 7
        }
        this.width = (canvas.height)/21
        this.height = (canvas.width)/30
        this.color = color
    }
        create(){
            ctx.fillStyle=this.color
            ctx.fillRect(this.x,this.y,this.width,this.height)
        }
        gravityUpdate(){
            this.create()
            this.y+=this.jump.gravity


            if(access ==false){
                this.jump.gravity = 0
            }
            this.jump.y+=downAccelerate
        }
            
        }
        
        let butcher = new Players(5,10,'red')
        butcher.create()
        let piglet = new Players(40,90,'pink')
        piglet.create()
        
        
        let pressedKeys ={}
        
        
        
        const speed = 2;
        function movement(){
            if(pressedKeys.ArrowDown){
                butcher.y += speed  
            }
            if(pressedKeys.ArrowUp){
        butcher.y -= speed
    }
    if(pressedKeys.ArrowLeft){
        butcher.x -=speed
    }
    if(pressedKeys.ArrowRight){
        butcher.x +=speed
    }
    if( access==true && pressedKeys.s){
        piglet.y += speed  
    }
    if( access==true &&pressedKeys.w){
        piglet.y -= speed  
        
    }
    if( access==true &&pressedKeys.a){
        piglet.x -= speed  
    }
    if( access==true &&pressedKeys.d){
        piglet.x += speed  
    }
    
    access = true
}

document.addEventListener('keydown', function(e){
    pressedKeys[e.key] = true
    movement()
    
})
document.addEventListener('keyup', function(e){
    pressedKeys[e.key] = false
    movement()
})
function defaultSetting(){
    ctx.fillStyle = "aquamarine"
        ctx.fillRect(0,0,canvas.width,canvas.height)
        leftWall.create()
        topWall.create()
        rightWall.create()
        bottomWall.create()
        // obstacle.create()
    }
    function game(){
        defaultSetting()
        butcher.gravityUpdate()
        piglet.gravityUpdate()
        console.log(access)
        
        obstacleBump(piglet,bottomWall)
        //obstacleBump(butcher,bottomWall)
        
    }
    // function onTop(obj1,obj2){

    // }
    function obstacleBump(obj1,obj2){
        const bSide = obj2.y + obj2.height <= obj1.y
        const lSide = obj2.x + obj2.width <= obj1.x
        const rSide = obj1.x + obj1.width <= obj2.x 
        const tSide = obj1.y + obj1.height <= obj2.y
        //console.log(obj1.y + obj1.height<= obj2.y)
        if(bSide==false&&tSide==false&&lSide==false&&rSide==false){
           access = false
           //console.log('game should end now')
        }
        else{
           access = true
        }
    
    }
    
    const refresh = setInterval( function(){
        if(access==true){
            game()
        }
    } , 80)
    
    
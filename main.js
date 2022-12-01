//grabbing canvas
const canvas = document.getElementById('canvas')
//assigning canvas' resolution relative to the window
canvas.setAttribute('height',getComputedStyle(canvas)['height'])
canvas.setAttribute('width',getComputedStyle(canvas)['width'])

//getting rendering context from the Canvas
const ctx = canvas.getContext('2d')

//made a class that will help out with player movement
class Players{
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

}


let piglet = new Players(5,10,45,45,'pink')
piglet.create()
let butcher = new Players(5,100,45,45,'red')
butcher.create()
let pressedKeys ={}

const speed = 5;
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
    if(pressedKeys.s){
        piglet.y += speed  
    }
    if(pressedKeys.w){
        piglet.y -= speed  
    }
    if(pressedKeys.a){
        piglet.x -= speed  
    }
    if(pressedKeys.d){
        piglet.x += speed  
    }
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
        let leftWall = new Players(0,0,2,canvas.height,"orange")
        leftWall.create()
        let topWall = new Players(0,0,canvas.width,2,"orange")
        topWall.create()
        let rightWall = new Players(canvas.width -2,0,2,canvas.height,"orange")
        rightWall.create()
        let bottomWall = new Players(0,canvas.height-2,canvas.width,2,"orange")
        bottomWall.create()
    }
    function game(){
        defaultSetting()
        piglet.create()
        butcher.create()
    }
    const refresh = setInterval(game, 50)


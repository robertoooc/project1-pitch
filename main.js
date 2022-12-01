//grabbing canvas
const canvas = document.getElementById('canvas')
//assigning canvas' resolution relative to the window
canvas.setAttribute('height',getComputedStyle(canvas)['height'])
canvas.setAttribute('width',getComputedStyle(canvas)['width'])

//getting rendering context from the Canvas
const ctx = canvas.getContext('2d')
//creating pink little sqaure as a test subject for movement
// ctx.fillStyle='pink'
// ctx.fillRect(5,10,45,45)
// ctx.fillStyle='red'
// ctx.fillRect(5,100,45,45)

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
const speed = 1
function movement(){
    console.log('inside movement')
    if(pressedKeys.ArrowDown){
    butcher.y += speed 
    console.log(butcher.y)   
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
let testGameFunc = setInterval( function(){
    ctx.clearRect(0,0,canvas.width,canvas.height)
    document.addEventListener('keydown', function(e){
        console.log(e.key)
        pressedKeys[e.key] = true
        movement()
    
    })
    document.addEventListener('keyup', function(e){
        pressedKeys[e.key] = false
        movement()
    })
butcher.create()
piglet.create()
},10)
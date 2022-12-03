//grabbing canvas
const canvas = document.getElementById('canvas')
let p = document.querySelector('p')

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
canvas.setAttribute('height',cHeight.toString())
canvas.setAttribute('width',cWidth.toString())

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

let leftWall = new Objects(0,0,5,canvas.height,"orange")
let topWall = new Objects(0,0,canvas.width,5,"orange")
let rightWall = new Objects(canvas.width -5,0,5,canvas.height,"orange")
let bottomWall = new Objects(0,canvas.height-5,canvas.width,5,"orange")




// let obstacle = new Objects(300,54,50,50,"black")
// obstacle.create()
// let line = new Objects()
let access = true
const speed = 5;
const downAccelerate = .5

//made a class that will help out with player movement
class Players{
    constructor(x,y,color){
        this.name
        this.x = x
        this.y = y
        this.access
        this.jump = {
            up: 0,
            gravity: 0
        }
        this.width = 30//parseInt((canvas.height)/20)
        this.height = 30//parseInt((canvas.width)/20)
       
        this.color = color
    }
        create(){
            ctx.fillStyle=this.color
            ctx.fillRect(this.x,this.y,this.width,this.height)
        }
        gravityUpdate(){
            p.innerText = `${cHeight}, ${this.y+this.height}`
            this.create()
            this.y+=this.jump.gravity
            if(this.y + this.height + this.jump.gravity < cHeight){
                this.jump.gravity+=downAccelerate
                
            }
            else{
                //this.y = (cHeight- this.height)
                this.jump.gravity = 0
            }
        
        
        }
        shiftLeft(){
            // this.x -speed
            // console.log(speed)
            this.gravityUpdate()
        }
            
        }
        
        let butcher = new Players(5,10,'red')
        //butcher.create()
        let piglet = new Players(60,10,'pink')
        //piglet.create()
        animate()
        
        let pressedKeys ={}
        
        
        
        function movement(){

            if(pressedKeys.ArrowUp){
                butcher.y -= speed
                //console.log(butcher.x,butcher.y)
            }
            if(pressedKeys.ArrowLeft){
                //butcher.shiftLeft()
                 butcher.x -=speed
                 //console.log(butcher.x,butcher.y)
            }
            if(pressedKeys.ArrowRight){
                butcher.x +=speed
                //console.log(butcher.x,butcher.y)
            }
            if( pressedKeys.a){
                 piglet.x -= speed
                 //console.log(piglet.x,piglet.y)  
                //piglet.shiftLeft()
            }
            if(pressedKeys.w){
                piglet.y -= speed
                //console.log(piglet.x,piglet.y)                  
            }
            if(pressedKeys.d){
                piglet.x+=speed
                //console.log(piglet.x,piglet.y)                                
            }
    
    access = true
}
        function defaultSetting(){
            ctx.fillStyle = "aquamarine"
            ctx.fillRect(0,0,cWidth,cHeight)
        }
        
        function animate(){
            defaultSetting()
            butcher.gravityUpdate()
            piglet.gravityUpdate()
            //console.log(piglet.y)
            requestAnimationFrame(animate)
        }

        document.addEventListener('keydown', function(e){
            pressedKeys[e.key] = true
            movement()       
            console.log('left')
        })
        document.addEventListener('keyup', function(e){
            pressedKeys[e.key] = false
            movement()
            console.log('ok')
        }) 
        // function defaultSetting(){
//     ctx.fillStyle = "aquamarine"
//     ctx.fillRect(0,0,cWidth,cHeight)
//     leftWall.create()
//     topWall.create()
//     rightWall.create()
//     bottomWall.create()
//     // obstacle.create()
// }
// function game(){
//     defaultSetting()
//     butcher.gravityUpdate()
//     piglet.gravityUpdate()
//     document.addEventListener('keydown', function(e){
//         pressedKeys[e.key] = true
//         movement()
        
//     })
//     document.addEventListener('keyup', function(e){
//         pressedKeys[e.key] = false
//         movement()
//     })
        
//         //obstacleBump(piglet,bottomWall)
//         //obstacleBump(butcher,bottomWall)
        
//     }
    // function onTop(obj1){
    //     const tSide = obj1.y + obj1.height <= canvas.height
    // }
    function obstacleBump(obj1,obj2){
        const bSide = obj2.y + obj2.height <= obj1.y
        const lSide = obj2.x + obj2.width <= obj1.x
        const rSide = obj1.x + obj1.width <= obj2.x 
        const tSide = obj1.y + obj1.height <= obj2.y
        //console.log(obj1.y + obj1.height<= obj2.y)
        if(bSide==false&&tSide==false&&lSide==false&&rSide==false){
           access = false
        }
        else{
           access = true
        }
    
    }
    
    //const refresh = setInterval(game, 10)
    
    







// let p = document.querySelector('p')
// const canvas = document.querySelector('canvas')
// const ctx = canvas.getContext('2d')
// let cWidth = parseInt(window.getComputedStyle(canvas)['width'])
// let cHeight = parseInt(window.getComputedStyle(canvas)['height'])
// let checkheight = false
// let checkwidth = false
// let check =false
// while(check==false){
//  cWidth % 10!==0 ? cWidth++ : checkwidth = true
//  cHeight % 10!==0 ? cHeight++ : checkheight = true
//  checkwidth&&checkheight ? check=true : check =false
// }
// canvas.setAttribute('height',cHeight.toString())
// canvas.setAttribute('width',cWidth.toString())

// // canvas.height = window.innerHeight
// // canvas.width= window.innerWidth
// // console.log(canvas.height)

// let access = true


// const downAccelerate = 1

// class Players{
//     constructor(color){
//         this.name
//         this.coordinates= {
//             x: 0,
//             y:0
//         }
//         // this.x = 0
//         // this.y = 0
//         this.access
//         this.jump = {
//             up: 0,
//             gravity: 0
//         }
//         this.width = 10
//         this.height = 10
//         this.color = color
//     }
//     create(){
//         ctx.fillStyle=this.color
//         ctx.fillRect(this.coordinates.x,this.coordinates.y,this.width,this.height)
//     }
//     gravityUpdate(){
//         p.innerText = `${cHeight}, ${this.coordinates.y+this.height}`
//         this.create()
//         this.coordinates.y+=this.jump.gravity
        
//         if(this.coordinates.y + this.height <= cHeight){
//             this.jump.gravity+=downAccelerate               
//         }
//         else{
//             //this.coordinates.y = cHeight-this.height
//             this.jump.gravity = 0
//             console.log(this.coordinates.y + this.height)
//         }
//     }          
// }
// let piglet = new Players('pink')
// animate()


//         let pressedKeys ={}
        
        
//         function defaultSetting(){
//             ctx.fillStyle = "aquamarine"
//             ctx.fillRect(0,0,cWidth,cHeight)
//         }
        
//         function animate(){
//             defaultSetting()
//             piglet.gravityUpdate()
//             //console.log(piglet.y)
//             document.addEventListener('keydown', function(e){
//                 pressedKeys[e.key] = true
//                 movement()       
//             })
//             document.addEventListener('keyup', function(e){
//                 pressedKeys[e.key] = false
//                 movement()
//             }) 
//             requestAnimationFrame(animate)
//         }
        
//         const speed = 5;
//         function movement(){
//             if(pressedKeys.ArrowUp){
//                 butcher.jump.up -= speed
//             }
//             if(pressedKeys.ArrowLeft){
//                 butcher.coordinates.x -=speed
//             }
//             if(pressedKeys.ArrowRight){
//                 butcher.coordinates.x +=speed
//             }
//             if( pressedKeys.a){
//                 piglet.coordinates.y += speed 
//                  console.log(piglet.coordinates.y)
//             }
//             if(pressedKeys.w){
//                 piglet.jump.up -= speed                  
//             }
//             if(pressedKeys.d){
//                 piglet.coordinates.x+=speed                
//             }   
//     // access = true
// }


// // function game(){d
// //     // defaultSetting()
// //     piglet.gravityUpdate()
// //     document.addEventListener('keydown', function(e){
// //         pressedKeys[e.key] = true
// //         movement()       
// //     })
// //     document.addEventListener('keyup', function(e){
// //         pressedKeys[e.key] = false
// //         movement()
// //     })        
// //     }



//     // function obstacleBump(obj1,obj2){
//     //     const bSide = obj2.y + obj2.height <= obj1.y
//     //     const lSide = obj2.x + obj2.width <= obj1.x
//     //     const rSide = obj1.x + obj1.width <= obj2.x 
//     //     const tSide = obj1.y + obj1.height <= obj2.y
//     //     if(bSide==false&&tSide==false&&lSide==false&&rSide==false){
//     //        access = false
//     //     }
//     //     else{
//     //        access = true
//     //     }   
//     // }
    
    












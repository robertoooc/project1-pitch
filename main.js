let pressedKeys ={}
//grabbing canvas
const canvas = document.getElementById('canvas')
let p = document.querySelector('p')

let cWidth = parseInt(window.getComputedStyle(canvas)['width'])
let cHeight = parseInt(window.getComputedStyle(canvas)['height'])
let access1, access2
let fall = true
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


let grid = []
for(let i = 0; i <=cWidth; i++){
    grid[i] = []
    for(let j = 0; j<=cHeight; j++){
        grid[i][j] = 1
    }
}
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
        for(let i = this.x; i <=this.x+this.width; i++){
            for(let j = this.y; j<=this.y+this.height; j++){
                grid[i][j]='taken'
                //console.log(grid[i][j])
            }
        }
        ctx.fillStyle=this.color
        ctx.fillRect(this.x,this.y,this.width,this.height)
    } 
}

//let leftWall = new Objects(0,0,5,canvas.height,"orange")
//let topWall = new Objects(0,0,canvas.width,5,"orange")
//let rightWall = new Objects(canvas.width -5,0,5,canvas.height,"orange")
//let bottomWall = new Objects(0,canvas.height-5,canvas.width,5,"orange")

let block = new Objects(10,cHeight-70,cWidth-100,20,"orange")
let block2 = new Objects(10,90,300,10,"black")
let block3 = new Objects(250,140,200,10,"black")
let block4 = new Objects(10,190,400,10,"black")
let block5 = new Objects(400,290,100,10,"black")

// let obstacle = new Objects(300,54,50,50,"black")
// obstacle.create()
// let line = new Objects()
let access 
const speed = 10;
//const jump = 200
const downAccelerate = 1

//made a class that will help out with player movement
class Players{
    //static gravityCount = 0
    constructor(x,y,color){
        this.name
        this.x = x
        this.y = y
        this.count=0
        this.falling = false
        this.jump = {
            up: 0,
            gravity: 0
        }
        this.width = 30//parseInt((canvas.height)/20)
        this.height = 30//parseInt((canvas.width)/20)
       
        this.color = color
        
    }
    create(){
            //obstacleBump(this.x,this.y,this.width,this.height,block.x,block.y,block.width,block.height)
            ctx.fillStyle=this.color
                ctx.fillRect(this.x,this.y,this.width,this.height)         
            }
            check(){        
                if(typeof(grid[this.x][this.y+this.height])=='string'){
                    console.log('no go')
                }
            }            
        gravityUpdate(){            
            p.innerText = `${cHeight}, ${this.y+this.height}`
            // if(typeof(grid[this.x][this.y+this.height+this.jump.gravity])=='string'){
                //     //this.y
                // }
                // else{
                    //     fall = false
            // }
            this.y+=this.jump.gravity
            this.y-=this.jump.up
            if((this.y + this.height + this.jump.gravity < cHeight)){
                this.jump.gravity+=downAccelerate
                this.count++             
                //console.log(this.count,this.y+this.height, block2.y, block3.y)
            }
            else{
                this.jump.gravity = 0
                this.jump.up = 0
                this.count =0
            }
            this.create()
            //if(fall ==true){
                //console.log(grid[this.x][this.y+this.jump.gravity+this.jump.gravity], this.y+this.jump.gravity, block2.y,block.y, this.jump.gravity)
                //console.log(grid[this.x+this.width][this.y+this.height])
                //this.check()                        
                // if((typeof(grid[this.x][this.y])=='string')||(typeof(grid[this.x+this.width][this.y+this.jump.up])=='string')){
                //     console.log(grid[this.x][this.y])                      
                //     if((typeof(grid[this.x][(this.y)])!='string')){
                //         console.log(this.y+this.height,this.color, block.y)
                //        this.jump.gravity=0
                //        this.jump.up = 0
                //     }
                // }  
    













            // if((this.y + this.height + this.jump.gravity < cHeight)&&((this.y+this.height+this.jump.gravity < block.y)&&access1 != false)){
                
            //     this.jump.gravity+=downAccelerate             
            // }
            // if(access1!=false){
                //    // console.log(access1)
                // }
                // if((this.y + this.height + this.jump.gravity < cHeight)&&((this.y+this.height+this.jump.gravity < block.y)&&this.x+this.width < block.x)){
                    
                    //     this.jump.gravity+=downAccelerate             
                    // }
        }
        }
        
        let butcher = new Players(5,10,'red')
        //butcher.create()
        let piglet = new Players(60,10,'pink')
        //console.log(cWidth)
        //piglet.create()
        animate()
        
        
        
        
        function movement(){
            
            // if(pressedKeys.ArrowUp&&butcher.jump.gravity==0 && access==true ){
            //     butcher.jump.up +=speed
            //     //console.log(butcher.x,butcher.y)
            // }else{
            //     //consoe
            // }  
            // if(pressedKeys.ArrowLeft && access==true ){
            //     //butcher.shiftLeft()
            //     butcher.x -= speed
            //     //console.log(butcher.x,butcher.y)
            // }else if(pressedKeys.ArrowLeft && access!=true ){
            //     butcher.x += speed
            // }
            // if(pressedKeys.ArrowRight && access==true ){
            //     butcher.x +=speed
            //     //console.log(butcher.x,butcher.y)
            // }else if(pressedKeys.ArrowRight && access!=true ){
            //     butcher.x -=speed
            // }
            // if( pressedKeys.a && access==true ){
            //     piglet.x -= speed
            //     //console.log(piglet.x,piglet.y)  
            //     //piglet.shiftLeft()
            // }else if( pressedKeys.a && access!=true ){
            //     piglet.x += speed
            // }
            // if(pressedKeys.w&&piglet.jump.gravity==0 && access==true ){
            //     piglet.jump.up += speed
            //     //wconsole.log(piglet.x,piglet.y)                  
            // }else if(pressedKeys.w&&piglet.jump.gravity==0 && access!=true ){
            //     //piglet.jump.up += speed
            // }
            // if(pressedKeys.d && access==true ){
            //     piglet.x+=speed
            //     //console.log(piglet.x,piglet.y)                                
            // }else if(pressedKeys.d && access!=true ){
            //     piglet.x-=speed
            // }
            
            
            
            

            
            
            
            
            
            
            
            
            
            
            
            
            
            
            const jumpVar = 15;
    
            if(pressedKeys.ArrowUp&&butcher.jump.gravity==0 ){
                if((typeof(grid[butcher.x][butcher.y])!='string')&&typeof(grid[butcher.x][butcher.y+butcher.height-speed])!='string'){
                    butcher.jump.up +=jumpVar
                }
            }             
            if(pressedKeys.ArrowLeft){
                if((typeof(grid[(butcher.x)-speed][butcher.y])!='string')&&(typeof(grid[(butcher.x)-speed][butcher.y+butcher.height])!='string')){
                    butcher.x -= speed
                }
            }
            if(pressedKeys.ArrowRight){
                if((typeof(grid[(butcher.x+butcher.width)+speed][butcher.y])!='string')&&(typeof(grid[(butcher.x+butcher.width)+speed][butcher.y+butcher.height])!='string')){
                    butcher.x +=speed
                }
            }
            if( pressedKeys.a){
                if((typeof(grid[(piglet.x)-speed][piglet.y])!='string')&&(typeof(grid[(piglet.x)-speed][piglet.y+piglet.height])!='string')){
                    piglet.x -= speed
                }
            }
            if(pressedKeys.w&&piglet.jump.gravity==0){
                if((typeof(grid[piglet.x][piglet.y+speed])!='string')&&(typeof(grid[piglet.x][piglet.y+piglet.height-speed])!='string')){
                    piglet.jump.up += jumpVar                
                }
            }
            if(pressedKeys.d){
                if((typeof(grid[(piglet.x+piglet.width)+speed][piglet.y])!='string')&&(typeof(grid[(piglet.x+piglet.width)+speed][piglet.y+piglet.height])!='string')){
                    piglet.x += speed
                }                        
            }
            //access = true
        }
        function defaultSetting(){
            ctx.fillStyle = "aquamarine"
            ctx.fillRect(0,0,cWidth,cHeight)
            block.create()
            block2.create()
            block3.create()
            block4.create()
            block5.create()
        }
        
        document.addEventListener('keydown', function(e){
            pressedKeys[e.key] = true
            //animate()
            movement()
            //piglet.create()       
            
        })
        document.addEventListener('keyup', function(e){
            pressedKeys[e.key] = false
            //animate()
            movement()
            //piglet.create()
            
        }) 
        
        function animate(){
            defaultSetting()
            //movement()
            butcher.gravityUpdate()
            piglet.gravityUpdate()
            if(grid[piglet.x][piglet.y+piglet.height]=='taken'||grid[piglet.x][piglet.y+piglet.height+piglet.jump.gravity]=='taken'){
                piglet.jump.gravity =0
                piglet.jump.up =0
            }





            //obstacleBump(piglet,block)
            
            requestAnimationFrame(animate)
        }
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
            //     const tSide = obj1.y + obj1.height <=anv cas.height
            // }
            function obstacleBump(obj1,obj2){
                let subx = obj1.x+obj1.width
                let suby = obj1.y+obj1.height
                let sub2x = obj2.x+obj2.width
                let sub2y = obj2.y+obj2.height
                let obsx =[]
                let obsy =[]
                for(let i = obj2.x;i <=sub2x ;i++){
                    obsx.push(i)
                }
        for(let i = obj2.y;i <=sub2y ;i++){
            obsy.push(i)
        }
        access1 = true
        access2 = true
        let processed = false
        while(processed !== true){
            let w = 0
            while(w<obsy.length){  
                
                
                ((obj1.y == obsy[w])||(suby ==obsy[w]))||((obj1.y == obsy[w])&&(suby ==obsy[w])) ? access2 =false: access2=true              
                w++
            }
            let q = 0
            while(q<obsx.length-1){       
                ((obj1.x == obsx[q])||(subx ==obsx[q]))||((obj1.x == obsx[q])&&(subx ==obsx[q])) ? access1 = true: access1 =false         
                //console.log(access1)
                q++
            }
            access1==false&&access2==false ? access = false: access = true
            processed = true
            //console.log(access1,access2,access)
        }
        // if(((obj1.x == obsx[i])||(subx ==obsx[i]))||((obj1.x == obsx[i])&&(subx ==obsx[i]))){
            //     //console.log("access denied")
            // }

        //}
        // for(let i in obsy){
        //     if(((obj1.y == obsy[i])||(suby ==obsy[i]))||((obj1.y == obsy[i])&&(suby ==obsy[i]))){
        //         //console.log("access denied")
        //     }
        // }
        //console.log(subx>=obj2.x) as soon as piglet touches obstacle right its true
        //console.log(sub2x<=obj1.x) //as soon as piglet touches obstacle left its true
    //console.log((subx>=obj2.x)&&(sub2x<=obj1.x))
    // if(sub2x<=obj1.x){
    //     console.log('piglet touched obstacles right')
    // }
    // if(subx>=obj2.x){
    //     console.log('piglet touched obstacles left')
    // }
        // let tSide = obj1.y + obj1.height <= obj2.y
        // let bSide = obj2.y + obj2.height <= obj1.y
        // let rSide = obj1.x + obj1.width <= obj2.x 
        // let lSide = obj2.x + obj2.width <= obj1.x
        // // console.log(bSide, "underneath")
        // // console.log(lSide, "left")
        // // console.log(rSide, "right")
        // // console.log(tSide, "top")
        // //console.log(obj1.y + obj1.height<= obj2.y)
        // if(bSide==false&&tSide==false&&lSide==false&&rSide==false){
        //    access = false
        //    //console.log('nono')
        // }
        // else{
        //    access = true
        //}
    
    }
    

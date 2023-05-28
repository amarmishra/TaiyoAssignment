export class PlaceHolderAnimation{
   
   
    constructor(input,placeholder,delay=20){
        this.input=input                        //refence to useRef Dom
        this.placeholder=placeholder
        this.delay=delay
        this.animationId=null
        // this.start=this.start.bind(this)
        // this.stop=this.stop.bind(this)
    }
    
    start=()=>{
        this.input.placeholder=""
        this.animationId=requestAnimationFrame(()=>{this.animatePlaceholder(this.input,this.placeholder,0)})
    } 
    
    // stop=()=>{
    //     this.input.placeholder=""
    //     cancelAnimationFrame(this.animationId);
        
    // }
   
    
    /**animation function below*/
    
   animatePlaceholder=(input,placeholder,currentIndex)=>{
        
      

            if(currentIndex>placeholder.length){
                this.input.placeholder=""
                // currentIndex=0
                //start new animation
                this.animationId=requestAnimationFrame(()=>{this.animatePlaceholder(input,placeholder,0)})
            
            }else{
                setTimeout(()=>{
                    this.input.placeholder+=placeholder.charAt(currentIndex);
                    this.animationId=requestAnimationFrame(()=>{this.animatePlaceholder(input,placeholder,currentIndex+1)})
                },this.delay*(currentIndex))
                
            }   

      
    }

   
    

    
}
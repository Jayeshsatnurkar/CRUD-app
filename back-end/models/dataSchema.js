
import mongoose,{model} from "mongoose";

let dataSchema = mongoose.Schema({
    name:String,
    phone:String,
    email:String,
    city:String,
    pincode:Number,
    age:Number,
    address:String,
    dob:String,
    timeStamp:String
})


dataSchema.pre("save",function(){

     this.timeStamp =`${new Date().toLocaleDateString()} || ${new Date().toLocaleTimeString()}`
    console.log("callbefore saving the data")
})

let Datamodel =new model("datas",dataSchema)

export {Datamodel}

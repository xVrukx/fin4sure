import mongoose from "moongoose";

const brokerschema = new Schema (
    {
        name : {type : String, required : true},
        email : {type : String, required : true},
        number : {type : String, required : true},
        clients : []
    },
    {
        timestamps : true
    }
);

export default mongoose.model("broker", brokerschema);
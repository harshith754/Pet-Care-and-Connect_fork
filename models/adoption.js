import  { Schema,model,models } from "mongoose"

const AdoptionSchema = new Schema({

  user: {
    type: Schema.Types.ObjectId,
    ref:'User',
  },
  email:{
    type:String,
    required: [true, 'Email is required!'],
  },
  name: {
    type:String,
    required: [true, 'Name is required!'],
  },
  pet: {
    type: Schema.Types.ObjectId,
    ref:'Pet',
  },
  address:{
    type:String,
    required: [true, 'Address is required!']
  },
  phoneNumber:{
    type:String,
    required:[true, "Phone number is required!"]
  },
  comments:{
    type:String,
    required:[true, "Comments is required!"]
  },
  petCreator:{
    type: Schema.Types.ObjectId,
    ref:'User',
  },
  status:{
    type:String,
    required:[false],
  },
  isRejected:{
    type:Boolean,
    required:[false],
  }

})

const Adoption = models.Adoption || model("Adoption" , AdoptionSchema )


export default Adoption;
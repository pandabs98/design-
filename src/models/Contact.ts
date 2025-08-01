import mongoose,{model, models, Document} from "mongoose";

export interface IContact extends Document{
    name: string,
    email: string,
    message: string,
    createdAt?: Date,
    updatedAt?: Date
}

const contactSchema = new mongoose.Schema<IContact>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email:{
        type: String,
        required: true,
        trim: true
    },
    message: {
        type: String,
        required: true
    }
},{timestamps: true})

const Contact = models?.Contact || model<IContact>("Contact", contactSchema)
export default Contact
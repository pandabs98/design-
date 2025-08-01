import mongoose,{model, models} from "mongoose";



export interface IForum extends mongoose.Document {
  title: string;
  description: string;
  image: string;
  techStack: [""];
  createdAt: Date;
  updatedAt: Date;
}


const forumSchema = new mongoose.Schema<IForum>({
    title:{
        type: String,
        required: [true,"please enter title"],
        unique: true,
        trim: true
    },
    description:{
        type:String,
        required: [true,"Please enter your description"]
    },
    image:{
        type: String,
        required: true
    },
    techStack:{
        type: [String],
        required: true
    }
}, {timestamps:true})


const Forum = models?.Forum || model<IForum>("Forum", forumSchema)
export default Forum;

import {
  getModelForClass,
  modelOptions,
  pre,
  prop,
  Ref
} from '@typegoose/typegoose'
import bcrypt from 'bcrypt'
import { Restaurant } from '../Restaurant/index.js'

@modelOptions({
  schemaOptions: {
    timestamps: true,
    versionKey: false,
    toJSON: {
      transform: (_, returnedObject) => {
        returnedObject.id = returnedObject._id
        delete returnedObject._id
      }
    }
  }
})
@pre<User>('save', async function () {
  this.password = await bcrypt.hash(this.password, 10)
})
export class User {
  @prop({ required: true, trim: true, unique: true })
  username: string

  @prop({ required: true, minlength: 6, trim: true })
  password: string

  @prop({ ref: () => Restaurant, default: [] })
  favourites: Ref<Restaurant>[]
}

const UserModel = getModelForClass(User)
export default UserModel

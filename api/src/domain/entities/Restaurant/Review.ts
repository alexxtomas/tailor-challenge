import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class Review {
  @prop({ required: true, trim: true })
  name: string

  @prop({ required: true, trim: true })
  date: string

  @prop({ required: true })
  rating: number

  @prop({ required: true, trim: true })
  comments: string
}

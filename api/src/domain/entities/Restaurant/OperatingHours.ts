import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class OperatingHours {
  @prop({ required: true, trim: true })
  Monday: string

  @prop({ required: true, trim: true })
  Tuesday: string

  @prop({ required: true, trim: true })
  Wednesday: string

  @prop({ required: true, trim: true })
  Thursday: string

  @prop({ required: true, trim: true })
  Friday: string

  @prop({ required: true, trim: true })
  Saturday: string

  @prop({ required: true, trim: true })
  Sunday: string
}

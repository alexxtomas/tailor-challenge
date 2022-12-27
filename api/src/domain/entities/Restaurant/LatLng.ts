import { modelOptions, prop } from '@typegoose/typegoose'

@modelOptions({
  schemaOptions: {
    _id: false
  }
})
export class Latlng {
  @prop({ required: true })
  lat: number

  @prop({ required: true })
  lng: number
}

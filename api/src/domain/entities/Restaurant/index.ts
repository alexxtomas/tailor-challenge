import { getModelForClass, modelOptions, prop } from '@typegoose/typegoose'
import { Latlng } from './LatLng.js'
import { OperatingHours } from './OperatingHours.js'
import { Review } from './Review.js'
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
export class Restaurant {
  @prop({ required: true, trim: true, unique: true })
  name: string

  @prop({ required: true, trim: true })
  neighborhood: string

  @prop({ required: true, trim: true, unique: true })
  address: string

  @prop({ type: () => Latlng })
  latlng: Latlng

  @prop({ required: true, lowercase: true, trim: true })
  image: string

  @prop({ required: true, trim: true })
  cuisine_type: string

  @prop({ type: () => OperatingHours, required: true })
  operating_hours: OperatingHours

  @prop({ type: () => Review, default: [] })
  reviews: Review[]
}

const RestaurantModel = getModelForClass(Restaurant)
export default RestaurantModel

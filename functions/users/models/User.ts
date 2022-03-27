import {
  UUID, Schema, String
} from 'fastest-validator-decorators';

@Schema(true)
export class User {
  @UUID({ optional: true })
  id!: string
  @String()
  username!: string
  @String({ min: 6, max: 255 })
  password!: string
}
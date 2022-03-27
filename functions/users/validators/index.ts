import { Schema, String } from 'fastest-validator-decorators';

@Schema(true)
export class CreateUserInput {
  @String()
  username!: string
  @String({ min: 6, max: 255 })
  password!: string
}
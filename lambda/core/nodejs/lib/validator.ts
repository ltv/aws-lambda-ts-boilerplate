import Validator, { ValidatorConstructorOptions } from 'fastest-validator'
import merge from 'lodash/merge'

const defaultOptions = {
  useNewCustomCheckerFunction: true,
  defaults: {
    object: {
      strict: 'remove',
    },
  },
}

export function createValidator(opts: ValidatorConstructorOptions = {}): Validator {
  const options = merge(defaultOptions, opts)
  return new Validator(options)
}

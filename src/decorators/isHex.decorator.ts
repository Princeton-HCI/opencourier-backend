import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator'
import { Hex } from 'viem'

export const IS_HEX = 'isHex'

/**
 * Checks if the string is a hexadecimal number.
 * If given value is not a string, then it returns false.
 */
export function isHex(value: unknown): value is Hex {
  return typeof value === 'string' && /^0x[0-9a-f]*$/i.test(value)
}

/**
 * Checks if the string is a hexadecimal number.
 * If given value is not a string, then it returns false.
 */
export function IsHex(validationOptions?: ValidationOptions): PropertyDecorator {
  return ValidateBy(
    {
      name: IS_HEX,
      validator: {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        validate: (value: unknown, _args: any): boolean => isHex(value),
        defaultMessage: buildMessage(
          (eachPrefix: string) => eachPrefix + '$property must be a hexadecimal number',
          validationOptions
        ),
      },
    },
    validationOptions
  )
}

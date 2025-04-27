import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';
import { isLicensePlateValid } from '../module/models/utils';

export function IsLicensePlate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLicensePlate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          return isLicensePlateValid(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `The property '${args.property}' must be a valid license plate (e.g., 'ABC-1234' or 'ABC1A23').`;
        },
      },
    });
  };
}

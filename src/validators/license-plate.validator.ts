import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsLicensePlate(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isLicensePlate',
      target: object.constructor,
      propertyName: propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }
          // Regex for valid in last format or Mercosul format
          // Valid formats: ABC-1234 or ABC1A23
          const licensePlateRegex = /^[A-Z]{3}-\d{4}$|^[A-Z]{3}\d[A-Z]\d{2}$/;
          return licensePlateRegex.test(value);
        },
        defaultMessage(args: ValidationArguments) {
          return `The property '${args.property}' must be a valid license plate (e.g., 'ABC-1234' or 'ABC1A23').`;
        },
      },
    });
  };
}
import { ValidationArguments } from 'class-validator';

type TypeForValidation =
  | 'string'
  | 'boolean'
  | 'int'
  | 'dateString'
  | 'object'
  | 'array'
  | 'numberString'
  | 'booleanString'
  | 'number';

export function messageValidationTypeFactory(
  type: TypeForValidation
): (argumentos: ValidationArguments) => string {
  const mapTypeDescription: Record<TypeForValidation, string> = {
    int: 'a number integer',
    string: 'a string',
    boolean: 'a value boolean',
    dateString: 'data in ISO 8601',
    object: 'a object',
    array: 'a array',
    numberString: 'a string number',
    number: 'a number',
    booleanString: 'a string boolean'
  };

  return function(argumentos: ValidationArguments) {
    return `The property '${argumentos.property}' is expected to receive ${mapTypeDescription[type]}. Value received: ${argumentos.value}. `;
  };
}

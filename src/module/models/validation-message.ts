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
    int: 'um número inteiro',
    string: 'uma string',
    boolean: 'um valor booleano',
    dateString: 'data no padrão ISO 8601',
    object: 'um objeto',
    array: 'um array',
    numberString: 'uma string de números',
    number: 'um número',
    booleanString: 'uma string de boolean'
  };

  return function(argumentos: ValidationArguments) {
    return `A propriedade '${argumentos.property}' espera receber ${mapTypeDescription[type]}. Valor recebido ${argumentos.value}. `;
  };
}

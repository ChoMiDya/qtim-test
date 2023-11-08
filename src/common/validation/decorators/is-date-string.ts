import { ValidationOptions, ValidateBy, buildMessage } from 'class-validator';

export function IsDateString(
  validationOptions?: ValidationOptions,
): PropertyDecorator {
  return ValidateBy(
    {
      name: 'IsDateString',
      validator: {
        validate(value: unknown) {
          if (typeof value !== 'string') {
            return false;
          }

          return /^(\d{4}-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01]))$/.test(
            value,
          );
        },
        defaultMessage: buildMessage(
          (eachPrefix) =>
            `${eachPrefix} $property must be value with a format of (YYYY-MM-DD)`,
          validationOptions,
        ),
      },
    },
    validationOptions,
  );
}

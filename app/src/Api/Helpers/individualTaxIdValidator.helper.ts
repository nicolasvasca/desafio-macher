/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from 'class-validator';
import individualTaxIdCalcHelper from './individualTaxIdCalc.helper';

@ValidatorConstraint({ name: 'individualTaxIdValidatorHelper', async: false })
export class IndividualTaxIdValidatorHelper
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments) {
    return individualTaxIdCalcHelper.isValid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return 'O CPF é inválido.';
  }
}

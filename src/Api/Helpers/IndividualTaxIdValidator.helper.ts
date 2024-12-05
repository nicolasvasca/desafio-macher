/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
} from "class-validator";
import IndividualTaxIdCalcHelper from "./IndividualTaxIdCalc.helper";

@ValidatorConstraint({ name: "individualTaxIdValidatorHelper", async: false })
export class IndividualTaxIdValidatorHelper
  implements ValidatorConstraintInterface
{
  validate(text: string, args: ValidationArguments) {
    return IndividualTaxIdCalcHelper.isValid(text);
  }

  defaultMessage(args: ValidationArguments) {
    return "O CPF é inválido.";
  }
}

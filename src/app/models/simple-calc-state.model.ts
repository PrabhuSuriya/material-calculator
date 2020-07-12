import { Stack } from './stack';
import { CalcKey } from './calc-key.model';

export class SimpleCalcStateModel {
    CurrentValue: CalcKey;
    PreviousValue: CalcKey;
    OperationStack: Stack<CalcKey>;
}

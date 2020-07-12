import { Stack } from './stack';

export class SimpleCalcStateModel {
    CurrentValue: string;
    OperationStack: Stack<number>;
    PreviousResult: string;
}

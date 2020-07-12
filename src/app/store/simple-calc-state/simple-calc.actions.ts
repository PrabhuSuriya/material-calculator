import { CalcKey } from 'src/app/models/calc-key.model';

export class UpdateCurrentValue {
    static readonly type = '[SIMPLECALC] Update Current Value';
    constructor(public key: CalcKey) { }
}

export class ClearCurrentValue {
    static readonly type = '[SIMPLECALC] Clear Current Value';
    constructor() { }
}

export class BackspaceCurrentValue {
    static readonly type = '[SIMPLECALC] Backspace Current Value';
    constructor() { }
}

export class PushToStack {
    static readonly type = '[SIMPLECALC] Push To Stack';
    constructor(public key: CalcKey) { }
}
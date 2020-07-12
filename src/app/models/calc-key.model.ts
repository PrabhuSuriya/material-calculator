export class CalcKey {
    value: string;
    display?: string;
    type: 'number' | 'operator' | 'action';
    operation?: Function;
}

// to avoid returning the same reference
export const EMTPY_VALUE = (): CalcKey => ({
    value: '',
    type: 'number'
})

export const OPERATORS: { [key: string]: CalcKey } = {
    '+': { type: 'operator', value: '+', operation: (x, y) => (+x) + (+y) },
    '-': { type: 'operator', value: '-', operation: (x, y) => (+x) - (+y) },
    '*': { type: 'operator', value: '*', operation: (x, y) => (+x) * (+y) },
    '/': { type: 'operator', value: '/', operation: (x, y) => (+x) / (+y) },
}
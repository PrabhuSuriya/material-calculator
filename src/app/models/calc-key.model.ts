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

export const SIMPLE_KEY: { [key: string]: CalcKey } = {
    '+': { type: 'operator', value: '+', operation: (x, y) => (+x) + (+y) },
    '-': { type: 'operator', value: '-', operation: (x, y) => (+x) - (+y) },
    '*': { type: 'operator', value: '*', operation: (x, y) => (+x) * (+y) },
    '/': { type: 'operator', value: '/', operation: (x, y) => (+x) / (+y) },

    '1': { type: 'number', value: '1' },
    '2': { type: 'number', value: '2' },
    '3': { type: 'number', value: '3' },
    '4': { type: 'number', value: '4' },
    '5': { type: 'number', value: '5' },
    '6': { type: 'number', value: '6' },
    '7': { type: 'number', value: '7' },
    '8': { type: 'number', value: '8' },
    '9': { type: 'number', value: '9' },
    '0': { type: 'number', value: '0' },
    '.': { type: 'number', value: '.' },
    '00': { type: 'number', value: '00' },

    'CE': { type: 'action', value: 'CE' },
    'B': { type: 'action', value: 'B' },
    '=': { type: 'action', value: '=' },
    'Enter': { type: 'action', value: '=' },

};
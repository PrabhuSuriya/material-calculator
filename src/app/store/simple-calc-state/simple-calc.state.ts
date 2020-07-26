import { SimpleCalcStateModel } from 'src/app/models/simple-calc-state.model';
import { Stack } from 'src/app/models/stack';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { SimpleCalcService } from 'src/app/services/simple-calc.service';
import { UpdateCurrentValue, ClearCurrentValue, BackspaceCurrentValue, PushToStack, UpdateResult } from './simple-calc.actions';
import { Injectable } from '@angular/core';
import { CalcKey, EMTPY_VALUE } from 'src/app/models/calc-key.model';

const INITIAL_SIMPLE_CALC_STATE: SimpleCalcStateModel = {
    CurrentValue: EMTPY_VALUE(),
    PreviousValue: EMTPY_VALUE(),
    OperationStack: new Stack<CalcKey>(100),
}

@State<SimpleCalcStateModel>({
    name: 'SimpleCalc',
    defaults: INITIAL_SIMPLE_CALC_STATE
})
@Injectable()
export class SimpleCalcState {
    constructor(private _simpleCalcService: SimpleCalcService) { }


    // Selectors
    @Selector()
    public static currentValue(state: SimpleCalcStateModel): string {
        return state.CurrentValue.value;
    }

    @Selector()
    public static previousValue(state: SimpleCalcStateModel): string {
        return state.PreviousValue.value;
    }

    // Reducers
    @Action(UpdateCurrentValue)
    updateCurrentValue(ctx: StateContext<SimpleCalcStateModel>, action: UpdateCurrentValue) {
        const state = ctx.getState();
        // console.log(state.OperationStack.Length)
        const currentValue = state.CurrentValue;
        if (currentValue.type === action.key.type) {
            currentValue.value = currentValue.type === 'number' ? `${currentValue.value}${action.key.value}` : action.key.value
            ctx.patchState({ CurrentValue: currentValue });
        }
        else {
            const stack = state.OperationStack;
            stack.push(state.CurrentValue);
            const result = operateOnStack(stack);
            if (result) {
                stack.push(result)
            }
            ctx.patchState({
                CurrentValue: action.key,
                PreviousValue: result ? result : currentValue,
                OperationStack: stack
            });
        }
        state.OperationStack.stackContents();
    };

    @Action(UpdateResult)
    updateResult(ctx: StateContext<SimpleCalcStateModel>) {
        const state = ctx.getState();
        const stack = state.OperationStack;
        stack.push(state.CurrentValue);
        const result = operateOnStack(stack);
        if (result) {
            stack.clear();
            // stack.push(result);
            ctx.patchState({
                CurrentValue: result,
                PreviousValue: EMTPY_VALUE(),
                OperationStack: stack
            });
        }
    };

    @Action(ClearCurrentValue)
    clearCurrentValue(ctx: StateContext<SimpleCalcStateModel>) {
        const state = ctx.getState();
        const currentValue = state.CurrentValue;
        currentValue.value = ``
        ctx.patchState({ CurrentValue: currentValue });
    };

    @Action(BackspaceCurrentValue)
    backspaceCurrentValue(ctx: StateContext<SimpleCalcStateModel>) {
        const state = ctx.getState();
        const currentValue = state.CurrentValue;
        currentValue.value = currentValue.value.length ? currentValue.value.slice(0, -1) : '';
        ctx.patchState({ CurrentValue: currentValue });
    };

    // @Action(PushToStack)
    // pushToStack(ctx: StateContext<SimpleCalcStateModel>, action: UpdateCurrentValue) {
    //     const state = ctx.getState();
    //     const stack = state.OperationStack;
    //     stack.push(action.key);
    //     ctx.patchState({
    //         OperationStack: stack,
    //         CurrentValue: action.key
    //     });
    // };

    // Effects
    // @Action(UpdateCurrentValue)
    // getCountries(ctx: StateContext<SimpleCalcStateModel>, { CurrentValue }: SimpleCalcStateModel) {
    //     return this._simpleCalcService.getvalues(CurrentValue)
    //         .pipe(
    //             map(data => ctx.dispatch(new UpdateCurrentValue('')))
    //         );
    // }
}

function operateOnStack(stack: Stack<CalcKey>): CalcKey {
    if (stack.Length >= 3) {
        const val1 = stack.pop();
        const op = stack.pop();
        const val2 = stack.pop();
        return operate(val2, val1, op);

    }
    else {
        return null;
    }
}

function operate(x: CalcKey, y: CalcKey, operation: CalcKey): CalcKey {
    return { value: operation.operation(x.value, y.value), type: 'number' };
}
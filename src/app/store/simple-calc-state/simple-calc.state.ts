import { SimpleCalcStateModel } from 'src/app/models/simple-calc-state.model';
import { Stack } from 'src/app/models/stack';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { SimpleCalcService } from 'src/app/services/simple-calc.service';
import { UpdateCurrentValue, ClearCurrentValue, BackspaceCurrentValue, PushToStack } from './simple-calc.actions';
import { Injectable } from '@angular/core';
import { CalcKey } from 'src/app/models/calc-key.model';

const INITIAL_SIMPLE_CALC_STATE: SimpleCalcStateModel = {
    CurrentValue: { type: 'number', value: '' },
    PreviousValue: { type: 'number', value: '' },
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
        const currentValue = state.CurrentValue;
        if (currentValue.type === action.key.type) {
            currentValue.value = `${currentValue.value}${action.key.value}`
            ctx.patchState({ CurrentValue: currentValue });
        }
        else {
            const stack = state.OperationStack;
            stack.push(action.key);
                ctx.patchState({
                CurrentValue: action.key,
                PreviousValue: currentValue,
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

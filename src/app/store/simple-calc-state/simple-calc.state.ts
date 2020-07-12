import { SimpleCalcStateModel } from 'src/app/models/simple-calc-state.model';
import { Stack } from 'src/app/models/stack';
import { State, Selector, StateContext, Action } from '@ngxs/store';
import { SimpleCalcService } from 'src/app/services/simple-calc.service';
import { UpdateCurrentValue } from './simple-calc.actions';
import { Injectable } from '@angular/core';

const INITIAL_SIMPLE_CALC_STATE: SimpleCalcStateModel = {
    CurrentValue: '',
    OperationStack: new Stack<number>(100),
    PreviousResult: ''
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
        return state.CurrentValue;
    }

    // Reducers
    @Action(UpdateCurrentValue)
    setCountries(ctx: StateContext<SimpleCalcStateModel>, action: UpdateCurrentValue) {
        const state = ctx.getState();
        ctx.patchState({ CurrentValue: action.value });
    };

    // Effects
    // @Action(UpdateCurrentValue)
    // getCountries(ctx: StateContext<SimpleCalcStateModel>, { CurrentValue }: SimpleCalcStateModel) {
    //     return this._simpleCalcService.getvalues(CurrentValue)
    //         .pipe(
    //             map(data => ctx.dispatch(new UpdateCurrentValue('')))
    //         );
    // }
}

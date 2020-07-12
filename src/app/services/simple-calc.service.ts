import { Injectable } from '@angular/core';
import { CalcKey } from '../models/calc-key.model';
import { Store } from '@ngxs/store';
import { UpdateCurrentValue, ClearCurrentValue, BackspaceCurrentValue, PushToStack, UpdateResult } from '../store/simple-calc-state/simple-calc.actions';

@Injectable({
  providedIn: 'root'
})
export class SimpleCalcService {

  constructor(private _store: Store) { }

  public buttonPressed(key: CalcKey) {
    switch (key.type) {
      case 'number':
      case 'operator':
        this._store.dispatch(new UpdateCurrentValue(key));
        break;
      // case 'operator':{
      //   this._store.dispatch(new PushToStack(key));
      //   this._store.dispatch(new UpdateCurrentValue(key));
      // }
      case 'action': {
        switch (key.value) {
          case 'CE':
            this._store.dispatch(new ClearCurrentValue());
            break;
          case 'B':
            this._store.dispatch(new BackspaceCurrentValue());
            break;
          case '=':
            this._store.dispatch(new UpdateResult());
            break;
        }
      }
    }
  }
}

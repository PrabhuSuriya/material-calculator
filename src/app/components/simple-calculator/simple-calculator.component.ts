import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateCurrentValue } from 'src/app/store/simple-calc-state/simple-calc.actions';
import { SimpleCalcState } from 'src/app/store/simple-calc-state/simple-calc.state';
import { SimpleCalcService } from 'src/app/services/simple-calc.service';

@Component({
  templateUrl: './simple-calculator.component.html',
  styleUrls: ['./simple-calculator.component.scss']
})
export class SimpleCalculatorComponent implements OnInit {

  @Select(SimpleCalcState.currentValue) public currentValue$: Observable<string>;

  constructor(private _store: Store, private _simpleCalcService: SimpleCalcService) { }

  ngOnInit(): void {
  }

  buttonPressed(key) {
    console.log(key);
    this.processKey(key);
  }
  processKey(key: any) {
    if (/[0-9.]/.test(key)) {

      // this.currentInput += key;
      this._store.dispatch(new UpdateCurrentValue(key));
    }
    else {
      this.processSplKey(key);
    }
  }

  processSplKey(key: any) {
    switch (key) {
      case '+':
      case '-':
      case '*':
      case '/':
        // this.currentInput = key;
        break;
    }
  }

}

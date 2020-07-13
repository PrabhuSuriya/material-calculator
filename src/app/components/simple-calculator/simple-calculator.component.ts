import { Component, OnInit, HostListener } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { UpdateCurrentValue } from 'src/app/store/simple-calc-state/simple-calc.actions';
import { SimpleCalcState } from 'src/app/store/simple-calc-state/simple-calc.state';
import { SimpleCalcService } from 'src/app/services/simple-calc.service';
import { CalcKey, SIMPLE_KEY as SIMPLE_KEYS } from 'src/app/models/calc-key.model';

@Component({
  templateUrl: './simple-calculator.component.html',
  styleUrls: ['./simple-calculator.component.scss']
})
export class SimpleCalculatorComponent implements OnInit {

  @Select(SimpleCalcState.currentValue) public currentValue$: Observable<string>;
  @Select(SimpleCalcState.previousValue) public previousValue$: Observable<string>;


  constructor(private _store: Store, private _simpleCalcService: SimpleCalcService) { }

  ngOnInit(): void {
    this._store.select(s => s.OperationStack).subscribe(console.log);
  }

  // numberPressed(key) {
  //   this._simpleCalcService.buttonPressed({ value: key, type: 'number' })
  // }
  // operatorPressed(key) {
  //   this._simpleCalcService.buttonPressed(SIMPLE_KEYS[key]);
  // }
  // actionPressed(key) {
  //   this._simpleCalcService.buttonPressed({ value: key, type: 'action' })
  // }

  buttonPressed(key) {
    this._simpleCalcService.buttonPressed(SIMPLE_KEYS[key]);
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    const key = event.key;
    console.log(key)
    const calcKey = SIMPLE_KEYS[key];
    if (calcKey) {
      this._simpleCalcService.buttonPressed(calcKey);
    }
  }

}

import { Component, OnInit } from '@angular/core';

@Component({
  templateUrl: './simple-calculator.component.html',
  styleUrls: ['./simple-calculator.component.scss']
})
export class SimpleCalculatorComponent implements OnInit {

  currentInput: string = '';
  constructor() { }

  ngOnInit(): void {
  }

  buttonPressed(key) {
    console.log(key);
    this.processKey(key);
  }
  processKey(key: any) {
    if (/[0-9.]/.test(key)) {
      this.currentInput += key;
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
        this.currentInput = key;
        break;
    }
  }

}

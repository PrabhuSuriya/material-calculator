import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'mc-display',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DisplayComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}

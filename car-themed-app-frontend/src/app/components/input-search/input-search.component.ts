import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-input-search',
  templateUrl: './input-search.component.html',
  styleUrls: ['./input-search.component.less'],
})
export class InputSearchComponent implements OnInit {
  @Input('title') title;
  @Input('rowNumber') rowNumber: number;
  @Output() stringValue = new EventEmitter();
  constructor() {}

  ngOnInit() {}

  search(filterValue: string) {
    this.stringValue.emit(filterValue);
  }
}

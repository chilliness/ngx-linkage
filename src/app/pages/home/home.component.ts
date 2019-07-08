import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  [x: string]: any;
  base = '';
  baseFlag = false;
  time = '';
  timeFlag = false;
  date = '';
  dateFlag = false;
  addr = '';
  addrFlag = false;

  constructor() { }

  ngOnInit() { }

  handleConfirm(args, type, divide = '-') {
    const { val, bool } = args;
    if (bool) {
      this[type] = val.join(divide);
      this[`${type}Flag`] = false;
    }
  }
}

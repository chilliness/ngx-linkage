import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  [x: string]: any;
  base = '';
  baseFlag = false;
  time = '';
  timeFlag = false;
  date = '';
  dateFlag = false;
  addr = '';
  addrFlag = false;

  handleConfirm(args, type, divide = '-') {
    const { val, bool } = args;
    if (bool) {
      this[type] = val.join(divide);
      this[`${type}Flag`] = false;
    }
  }
}

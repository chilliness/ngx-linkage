import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-linkage-time',
  templateUrl: './linkage-time.component.html',
  styleUrls: ['./linkage-time.component.scss']
})
export class LinkageTimeComponent {
  @Input() initVal = [];
  @Input() isShow: boolean;
  @Input() cancelText = '取消';
  @Input() confirmText = '确定';

  @Output() init = new EventEmitter();
  @Output() over = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  [x: string]: any;
  list = [];

  constructor() {
    const hourList = [...''.padEnd(24)].map((v, i) => ({
      val: String(i).padStart(2, '0')
    }));
    const minuteList = [...''.padEnd(60)].map((v, i) => ({
      val: String(i).padStart(2, '0')
    }));
    const secondList = [...''.padEnd(60)].map((v, i) => ({
      val: String(i).padStart(2, '0')
    }));

    this.list = [hourList, minuteList, secondList];
  }

  handleCancel(res) {
    this.cancel.emit(res);
  }

  handleConfirm(res) {
    this.confirm.emit(res);
  }

  handleOver(res) {
    this.over.emit(res);
  }

  handleInit(res) {
    this.init.emit(res);
  }
}

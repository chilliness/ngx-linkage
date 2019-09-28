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

  @Output() emitInit = new EventEmitter();
  @Output() emitOver = new EventEmitter();
  @Output() emitCancel = new EventEmitter();
  @Output() emitConfirm = new EventEmitter();

  [x: string]: any;
  list = [];

  constructor() {
    const hourList = Array(24)
      .fill('')
      .map((v, i) => ({
        val: String(i).padStart(2, '0')
      }));
    const minuteList = Array(60)
      .fill('')
      .map((v, i) => ({
        val: String(i).padStart(2, '0')
      }));
    const secondList = Array(60)
      .fill('')
      .map((v, i) => ({
        val: String(i).padStart(2, '0')
      }));

    this.list = [hourList, minuteList, secondList];
  }

  handleCancel(res) {
    this.emitCancel.emit(res);
  }

  handleConfirm(res) {
    this.emitConfirm.emit(res);
  }

  handleOver(res) {
    this.emitOver.emit(res);
  }

  handleInit(res) {
    this.emitInit.emit(res);
  }
}

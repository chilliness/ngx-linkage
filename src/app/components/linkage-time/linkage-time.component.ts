import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-linkage-time',
  templateUrl: './linkage-time.component.html',
  styleUrls: ['./linkage-time.component.scss']
})
export class LinkageTimeComponent implements OnInit {
  @Input() initVal = [];
  @Input() isShow = false;
  @Input() cancelText = '取消';
  @Input() confirmText = '确定';

  @Output() init = new EventEmitter();
  @Output() over = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  [x: string]: any;
  list = [];

  constructor() {
    const hourList = Array.from(Array(24).keys(), num => ({
      val: String(num).padStart(2, '0')
    }));
    const minuteList = Array.from(Array(60).keys(), num => ({
      val: String(num).padStart(2, '0')
    }));
    const secondList = Array.from(Array(60).keys(), num => ({
      val: String(num).padStart(2, '0')
    }));

    this.list = [hourList, minuteList, secondList];
  }

  ngOnInit() { }

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

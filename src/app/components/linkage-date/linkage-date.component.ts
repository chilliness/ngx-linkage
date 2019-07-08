import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-linkage-date',
  templateUrl: './linkage-date.component.html',
  styleUrls: ['./linkage-date.component.scss']
})
export class LinkageDateComponent implements OnInit {
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
  linkageVal = [];

  constructor() {
    const yearList = [];
    const range = { min: -5, max: 5 };
    const year = String(new Date().getFullYear());

    for (let i = range.min; i <= range.max; i++) {
      yearList.push({ val: String(+year + i) });
    }

    const monthList = Array.from(Array(12).keys(), num => ({
      val: String(num + 1).padStart(2, '0')
    }));
    const dateList = Array.from(Array(31).keys(), num => ({
      val: String(num + 1).padStart(2, '0')
    }));

    this.list = [yearList, monthList, dateList];
  }

  ngOnInit() {
    this.handleInitPos();
  }

  handleInitPos() {
    if (!this.initVal.length) {
      return;
    }

    const [year, month, date] = this.initVal;
    const oYear = this.list[0].find(item => item.val === year);
    if (oYear === undefined) {
      return;
    }

    const oMonth = this.list[1].find(item => item.val === month);
    if (oMonth === undefined) {
      return;
    }

    const oDate = this.list[2].find(item => item.val === date);
    if (oDate === undefined) {
      return;
    }

    const days = new Date(year, month, 0).getDate();
    const dateList = Array.from(Array(days).keys(), num => ({
      val: String(num + 1).padStart(2, '0')
    }));
    this.list = [this.list[0], this.list[1], dateList];
  }

  handleCancel(res) {
    this.cancel.emit(res);
  }

  handleConfirm(res) {
    this.confirm.emit(res);
  }

  handleOver(res) {
    const { which, val, bool } = res;
    this.over.emit(res);

    // 这步判断是必须的，防止获取不到数据报错
    if (!bool) {
      return;
    }

    if (which !== 2) {
      const days = new Date(val[0], val[1], 0).getDate();
      const dateList = Array.from(Array(days).keys(), num => ({
        val: String(num + 1).padStart(2, '0')
      }));
      this.list = [this.list[0], this.list[1], dateList];

      if (days < val[2]) {
        this.linkageVal = [null, null, String(days).padStart(2, '0')];
      }
    }
  }

  handleInit(res) {
    this.init.emit(res);
  }
}

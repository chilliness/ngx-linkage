import { Component, AfterContentInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-linkage-date',
  templateUrl: './linkage-date.component.html',
  styleUrls: ['./linkage-date.component.scss']
})
export class LinkageDateComponent implements AfterContentInit {
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
  linkageVal = [];

  constructor() {
    const yearList = [];
    const range = { min: -5, max: 5 };
    const year = String(new Date().getFullYear());

    for (let i = range.min; i <= range.max; i++) {
      yearList.push({ val: String(+year + i) });
    }

    const monthList = Array(12)
      .fill('')
      .map((v, i) => ({
        val: String(i + 1).padStart(2, '0')
      }));
    const dateList = Array(31)
      .fill('')
      .map((v, i) => ({
        val: String(i + 1).padStart(2, '0')
      }));

    this.list = [yearList, monthList, dateList];
  }

  ngAfterContentInit() {
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
    const dateList = Array(days)
      .fill('')
      .map((v, i) => ({
        val: String(i + 1).padStart(2, '0')
      }));
    this.list = [this.list[0], this.list[1], dateList];
  }

  handleCancel(res) {
    this.emitCancel.emit(res);
  }

  handleConfirm(res) {
    this.emitConfirm.emit(res);
  }

  handleOver(res) {
    const { which, val, bool } = res;
    this.emitOver.emit(res);

    // 这步判断是必须的，防止获取不到数据报错
    if (!bool) {
      return;
    }

    if (which !== 2) {
      const days = new Date(val[0], val[1], 0).getDate();
      const dateList = Array(days)
        .fill('')
        .map((v, i) => ({
          val: String(i + 1).padStart(2, '0')
        }));
      this.list = [this.list[0], this.list[1], dateList];

      if (days < val[2]) {
        this.linkageVal = [null, null, String(days).padStart(2, '0')];
      }
    }
  }

  handleInit(res) {
    this.emitInit.emit(res);
  }
}

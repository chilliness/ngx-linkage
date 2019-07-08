import { Component, OnChanges, OnInit, AfterViewInit, Input, Output, EventEmitter, ViewChildren } from '@angular/core';
import { css, MTween } from './js/m.Tween.js';
const touch: any = { lastTime: 0, interval: 300 };

@Component({
  selector: 'app-linkage-base',
  templateUrl: './linkage-base.component.html',
  styleUrls: ['./linkage-base.component.scss']
})
export class LinkageBaseComponent implements OnChanges, OnInit, AfterViewInit {
  @Input() list = [[{ val: '苹果' }, { val: '香蕉' }, { val: '西瓜' }, { val: '樱桃' }]];
  @Input() initVal = [];
  @Input() linkageVal = [];
  @Input() isShow = false;
  @Input() cancelText = '取消';
  @Input() confirmText = '确定';

  @Output() init = new EventEmitter();
  @Output() over = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  @ViewChildren('listBox') listBoxRef: any;

  [x: string]: any;

  constructor() { }

  ngOnChanges(changes) {
    if (changes.isShow !== undefined && !changes.isShow.firstChange) {
      const type = changes.isShow.currentValue ? 'addEventListener' : 'removeEventListener';
      document[type]('touchmove', this.handlePrevent, { passive: false });
    }

    if (changes.linkageVal !== undefined && !changes.linkageVal.firstChange) {
      this.$nextTick(this.handleCssPos);
    }
  }

  ngOnInit() { }

  ngAfterViewInit() {
    this.$nextTick(this.handleInitPos);
  }

  handleInitPos() {
    if (!this.initVal.length) {
      return;
    }

    const aPos = [];
    this.list.map((item, index) => {
      aPos.push(item.findIndex(item => item.val === this.initVal[index]));
    });

    if (aPos.includes(-1)) {
      return console.log(this.initVal, '初始化失败，请核对数据有效性');
    }

    const timerOut = setTimeout(() => {
      clearTimeout(timerOut);
      this.listBoxRef._results.forEach((item, index) => {
        item = item.nativeElement;
        const val = -css(item.children[0], 'height') * aPos[index];
        css(item, 'translateY', val);
      });

      this.init.emit({ index: aPos, _: 'index-初始化索引' });
    }, 60);
  }

  handleCssPos() {
    if (!this.linkageVal.length) {
      return;
    }

    const aPos = [];
    this.list.map((item, index) => {
      aPos.push(item.findIndex(item => item.val === this.linkageVal[index]));
    });

    this.listBoxRef._results.forEach((item, index) => {
      item = item.nativeElement;
      const val = aPos[index];
      if (val !== -1) {
        css(item, 'translateY', -css(item.children[0], 'height') * val);
      }
    });
  }

  handleStart(elIndex, e) {
    const now = +new Date();
    if (now - touch.lastTime < touch.interval) {
      return (touch.init = false);
    }

    touch.init = true;
    touch.lastTime = now;
    touch.elIndex = elIndex;
    touch.el = this.listBoxRef._results[elIndex].nativeElement;
    touch.diffY = 0;
    touch.startY = e.changedTouches[0].pageY;
    touch.oldVal = css(touch.el, 'translateY');
  }

  handleMove(e) {
    if (!touch.init) {
      return;
    }

    touch.diffY = e.changedTouches[0].pageY - touch.startY;
    touch.dir = touch.diffY < 0 ? 'up' : 'down';
    css(touch.el, 'translateY', touch.oldVal + touch.diffY);
  }

  handleEnd() {
    if (!touch.init) {
      return;
    }

    const el = touch.el;
    const height = css(el.children[0], 'height');
    const maxHeight = height * (el.children.length - 1);
    let targetY = css(el, 'translateY');

    if (touch.dir === 'up') {
      targetY -= (targetY % height) + height;
    } else {
      targetY -= targetY % height;
    }

    // 超过每项高度的1/3才滑动，否则还原位置
    if (Math.abs(touch.diffY) < height / 3) {
      targetY = touch.oldVal;
    }

    if (targetY > 0) {
      targetY = 0;
    } else if (targetY < -maxHeight) {
      targetY = -maxHeight;
    }
    MTween({
      el,
      target: { translateY: targetY },
      type: 'easeOut',
      time: 100,
      callBack: () => this.over.emit(this.handleResult(touch.elIndex))
    });
  }

  handleResult(elIndex = -1) {
    const obj: any = {
      bool: true,
      index: [],
      meta: [],
      val: [],
      _: 'bool-是否正常,index-最终索引,meta-最终数据,val-最终结果'
    };

    this.listBoxRef._results.forEach((item, index) => {
      item = item.nativeElement;
      const msg = '警告:心急吃不了热豆腐';
      const children = item.children;
      const nowIndex = Math.abs(
        css(item, 'translateY') / css(children[0], 'height')
      );
      if (children[nowIndex]) {
        obj.index.push(nowIndex);
        obj.meta.push(this.list[index][nowIndex]);
        obj.val.push(children[nowIndex].dataset.val);
      } else {
        obj.index.push(msg);
        obj.meta.push(msg);
        obj.val.push(msg);
        obj.bool = false;
      }
    });

    if (elIndex !== -1) {
      obj.which = elIndex;
      obj._ =
        'bool-是否正常,index-联动前索引,meta-联动前数据,val-联动前结果,which-联动前操作列索引';
    }
    return obj;
  }

  handleConfirm() {
    this.confirm.emit(this.handleResult());
  }

  handleCancel() {
    this.cancel.emit(this.handleResult());
  }

  handlePrevent(e) {
    e.preventDefault();
  }

  handleBy(index) {
    return index;
  }

  $nextTick(callback) {
    const timerOut = setTimeout(() => {
      clearTimeout(timerOut);
      callback && callback.call(this);
    }, 60);
  }
}

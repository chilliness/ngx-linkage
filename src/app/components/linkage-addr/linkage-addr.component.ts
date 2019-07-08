import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { provList, cityList, areaList } from './js/metadata.js';

@Component({
  selector: 'app-linkage-addr',
  templateUrl: './linkage-addr.component.html',
  styleUrls: ['./linkage-addr.component.scss']
})
export class LinkageAddrComponent implements OnInit {
  @Input() initVal = [];
  @Input() isShow = false;
  @Input() cancelText = '取消';
  @Input() confirmText = '确定';

  @Output() init = new EventEmitter();
  @Output() over = new EventEmitter();
  @Output() cancel = new EventEmitter();
  @Output() confirm = new EventEmitter();

  [x: string]: any;
  list = [provList, cityList, areaList];
  linkageVal = [];
  lastIndex = '';

  constructor() { }

  ngOnInit() {
    this.handleInitPos();
  }

  handleInitPos() {
    if (!this.initVal.length) {
      return;
    }

    const [prov, city, area] = this.initVal;
    const oProv = provList.find(item => item.val === prov);
    if (oProv === undefined) {
      return;
    }

    const oCity = oProv.pro_cities.find(item => item.val === city);
    if (oCity === undefined) {
      return;
    }

    const oArea = oCity.city_areas.find(item => item.val === area);
    if (oArea === undefined) {
      return;
    }

    this.list = [provList, oProv.pro_cities, oCity.city_areas];
  }

  handleCancel(res) {
    this.cancel.emit(res);
  }

  handleConfirm(res) {
    this.confirm.emit(res);
  }

  handleOver(res) {
    const { which, meta, index, bool } = res;
    const str = String(index);
    this.over.emit(res);

    // 这步判断是必须的，防止获取不到数据报错
    if (!bool) {
      return;
    }

    if (which === 0) {
      const citys = meta[0].pro_cities;
      const areas = citys[0].city_areas;
      const cityVal = citys[0].val;
      const areaVal = areas[0].val;

      if (this.lastIndex !== str) {
        this.list = [this.list[0], citys, areas];
        this.linkageVal = [null, cityVal, areaVal];
      }
    } else if (which === 1) {
      const areas = meta[1].city_areas;
      const areaVal = areas[0].val;

      if (this.lastIndex !== str) {
        this.list = [this.list[0], this.list[1], areas];
        this.linkageVal = [null, null, areaVal];
      }
    }
    // 记录上次的联动索引，用以判断当前操作是否联动数据
    this.lastIndex = str;
  }

  handleInit(res) {
    this.lastIndex = String(res.index);
    this.init.emit(res);
  }
}

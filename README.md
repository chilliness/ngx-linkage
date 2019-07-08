## 多级联动

> 亮点

``` bash
1、原生JavaScript实现，无须引入第三方

2、支持初始化数据，满足初始化需求

3、支持自定义数据，想要几列，由你做主

4、解决苹果手机橡皮筋效果带来的负面影响

5、已实现『时间、日期、省市区』联动组件，方便直接使用和个性化定制参考

6、提供『初始化、取消、确定、滚动结束』事件回调，并返回带有字段说明的对象

7、其他亮点，不再一一罗列，请自行发掘
```

> 效果

![最终效果](/demo/demo.gif)

> 注意事项

``` bash
1、CSS代码使用Scss编写

2、本组件是针对移动端开发的，主要解决『移动端』联动问题

3、所有数据和组件均在src/app/components文件夹下，以文件夹划分

4、基础组件为linkage-base，可根据此组件个性化定制符合需求的组件

5、如需使用本项目提供的『时间、日期、省市区』联动组件，请参考本项目代码

6、个性化定制时，请在『事件回调内容bool为true』时再做处理，不包含初始化事件

7、初始化事件回调『只发生在有初始化且初始化成功的前提下』，并返回带有字段说明的对象

8、本组件列数是根据list传入的二维数组长度决定的，请务必保证『二维数组list的合法性』

9、由于『显示内容和获取结果』是取子项的val属性，请务必保证『二维数组list每一项的子项为带有val属性的对象』
```

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

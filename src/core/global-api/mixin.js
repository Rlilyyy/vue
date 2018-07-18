/* @flow */

import { mergeOptions } from '../util/index'

export function initMixin (Vue: GlobalAPI) {
  Vue.mixin = function (mixin: Object) {
    // 与基类合并选项，后面使用该基类实例化的实例都将拥有该选项
    this.options = mergeOptions(this.options, mixin)
    return this
  }
}

/* @flow */

import config from '../config'
import { initUse } from './use'
import { initMixin } from './mixin'
import { initExtend } from './extend'
import { initAssetRegisters } from './assets'
import { set, del } from '../observer/index'
import { ASSET_TYPES } from 'shared/constants'
import builtInComponents from '../components/index'

import {
  warn,
  extend,
  nextTick,
  mergeOptions,
  defineReactive
} from '../util/index'

export function initGlobalAPI (Vue: GlobalAPI) {
  // config
  // 此处定义了 Vue.config 的 getter 和 setter，在 dev 环境下覆盖默认的 config 对象会有警告
  const configDef = {}
  configDef.get = () => config
  if (process.env.NODE_ENV !== 'production') {
    configDef.set = () => {
      warn(
        'Do not replace the Vue.config object, set individual fields instead.'
      )
    }
  }
  Object.defineProperty(Vue, 'config', configDef)

  // exposed util methods.
  // NOTE: these are not considered part of the public API - avoid relying on
  // them unless you are aware of the risk.
  // 此处初始化了 Vue.util，但是作者提醒不要太依赖这玩意，除非已经了解其内部的实现，毕竟这东西是用来方便源码使用的
  Vue.util = {
    warn,
    extend,
    mergeOptions,
    defineReactive
  }

  // 初始化 Vue.set、Vue.delete、Vue.nextTick
  Vue.set = set
  Vue.delete = del
  Vue.nextTick = nextTick

  // 初始化 Vue.options
  // Vue.options.components
  // Vue.options.directives
  // Vue.options.filters
  // 此时这三个选项还都是空对象
  Vue.options = Object.create(null)
  ASSET_TYPES.forEach(type => {
    Vue.options[type + 's'] = Object.create(null)
  })

  // this is used to identify the "base" constructor to extend all plain-object
  // components with in Weex's multi-instance scenarios.
  // 初始化一个 _base 指向其构造函数，后面继承和合并 options 有用
  Vue.options._base = Vue

  // 此处为 Vue.components 想定义好 Vue 本身继承的 componnent，这里是 keep-alive
  extend(Vue.options.components, builtInComponents)

  // 初始化 Vue.use
  initUse(Vue)
  // 初始化 Vue.mixin
  initMixin(Vue)
  // 初始化 Vue.extend
  initExtend(Vue)
  // 初始化 Vue.component、Vue.directive、Vue.filter
  initAssetRegisters(Vue)
}

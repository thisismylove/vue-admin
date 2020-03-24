/**
 * Created by WebStorm.
 * User: nirongxu
 * Date: 2018/12/8
 * Description: 文件描述
 */

import Vue from 'vue'
import VueI18n from 'vue-i18n'

import locale from 'element-ui/lib/locale'
import en from './lang/en'
import cn from './lang/cn'

Vue.use(VueI18n)

const messages = {
  en,    // 英文
  cn,    // 中文
}


const i18n = new VueI18n({
  locale:  'cn',
  messages
})
locale.i18n((key, value) => i18n.t(key, value))


console.log(i18n)

export default i18n
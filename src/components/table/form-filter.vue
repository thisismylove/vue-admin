<template>
  <el-input
    v-if="type === 'input' || type === 'password'"
    :size="size"
    :type="type"
    v-model="itemval"
    :placeholder="$t(`field.${ placeholder }`)"
    :disabled="disabled"
    :clearable="clearable"
    :maxlength="maxlength"
    :show-password="showPassword"
    :show-word-limit="showWordLimit"
    @change="changeValue"
  >
    <el-button v-if="append.label"
      slot="append"
      @click="handleAppend"
    >{{ $t(`field.${ append.label }`) }}</el-button>
  </el-input>

  <el-input-number
    v-else-if="type === 'number'"
    :size="size"
    :type="type"
    v-model="itemval"
    :placeholder="$t(`field.${ placeholder }`)"
    :disabled="disabled"
    :clearable="clearable"
    :min="minVal"
    :max="maxVal"
    :step="step"
    @change="changeValue"
  ></el-input-number>

  <el-input
    v-else-if="type === 'textarea'"
    :size="size"
    :type="type"
    v-model="itemval"
    :placeholder="$t(`field.${ placeholder }`)"
    :disabled="disabled"
    :clearable="clearable"
    :maxlength="maxlength"
    :show-word-limit="showWordLimit"
    @change="changeValue"
  >
  </el-input>

  <el-cascader v-else-if="type === 'area'"
    :size="size"
    :type="type"
    v-model="itemval"
    :placeholder="$t(`field.${ placeholder }`)"
    :options="areaOptions"
    :disabled="disabled"
    :clearable="clearable"
    :filterable="filterable"
    @change="changeValue"
  >
    <template slot-scope="{ node, data }">
      <span>{{ data.label }}</span>
      <span v-if="!node.isLeaf"> ({{ data.children.length }}) </span>
    </template>
  </el-cascader>

  <el-select
    v-else-if="type === 'select'"
    v-model="itemval"
    :size="size"
    :type="type"
    :filterable="filterable"
    :remote="remote"
    :remote-method="handleRemoteMethod"
    :multiple="multiple"
    :placeholder="$t(`field.${ placeholder }`)"
    :autosize="autosize"
    :disabled="disabled"
    :clearable="clearable"
    :loading="loading"
    @change="changeValue"
  >
    <el-option v-for="(item, index) in options" :key="index" :label="item.direct ? item.label : $t(`field.${ item.label }`)" :value="item.value"></el-option>
  </el-select>

  <el-color-picker
    v-else-if="type === 'color'"
    v-model="itemval"
    :size="size"
    :type="type"
    :disabled="disabled"
    :show-alpha="showAlpha"
    :predefine="[
      '#ff4500',
      '#ff8c00',
      '#ffd700',
      '#90ee90',
      '#00ced1',
      '#1e90ff',
      '#c71585',
      'rgba(255, 69, 0, 0.68)',
      'rgb(255, 120, 0)',
      'hsv(51, 100, 98)',
      'hsva(120, 40, 94, 0.5)',
      'hsl(181, 100%, 37%)',
      'hsla(209, 100%, 56%, 0.73)',
      '#c7158577'
    ]"
    @change="changeValue"
  >
  </el-color-picker>

  <el-switch
    v-else-if="type === 'switch'"
    :size="size"
    :type="type"
    :value="value"
    v-model="itemval"
    :active-value="activeValue"
    :inactive-value="inactiveValue"
    :disabled="disabled"
    :active-text="$t(`field.${ activeText }`)"
    :inactive-text="$t(`field.${ inactiveText }`)"
    @change="changeValue"
  >
  </el-switch>

  <el-date-picker
    v-else-if="type === 'date'"
    :size="size"
    v-model="itemval"
    :type="type"
    :placeholder="$t(`field.${ placeholder }`)"
    value-format="yyyy-MM-dd"
    :disabled="disabled"
    :readonly="readonly"
    :editable="editable"
    :clearable="clearable"
    @change="changeValue"
  ></el-date-picker>

  <el-date-picker
    v-else-if="type === 'datetime'"
    :size="size"
    v-model="itemval"
    :type="type"
    :placeholder="$t(`field.${ placeholder }`)"
    value-format="yyyy-MM-dd HH:mm:ss"
    :picker-options="pickerOptions"
    :disabled="disabled"
    :readonly="readonly"
    :editable="editable"
    :clearable="clearable"
    @change="changeValue"
  ></el-date-picker>

  <el-time-picker
    v-else-if="type === 'fixed-time'"
    :size="size"
    v-model="itemval"
    :type="type"
    :is-range="isRange"
    value-format="HH:mm:ss"
    :placeholder="$t(`field.${ placeholder }`)"
    :disabled="disabled"
    :readonly="readonly"
    :editable="editable"
    :clearable="clearable"
    @change="changeValue"
  ></el-time-picker>

  <el-date-picker
    v-else-if="type === 'datetimerange'"
    :size="size"
    v-model="itemval"
    :type="type"
    :range-separator="$t(`field.${ rangeSeparator}`)"
    :start-placeholder="$t(`field.${ startPlaceholder }`)"
    :end-placeholder="$t(`field.${ endPlaceholder }`)"
    :picker-options="datetimerangeOptions"
    value-format="yyyy-MM-dd HH:mm:ss"
    :disabled="disabled"
    :readonly="readonly"
    :editable="editable"
    :clearable="clearable"
    @change="changeValue"
  ></el-date-picker>

  <div v-else-if="type === 'upload'">
    <el-input
      type="input"
      :size="size"
      v-model="itemval"
      :placeholder="$t(`field.${ placeholder }`)"
      :clearable="clearable"
      disabled
      @change="changeValue"
    ></el-input>
    <el-upload
      ref="upload"
      :action="action"
      :before-upload="handleBeforeUpload"
      :on-preview="handleUploadPreview"
      :on-remove-="handleUploadRemove"
      :before-remove="handleUploadRemove"
      :on-success="handleUploadSuccess"
      :on-error="handleUploadError"
      :file-list="fileList"
      :headers="headers"
      :limit="limit"
      :accept="accept"
      list-type="picture-card"
    >
      <el-button size="small" type="primary">{{ $t('field.uploadBtnText') }}</el-button>
      <div slot="tip" class="el-upload__tip">
        {{ $t('field.uploadInputTipBefore') }} {{ limit }},{{ $t('field.uploadInputTipAfter') }}
        <span v-html="uploadTip"></span>
      </div>
    </el-upload>
  </div>
</template>

<script>
import areas from './area'
export default {
  props: {
    // value
    value: {
      type: [String, Array, Number, Boolean],
      default: () => ''
    },

    // 类型
    type: {
      type: String,
      default: () => 'input'
    },

    // 组件大小
    size: {
      type: String,
      default: () => 'small'
    },

    // 是否禁用
    disabled: {
      type: Boolean,
      default: () => false
    },

    // 是否带清除按钮
    clearable: {
      type: Boolean,
      default: () => true
    },

    // 输入框原始属性 最大长度
    maxlength: {
      type: Number,
      default: () => null
    },

    // 显示限制长度
    showWordLimit: {
      type: Boolean,
      default: () => false,
    },

    // 最小值
    minVal: {
      type: Number,
      default: () => 0
    },

    // 最大值
    maxVal: {
      type: Number,
      default: () => Infinity
    },

    // 是否显示切换密码图标
    showPassword: {
      type: Boolean,
      default: () => false
    },

    // number 计数器步长
    step: {
      type: Number,
      default: () => 1
    },

    // select 是否启用多选
    multiple: {
      type: Boolean,
      default: () => false
    },

    // select 列表
    items: {
      type: Array,
      default: () => []
    },

    // select 是否可搜索
    filterable: {
      type: Boolean,
      default: () => true
    },

    // select 是否远程搜索
    remote: {
      type: Boolean,
      default: () => false
    },

    // select 搜索方法
    remoteMethod: {
      type: Function,
      default: () => {}
    },

    // color Alpha
    showAlpha: {
      type: Boolean,
      default: () => false
    },

    // change 事件
    onchange: {
      type: Function,
      default: () => {}
    },

    // switch 打开值
    activeValue: {
      type: [Boolean, String, Number],
      default: () => true,
    },

    // switch 关闭的值
    inactiveValue: {
      type: [Boolean, String, Number],
      default: () => false,
    },

    // switch 开 内容
    activeText: {
      type: String,
      default: () => 'defaultSwitchActiveText'
    },

    // switch 关 内容
    inactiveText: {
      type: String,
      default: () => 'defaultSwitchInactiveText'
    },

    // textarea 文本大小
    autosize: {
      type: Object,
      default: () => {
        return { minRows: 2, maxRows: 4 }
      }
    },

    // 占位符
    placeholder: {
      type: String,
      default: () => 'defaultPlaceholder'
    },

    // datetime 时间范围占位符 开始日期
    startPlaceholder: {
      type: String,
      default: () => 'defaultDateTimeStartPlaceholder'
    },

    // datetime 时间范围占位符 结束日期
    endPlaceholder: {
      type: String,
      default: () => 'defaultDateTimeEndPlaceholder'
    },

    // 选择时间范围分隔符
    rangeSeparator: {
      type: String,
      default: () => 'defaultDateTimeRangeSeparator'
    },

    // 是否选择时间范围
    isRange: {
      type: Boolean,
      default: () => false
    },

    // date 快捷键
    hasPickerOption: {
      type: Boolean,
      default: () => false
    },

    // 是否只读
    readonly: {
      type: Boolean,
      default: () => false
    },

    // 文本框是否可输入
    editable: {
      type: Boolean,
      default: () => true
    },

    // upload 上传文件类型
    accept: {
      type: String,
      default: () => 'image/png, image/jpeg'
    },

    // upload 上传地址
    action: {
      type: String,
      default: () => process.env.UPLOAD_API // 上传地址
    },

    // upload 删除地址
    delete: {
      type: String,
      default: () => process.env.DELETE_API // 删除上传接口
    },

    // upload 上传header
    headers: {
      type: Object,
      default: () => {}
    },

    // upload 上传最大数
    limit: {
      type: Number,
      default: () => 5
    },

    // 上传提示
    uploadTip: {
      type: String,
      default: () => ''
    },

    // 后置按钮
    append: {
      type: Object,
      default: () => {
        return {}
      }
    }
  },
  created () {
    //
  },
  data () {
    // 选择日期快捷键选项
    const setOptions = {
      disabledDate (time) {
        return time.getTime() > Date.now()
      },
      shortcuts: [{
        text: '今天',
        onClick (picker) {
          picker.$emit('pick', new Date())
        }
      }, {
        text: '昨天',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24)
          picker.$emit('pick', date)
        }
      }, {
        text: '一周前',
        onClick (picker) {
          const date = new Date()
          date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', date)
        }
      }]
    }

    const datetimerangeOptions = {
      shortcuts: [{
        text: '最近一周',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近一个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
          picker.$emit('pick', [start, end])
        }
      }, {
        text: '最近三个月',
        onClick (picker) {
          const end = new Date()
          const start = new Date()
          start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
          picker.$emit('pick', [start, end])
        }
      }]
    }
    let options = {}
    let rangeOptions = {}
    this.hasPickerOption && (options = setOptions, rangeOptions = datetimerangeOptions)

    let fileList = []
    if (this.type === 'upload') {
      fileList = this.handleUploadSplitStringToArray(this.value)
    }
    return {
      itemval: this.value,
      pickerOptions: {
        ...options
      },
      datetimerangeOptions: {
        ...rangeOptions
      },
      areaOptions: areas,

      fileList: fileList,

      loading: null,

      options: this.items,
      loading: false
    }
  },
  mounted () {
    //
  },
  methods: {
    // change 事件发生 提交父组件，改变对应值
    changeValue (val) {
      // this.$log.debug(val);
      this.$emit('input', val)
      if (typeof this.onchange === 'function') {
        this.onchange(this, val)
      }
    },

    // select 远程搜索方法
    handleRemoteMethod (query) {
      if (typeof this.remoteMethod === 'function') {
        this.loading = true
        this.remoteMethod(query, (res) => {
          this.loading = false
          this.options = res
        })
      }
    },

    // 后置按钮操作
    handleAppend () {
      if (typeof this.append.onclick === 'function') {
        this.append.onclick(this.itemval, val => {
          this.itemval = val
          this.$emit('input', val)
        })
      }
    },

    // 重置上传文件类型
    handleResetUploadFileType () {
      if (this.$refs.upload) {
        let uploadInner = this.$refs.upload.$refs['upload-inner']
        if (uploadInner) {
          let file = uploadInner.$refs.input
          if (file) {
            file.setAttribute('accept', 'image/png, image/jpeg')
          }
        }
      }
    },

    // 分割字符组成数组
    handleUploadSplitStringToArray (string) {
      !string && (string = '')
      let arr = []
      let list = string.length ? string.split(',') : []
      list.forEach(val => {
        let lIndex = val.lastIndexOf('/')
        let name = val.substring(lIndex + 1)
        arr.push({
          name: name,
          url: val
        })
      })
      return arr
    },

    // 上传前
    handleBeforeUpload (file) {
      let isJPG = (file.type === 'image/jpeg' || file.type === 'image/png')
      let isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG / PNG 格式!')
        return false
      }
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
        return false
      }
      this.loading = this.$loading({
        lock: true,
        text: 'upload',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
    },

    // 上传删除
    handleUploadRemove (file, fileList) {
      let url = file.url
      if (file.response) {
        let response = JSON.parse(file.response) || {}
        url = `${ resp._HttpPath }${ resp._savePath }`
      }

      // 接口删除
      let DelUrl = this.delete;
      // 若返回 false 或者返回 Promise 且被 reject，则停止删除
      return new Promise((resolve, reject) => {
        this.$axios.post(DelUrl, {
          FileAdress: url,
        }).then(resp => {
          let data = resp.data || {}
          typeof data === 'string' && (data = JSON.parse(data))
          this.$log.debug(data)
          if (data.ResultCode == 0) {
            // 删除成功
            // 判断值不为字符串的时候重置
            let value = !this.itemval ? '' : this.itemval
            // 判断值不为空的时候分割
            let list = value.length ? value.split(',') : []
            let newlist = list.filter(val => {
              return val != url
            })
            // 数组拼接字符串
            let urlStr = newlist.join(',')
            // 改变值
            this.changeValue(urlStr)
            resolve(data);
          } else {
            this.$message.error(data.Msg);
            reject(data)
          }
        })
        .catch((err) => {
          let res = err.response || {}

          // 获取接口失败 详情
          let request = res.request || {}
          let data = request.response || {}
          typeof data === 'string' && (data = JSON.parse(data))
          this.$log.debug('error message', data)
          if (typeof data === 'object') {
            this.$message.error(data.Message)
          } else {
            this.$message.error('网络连接失败，请求失败！')
          }
          reject(data)
        })
      })
    },

    // 点击文已上传文件
    handleUploadPreview (file) {
      this.$alert(`<img width="100%" src="${file.url}" />`, {
        dangerouslyUseHTMLString: true,
        showConfirmButton: false,
        closeOnClickModal: true,
        closeOnPressEscape: true
      }).then(res => {}).catch(er => {})
    },

    // 上传成功
    handleUploadSuccess (response, file, fileList) {
      this.loading.close()
      // 自助机上传接口
      let resp = JSON.parse(response);

      if (resp.ResultCode == 0) {
        // 新的上传地址列表
        let newlist = [`${ resp._HttpPath }${ resp._savePath }`]
        // 判断值不为字符串的时候重置
        let value = !this.itemval ? '' : this.itemval
        // 判断值不为空的时候分割
        let oldlist = value.length ? value.split(',') : []
        // 合并数组
        let list = oldlist.concat(newlist)
        // 数组拼接字符串
        let urlStr = list.join(',')
        // 改变值
        this.changeValue(urlStr)
      }
    },

    // 上传失败
    handleUploadError (err, file, fileList) {
      this.$log.debug(err, file, fileList)
      this.loading.close()
      this.$message.error('上传失败，请重新上传')
    }
  },

  watch: {
    // 监听数据变化  v-model=‘itemvall’
    // 当传入的 value 值发生变化 item 需重新赋值
    value (newVal /* oldVal */) {
      this.itemval = newVal
      // if (this.type === 'upload') {
      //   this.fileList = this.handleUploadSplitStringToArray(newVal);
      // }
    }
  }
}
</script>

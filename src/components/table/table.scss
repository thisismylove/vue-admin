<template>
  <div class="page transaction_wechat-page" ref="page">

    <evan-table
      ref="table"
      :data="tableItems"
      :col="col"
      :edit="edit"
      :page="page"
      :operation="operation"
      :defaultAction="defaultAction"
      @update-row="handleTableUpdate"
      @add-row="handleTableAddRow"
      @del-row="handleTableDelRow"
      @refresh="handleTableRefresh"
    >
      <el-form :inline="true" slot="appendTool" slot-scope="items" size="mini">
        <el-form-item :label="$t('field.searchDateTime')">
          <el-date-picker
            v-model="searchDateTime"
            value-format="yyyy-MM-dd HH:mm:ss"
            type="datetimerange"
            :range-separator="$t('field.defaultDateTimeRangeSeparator')"
            :start-placeholder="$t('field.defaultDateTimeStartPlaceholder')"
            :end-placeholder="$t('field.defaultDateTimeEndPlaceholder')"
            @change="handleQueryPageData"
          >
          </el-date-picker>
        </el-form-item>

        <!-- <el-form-item>
          <el-button type="success" @click="handleQueryPageData">{{ $t('field.search') }}</el-button>
        </el-form-item> -->
      </el-form>
    </evan-table>
  </div>
</template>

<script>
import Axios from '../../service/options'
export default {
  name: 'wechat',
  // 数据源
  data() {
    // 交易类型
    let Business = this.$store.state.businessTypes || [];
    Business.map(item => {
      item.text = this.$t(`field.${ item.label }`);
    });

    // 交易 tag 类型
    let Tags = this.$store.state.tags || [];

    return {
      // 查询日期
      searchDateTime: [
        this.$evan.getFormatDate(0, 'yyyy-MM-dd 00:00:00'),
        this.$evan.getFormatDate(0, 'yyyy-MM-dd 23:59:59'),
      ],
      tableItems: [],        // table 数据

      // 业务类型
      businessTypes: Business,

      urls: {
        query: '/Admin/QueryWeChatByTime',
      },

      col: [                       // 表头
        { key: 'ID', label: 'ID', sortable: true, isShow: true, minWidth: '80px', fixed: 'left', checkDisabled: true },
        { key: 'SerialNumber', label: 'serialNumber', sortable: true, isShow: true, minWidth: '240px' },
        { key: 'Time', label: 'transactionTime', sortable: true, isShow: true, minWidth: '120px',
          formatter: (row, col, val, index) => { return val.substring(0, 19).replace('T', ' '); }
        },
        { key: 'Success', label: 'transactionStatus', sortable: true, isShow: true, minWidth: '120px', align: 'center',
          filters: [{text: this.$t('field.success'), value: true}, {text: this.$t('field.failure'), value: false}],
          render: (h, val, row, index) => {
            return h(
              'el-button',{
              props: {
                type: val ? 'success' : 'danger',
                icon: val ? 'fa fa-check' : 'fa fa-times',
                circle: true,
              }, style: {
                width: '40px'
              }}, ''
            )
          }
        },
        { key: 'Business', label: 'businessType', sortable: true, isShow: true, minWidth: '120px', align: 'center',
          filters: Business,
          render: (h, val, row, index) => {
            let idx = Business.findIndex(item => item.value == val);
            let info = Business[idx];
            return (
              <el-tag effect="plain" type={ Tags[idx] }>{ this.$t(`field.${ info.label }`) }</el-tag>
            )
          }
        },
        { key: 'Retfund', label: 'refundStatus', sortable: true, isShow: true, minWidth: '120px', align: 'center',
          filters: [{text: this.$t('field.refunded'), value: true}, {text: this.$t('field.notRefund'), value: false}],
          render: (h, val, row, index) => {
            return h(
              'el-tag',{
              props: {
                type: !val ? 'success' : 'danger',
              }, }, val ? this.$t('field.refunded') : this.$t('field.notRefund')
            )
          }
        },
        { key: 'Amount', label: 'transactionAmount', sortable: true, isShow: true, minWidth: '110px', align: 'center', sum: true },
        { key: 'PatientInfo', label: 'patientName', sortable: true, isShow: true, minWidth: '130px',
          formatter: (row, col, val, index) => { return val.PatientName; }
        },
        { key: 'CardInfo', label: 'patientCardNo', sortable: true, isShow: true, minWidth: '150px', align: 'center',
          formatter: (row, col, val, index) => { return val.CardNo; }
        },
        { key: 'ZZJID', label: 'terminalID', sortable: true, isShow: true, minWidth: '100px', align: 'center' },
        { key: 'Remarks', label: 'transactionRemarks', isShow: true, minWidth: '80px', align: 'center',
          render: (h, val, row, index) => {
            return val ? (
              <el-tooltip placement="top">
                <div slot="content">{ val }</div>
                <el-button size="mini" type="text">{ this.$t('field.viewDetails') }</el-button>
              </el-tooltip>
            ) : (<span>-</span>)
          }
        },
      ],
      page: {                      // 分页信息
        textAlign: 'left',
      },

      operation: {                 // 操作按钮
        top: [
          (h, scope, rows) => {
            return (
              <el-button type="primary" size="small" onClick={ this.handleExportRows.bind(this, scope, rows) }>Excel</el-button>
            )
          }
        ],

        cell: [],

        style: {
          fixed: 'right',
          width: '280px',
          align: 'center',
        }
      },

      defaultAction: {             //  默认操作
        showSum: true,
        topRefresh: true,
        tableSelect: true,
        defaultSort_: {
          prop: 'ID',
          // order: 'descending',
          order: 'ascending',
        }
      },

			edit: {                      // 编辑表单
				form: {}
      },
    }
  },
  // 监听
  watch: {},
  // 创建前
  beforeCreate() {},
  // 创建完成
  created() {
    this.initData();
  },
  // 挂载前
  beforeMount() {},
  // 挂载完成
  mounted() {
    this.initPage();
  },
  // 方法集
  methods: {
    // 初始化数据
    initData() {
      //
    },

    // 初始化界面
    initPage() {
      this.handleQueryPageData();
    },

    // 查询界面数据
    handleQueryPageData() {
      let param = {
        DateTimeBetween: {
          StartTime: this.searchDateTime[0],                     // 开始查询时间  可为空
          EndTime: this.searchDateTime[1],                       // 结束查询时间   可为空
        }
      }
      Axios.post.call(this, this.urls.query, param).then(res => {
        this.tableItems = res.RechargeLog;
      }).catch(er => {
        this.$log.warn(er);
      })
    },

    // table 编辑
    handleTableUpdate(forms, scope) {
      this.$log.debug(forms, scope);
      let rowInfo = scope.row;
    },

    // 添加行数据
    handleTableAddRow(forms) {
      console.log(forms);
    },

    // 删除单行
    handleTableDelRow(scope) {
      console.log(scope);
    },

    // 导出
    handleExportRows(scope, rows) {
      console.log(scope, rows);
      let tableItems = this.tableItems;
      rows.length && (tableItems = rows);

      if (tableItems.length == 0) return;

      // 交易类型
      let businessTypes = this.businessTypes || [];

      //excel数据导出
      require.ensure([], () => {
        let {
            export_json_to_excel
        } = require('../../assets/js/Export2Excel');
        let tHeader = ['序号', 'ZZJ流水号', 'HIS流水号', '交易时间', '交易状态', '业务类型', '退款状态', '交易金额', '姓名', '卡号', '终端ID', '备注'];
        let filterVal = ['ID', 'SerialNumber', 'hisSerial', 'dateTime', 'Success', 'businessType', 'Retfund', 'Amount', 'PatientName', 'CardNo', 'ZZJID', 'Remarks'];

        let list = tableItems.filter(item => {
          let idx = businessTypes.findIndex(it => it.value == item.Business);
          let info = businessTypes[idx] || {};

          // if (!item.Retfund) {
            item.PatientName = item.PatientInfo.PatientName;
            item.CardNo = item.CardInfo.CardNo;
            item.dateTime = item.Time.substring(0, 19).replace('T', ' ');
            item.hisSerial = item.TransactionInfo.TransactionSerialNumber;
            item.businessType = info.text;
            return item;
          // }
        });
        let data = this.formatJson(filterVal, list);
        export_json_to_excel(tHeader, data, '自助机-微信明细');
      })
    },

    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]))
    },

    // 刷新
    handleTableRefresh() {
      this.handleQueryPageData();
    },
  },
  // 更新前
  beforeUpdate() {},
  // 更新完成
  updated() {},
  // 销毁前
  beforeDestroy() {},
  // 销毁完成
  destroyed() {},
  // 注册指令
  directives: {
    focus: {
      // 指令的定义
      inserted: function (el) {
        // 聚焦元素
        el.querySelector('input').focus()
      }
    }
  },
}
</script>

<style>

</style>

<template>
  <div class="table-box">
    <div class="table-list">
      <el-table ref="tableList" height="100%" @selection-change="handleSelectionChange" @select="HandleSelect" :data="tableList"
        style="width: 100%">
        <el-table-column type="selection" fixed="left"></el-table-column>
        <el-table-column v-for="(item, index) in tableConfig" :key="index" :align="item.align" :prop="item.prop"
          :label="item.label" :width="item.width || ''" :min-width="item.minWidth">
          <!-- 如需插槽在此处扩展 -->
          <template slot-scope="scope">
            <div v-if="item.slot">
              <slot :name="item.slot" :row="scope.row" :_index="scope.$index" :prop="item.prop"></slot>
            </div>
            <div v-else>{{ scope.row[item.prop] }}</div>
          </template>
        </el-table-column>
        <!-- 编辑 -->
        <el-table-column v-if="operateType === 'edit'" fixed="right" :label="operateText" :width="operateWidth">
          <template slot-scope="scope">
            <i class="icon-operate el-icon-edit-outline" @click="editHandle(scope)"></i>
          </template>
        </el-table-column>
        <!-- 再下面扩展其他的操作按钮 -->
      </el-table>
    </div>
    <div class="page-box">
      <PaginationCustom :current-page="pageIndex" :page-size="pageSize" :total="total" @size-change="changeSize"
        @current-change="currentChange" />
    </div>
  </div>
</template>

<script>
import PaginationCustom from '@/components/element-custom/Pagination.vue';

export default {
  name: 'TableList',
  components: {
    PaginationCustom,
  },
  props: {
    tableList: {
      type: Array,
      default: () => [],
    },
    tableConfig: {
      type: Array,
      default: () => [],
    },
    operateType: {
      type: String,
      default: '',
    },
    operateText: {
      type: String,
      default: '详情',
    },
    operateWidth: {
      type: Number,
      default: 120,
    },
    pageIndex: {
      type: Number,
      default: 1,
    },
    pageSize: {
      type: Number,
      default: 10,
    },
    total: {
      type: Number,
      default: 0,
    },

  },
  data() {
    return {
      form: {},
      multipleSelection: [],
      unSelection: []
    };
  },
  created() {
    // this.getData();
  },
  mounted() {
  },
  methods: {
    /**
     * 编辑
     */
    editHandle(e) {
      const params = {
        index: e.$index,
        row: e.row,
      }
      console.log(params, 'this is eee')
      this.$emit('on-edit', params);
    },
    /**
     * 改变分页页码
     * @param {*} e
     */
    currentChange(e) {
      // const params = {
      //   pageIndex: e,
      //   pageSize: this.pageSize,
      // }
      this.$emit('on-page', e, this.pageSize);
    },
    /**
     * 改变分页页数
     * @param {*} e
     */
    changeSize(e) {
      // const params = {
      //   pageIndex: this.pageIndex,
      //   pageSize: e,
      // }
      this.$emit('on-page', this.pageIndex, e);
    },
    /**
     * 选择框事件
     */
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    HandleSelect(val, row) {
      let indexUn = this.unSelection.findIndex(ele => {
        return ele.equipNo === row.equipNo
      })
      let indexIn = val.findIndex(ele => {
        return ele.equipNo === row.equipNo
      })
      if (indexIn > -1) {
        if (indexUn > -1) {
          this.unSelection.splice(indexUn, 1)
        }
      } else {
        if (indexUn < 0) {
          this.unSelection.push(row)
        }
      }
      // debugger
      // return row
    },
    /**
     * 反选
     */
    toggleAllSelection() {
      this.$refs.tableList.toggleAllSelection()
    },
    /**
     * 获取选择的数据
     */
    getSelection() {
      return this.multipleSelection
    },
    /**
     * 获取选择的数据
     */
    getUnSelection() {
      return this.unSelection
    },
    /**
     * 清空未选择数据
     */
    clearUnSelection() {
      this.unSelection = []
    },
  },
};
</script>

<style lang="scss" scoped>
.table-box {
  display: flex;
  width: 100%;
  height: 100%;
  flex-direction: column;

  .table-list {
    width: 100%;
    flex: 1;
    display: flex;
    align-items: center;

    .icon-operate {
      cursor: pointer;
    }
  }

  .page-box {
    height: 60px;
  }
}
</style>

<template>
  <div class="filter-form">
    <div class="filter-form-item" v-for="(item, index) in formConfig" :key="index">
      <slot v-if="item.slot" :name="item.slot"></slot>
      <!-- 携带optionlist 的select -->
      <el-select
        v-else-if="item.type === 'select' && item.list"
        v-model="form[item.key]"
        :placeholder="item.title"
      >
        <el-option
          v-for="(item1, index) in item.list"
          :key="index"
          :label="item1.label"
          :value="item1.value"
        ></el-option>
      </el-select>
      <!-- 请求接口的 select -->
      <el-select
        v-else-if="item.type === 'select' && item.selectApi"
        v-model="form[item.key]"
        :placeholder="item.title"
        filterable
        remote
        reserve-keyword
        :remote-method="(query) => remoteMethod(query, item)"
        :loading="loading"
      >
        <el-option
          v-for="(item1, index) in selectObj[item.key]"
          :key="index"
          :label="item1[item.label]"
          :value="item1[item.value]"
        ></el-option>
      </el-select>
      <!-- 扩展级联插件 -->
      <el-cascader
        v-else-if="item.type === 'selectTree'"
        v-model="form[item.key]"
        :options="OrgCommpanyList"
        :props="{ label: 'name', value: 'name', children: 'child', multiple: item.multiple }"
      >
      </el-cascader>
      <el-cascader
        v-else-if="item.type === 'selectTreePlant'"
        v-model="form[item.key]"
        :options="OrgPlantList"
        :props="{ label: 'name', value: 'name', children: 'child', multiple: item.multiple }"
      >
      </el-cascader>
      <el-input
        v-else-if="item.type === 'search'"
        prefix-icon="el-icon-search"
        v-model="form[item.key]"
        placeholder="请输入关键词"
      >
        <el-button slot="append" @click="searchHandle">搜索</el-button>
      </el-input>
    </div>
    <div class="total" v-if="total || total === 0">设备查询结果：{{ total }}</div>
  </div>
</template>

<script>
// import { debounceForInput } from '@/utils';
import { aPGetOrgCommpanyTree, aPGetOrgPlantTree } from '@/api/common/index';

export default {
  name: 'FilterForm',
  model: {
    prop: 'value',
    event: 'on-confirm',
  },
  props: {
    value: {
      type: Object,
      default: () => {},
    },
    total: {
      type: [Number, String],
      default: '',
    },
    formConfig: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      form: {},
      selectObj: {},
      OrgCommpanyList: [],
      OrgPlantList: [],
      loading: false
    };
  },
  watch: {
    // value: {
    //   handle(newval) {
    //     console.log(newval, 'this isssee')
    //     // this.form = Object.assign({}, newval)
    //   },
    //   immediate: true
    // }
  },
  created() {
    // this.getData();
  },
  mounted() {
    this.form = Object.assign({}, this.value);
    this.formConfig.forEach((ele) => {
      // console.log(ele.key, 'this is ')
      if (ele.type === 'selectTree') {
        this.getOrgCommpanyList();
      }
      if (ele.type === 'selectTreePlant') {
        this.getOrgPlantList();
      }
      if (ele.selectApi) {
        this.getSelectList(ele);
      }
    });
  },
  methods: {
    remoteMethod(query, item) {
      // item.pageSize = item.pageSize ? item.pageSize += 20 : 20
      this.getSelectList(item, query)
      // console.log(query, 'this is eee', item)
    },
    /**
     * 获取单位-公司数据
     */
    getOrgCommpanyList() {
      aPGetOrgCommpanyTree().then((res) => {
        // if (!sessionStorage.getItem('orgData')) {
        //   sessionStorage.setItem('orgData', JSON.stringify(res.data))
        // }
        this.OrgCommpanyList = res.data;
      });
    },
    /**
     * 获取单位-工厂数据
     */
    getOrgPlantList() {
      aPGetOrgPlantTree().then((res) => {
        // if (!sessionStorage.getItem('orgData')) {
        //   sessionStorage.setItem('orgData', JSON.stringify(res.data))
        // }
        this.OrgPlantList = res.data;
      });
    },
    /**
     * 根据selectApi获取下拉框数据
     */
    getSelectList(ele, query = '') {
      // console.log(typeof ele.selectApi, 'tttttt')
      if (typeof ele.selectApi === 'function') {
        ele
          .selectApi({
            pageIndex: 1,
            pageSize: ele.pageSize || 40,
            keyWord: query
          })
          .then((res) => {
            const { data } = res.data;
            this.$set(this.selectObj, ele.key, data || []);
          });
      }
    },
    /**
     * 搜索按钮
     */
    searchHandle() {
      this.$emit('on-confirm', this.form);
    },
  },
};
</script>

<style lang="scss" scoped>
.filter-form {
  display: flex;
  align-items: center;

  .filter-form-item {
    margin-right: 10px;

    &:last-of-type {
      margin-right: 0;
    }
  }

  .total {
    margin-left: 10px;
  }
}
</style>

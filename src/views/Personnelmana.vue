<template>
  <div class="animated fadeIn">
    <div class="row">
      <div class="col-lg-12">
        <div class="card">
          <div class="card-header">
            <i class="fa fa-align-justify"></i> Striped Table
            <div @click="sortGoods" style="float: right;"><span style="padding-right: 10px;">Price</span><i class="fa fa-arrow-up fa-lg mt-4" v-bind:class="{'fa-arrow-down':!sortFlag}"></i></div>
          </div>
          <div class="card-block">
            <table class="table table-striped">
              <thead>
              <tr>
                <th>productId</th>
                <th>productName</th>
                <th>salePrice</th>
                <th>Status</th>
              </tr>
              </thead>
              <tbody v-for="(item,index) in goodsList">
              <tr>
                <td>{{item.productId}}</td>
                <td>{{item.productName}}</td>
                <td>{{item.salePrice}}</td>
                <td>
                  <span class="badge badge-success">Active</span>
                </td>
              </tr>
              </tbody>
            </table>
            <pagination :totalPage="parentTotalPage" :currentPage="parentCurrentpage" :changeCallback="parentCallback"></pagination>
          </div>
        </div>
      </div><!--/.col-->
    </div><!--/.row-->
  </div>
</template>

<script>
  import Pagination from './components/Pagination.vue'
  import axios from 'axios'
export default {
    name: 'personnelmana',
    data () {
      return {
        goodsList: [],
        pageSize: 8,
        sortFlag: true,
        // 在data中初始化总页数totalPage，和当前页currentPage
        parentTotalPage: 100,
        parentCurrentpage: 1
      }
    },
    mounted: function () {
      this.parentCallback(1)
    },
    methods: {
      sortGoods () {
        this.sortFlag = !this.sortFlag
        this.parentCurrentpage = 1
        this.parentCallback(1)
      },
      // 在这里传入pagination的跳转页码回调方法
      // cPage参数是已跳转的当前页码
      parentCallback (cPage) {
        // 这里是页码变化后要做的事
        var param = {
          page: cPage,
          pageSize: this.pageSize,
          sort: this.sortFlag ? 1 : -1,
          priceLevel: 0
        }
        axios.get('/goods', {params: param}).then((result) => {
          var res = result.data
          // this.parentTotalPage = parseInt(res.result.list.length / this.pageSize) + 1
          this.goodsList = res.result.list
        })
      }
    },
    components: {
      Pagination
    }
}
</script>

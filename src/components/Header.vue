<template>
  <navbar>
    <button class="navbar-toggler mobile-sidebar-toggler d-lg-none" type="button" @click="mobileSidebarToggle">&#9776;</button>
    <a class="navbar-brand" href="#">你可居</a>
    <ul class="nav navbar-nav d-md-down-none">
      <li class="nav-item">
        <a class="nav-link navbar-toggler sidebar-toggler" href="#" @click="sidebarMinimize">&#9776;</a>
      </li>
      <li class="nav-item px-3">
        <a class="nav-link" href="#" style="font-size: 18px;">门店微信支付管理系统</a>
      </li>
    </ul>
    <ul class="nav navbar-nav ml-auto" style="padding-right: 20px;">
      <li class="nav-item d-md-down-none">
        <a class="nav-link" href="#"><i class="icon-bell"></i><span class="badge badge-pill badge-danger">5</span></a>
      </li>
      <dropdown size="nav" class="nav-item">
        <span slot="button">
          <span class="d-md-down-none" v-text="nickName"></span>
        </span>
        <div slot="dropdown-menu"class="dropdown-menu dropdown-menu-right">
          <a class="dropdown-item" href="#"><i class="fa fa-shield"></i> 个人信息</a>
          <a class="dropdown-item" href="#" @click="logout"><i class="fa fa-lock"></i> 退出登录</a>
        </div>
      </dropdown>
    </ul>
  </navbar>




</template>
<script>

import navbar from './Navbar'
import { dropdown } from 'vue-strap'
import axios from 'axios'

export default {
  name: 'header',
  components: {
    navbar,
    dropdown
  },
  data () {
    return {
      nickName: ''
    }
  },
  mounted: function () {
    this.checkLogin()
  },
  methods: {
    click () {
      // do nothing
    },
    sidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-hidden')
    },
    sidebarMinimize (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-minimized')
    },
    mobileSidebarToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('sidebar-mobile-show')
    },
    asideToggle (e) {
      e.preventDefault()
      document.body.classList.toggle('aside-menu-hidden')
    },
    checkLogin () {
      axios.get('/users/checkLogin').then(response => {
        let res = response.data
        if (res.status === '0') {
          this.nickName = res.result
        } else {
          this.$router.push('/pages/login')
        }
      }).catch(function (error) {
        console.log(error)
      })
    },
    logout () {
      axios.post('/users/logout').then(response => {
        let res = response.data
        if (res.status === '0') {
          this.$router.push('/pages/login')
        } else {
        }
      }).catch(function (error) {
        console.log(error)
      })
    }
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .app-header.navbar .nav-item{
    padding-right: 50px;
  }
  .app-header.navbar .nav-item .nav-link .badge, .app-header.navbar .nav-item .dropdown-toggle .badge{
    left: 28%;
  }
</style>

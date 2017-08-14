<template>
  <div class="app flex-row align-items-center">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8">
          <div class="card-group mb-0">
            <validator name="test_validator">
            <div class="card p-4">
              <div class="card-block">
                <h1>Login</h1>
                <p class="text-muted">Sign In to your account</p>
                <div class="input-group mb-3">
                  <span class="input-group-addon"><i class="icon-user"></i></span>
                  <input type="text" class="form-control" placeholder="Username" v-model="userName" v-validataion="{val:userName,reg:'^1\\d{10}$',toptips:'必须为1开头且为数字的11位数'}">
                </div>
                <div class="input-group mb-4">
                  <span class="input-group-addon"><i class="icon-lock"></i></span>
                  <input type="password" class="form-control" placeholder="Password" v-model="userPwd">
                </div>
                <div class="row">
                  <div class="col-6">
                    <button type="button" class="btn btn-primary px-4" @click="login">Login</button>
                  </div>
                  <div class="col-6 text-right">
                    <button type="button" class="btn btn-link px-0">Forgot password?</button>
                  </div>
                </div>
              </div>
            </div>
            </validator>
            <div class="card card-inverse card-primary py-5 d-md-down-none" style="width:44%">
              <div class="card-block text-center">
                <div>
                  <h2>Sign up</h2>
                  <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                  <button type="button" class="btn btn-primary active mt-3">Register Now!</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <modal title="Modal title" class="modal-info" v-model="infoModal" @ok="infoModal = false" effect="fade/zoom">
      <div slot="modal-header" class="modal-header">
        <h4 class="modal-title">Modal title</h4>
      </div>
      Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
      tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
      quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
      consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse
      cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
      proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
    </modal>
  </div>
</template>
<script>
  import modal from 'vue-strap/src/Modal'
  import axios from 'axios'
export default {
    name: 'Login',
    components: {
      modal
    },
    data () {
      return {
        infoModal: false,
        userName: '',
        userPwd: ''
      }
    },
    mounted: function () {
      this.checkLogin()
    },
    methods: {
      checkLogin () {
        axios.get('/users/checkLogin').then(response => {
          let res = response.data
          if (res.status === '0') {
            this.$router.push('/Dashboard')
          } else {
          }
        }).catch(function (error) {
          console.log(error)
        })
      },
      login () {
        if (!this.userName || !this.userPwd) {
          return
        }
        axios.post('/users/login', {
          userName: this.userName,
          userPwd: this.userPwd
        }).then(response => {
          let res = response.data
          if (res.status === '0') {
            this.$router.push('/Dashboard')
          } else {
            this.infoModal = true
          }
        }).catch(function (error) {
          console.log(error)
        })
      }
    }
}
</script>

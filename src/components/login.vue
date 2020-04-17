<template>
  <div class="loginArea">
    <Tabs value="name1">
      <TabPane label="登录" name="name1">

        <Form ref="LoginVO" :model="LoginVO" :rules="ruleInline">
          <FormItem prop="username">
            <Input type="text" v-model="LoginVO.username" size="large" placeholder="Username"
                   style="width: 300px;margin-left: 75px;margin-top: 30px">
              <Icon type="md-person" size="25" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="LoginVO.password" size="large" placeholder="Password"
                   style="width: 300px;margin-left: 75px">
              <Icon type="md-lock" size="25" slot="prepend"></Icon>
            </Input>

          </FormItem>
          <a class="resetPW">forget password?</a>
          <div style="margin-top: 10px;padding-bottom: 10px;">
            <Button type="primary" @click="handleSubmit('LoginVO')" style="margin-left: 200px">Signin</Button>
          </div>
          <div class="thirdLogin">
            <span style="margin-left: 75px">使用第三方账号登录</span>
            <div style="background-image: url('../../static/img/QQ.jpeg');margin-left: 75px" class="otherIcon"></div>
            <div style="background-image: url('../../static/img/wx.png');margin-left: 15px " class="otherIcon"></div>
          </div>
        </Form>
      </TabPane>
      <TabPane label="注册" name="name2">
        <Form ref="registerVO" :model="registerVO" :rules="ruleInline">
          <FormItem prop="username">
            <Input type="text" v-model="registerVO.username" size="large" placeholder="Username"
                   style="width: 300px;margin-left: 75px;">
              <Icon type="md-person" size="25" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="registerVO.password" size="large" placeholder="Password"
                   style="width: 300px;margin-left: 75px">
              <Icon type="md-lock" size="25" slot="prepend"></Icon>
            </Input>

          </FormItem>
          <FormItem prop="telephone">
            <Input type="text" v-model="registerVO.telephone" size="large" placeholder="telephone"
                   style="width: 300px;margin-left: 75px;" maxlength="11">
              <Icon type="md-phone-portrait" size="25" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="valCode">
            <Input type="text" v-model="registerVO.valCode" size="large" placeholder="valcode"
                   style="width: 300px;margin-left: 75px" maxlength="6">
              <Icon type="md-text" size="25" slot="prepend"></Icon>
              <Button slot="append" v-text="valBtn" @click="sendValCode" ref="valBtn"></Button>
            </Input>
            <div v-show="!registerDis" class="ivu-form-item-error-tip">验证码不正确</div>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="registerSubmit('registerVO')" style="margin-left: 200px" ref="registerBtn"
                    :disabled="registerDis">Register
            </Button>
          </FormItem>
        </Form>

      </TabPane>
    </Tabs>
  </div>
</template>
<script>
    export default {
        data() {
            return {
                registerVO: {
                    username: '',
                    password: '',
                    telephone: '',
                    valCode: ''
                },
                LoginVO: {
                    username: '',
                    password: ''
                },
                ruleInline: {
                    username: [
                        {required: true, message: 'Please fill in the user name', trigger: 'blur'}
                    ],
                    password: [
                        {required: true, message: 'Please fill in the password.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 6,
                            message: 'The password length cannot be less than 6 bits',
                            trigger: 'blur'
                        }
                    ],
                    telephone: [
                        {required: true, message: 'Please fill in the telephone.', trigger: 'blur'},
                        {
                            type: 'string',
                            min: 11,
                            message: 'The telephone length cannot be less than 11 bits',
                            trigger: 'blur'
                        }
                    ],
                },
                //根据是否已经发送验证码判断是否开放注册按钮
                registerDis: true,
                valBtn: '获取验证码',
                //验证码倒计时
                valTime: 20
            }
        },
        methods: {
            handleSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$Message.success('Success!');
                    } else {
                        this.$Message.error('Fail!');
                    }
                })
            },
            registerSubmit(name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$axios.get("http://localhost:4000/user-service/user/existsUser", {
                            params: {
                                telephone: this.registerVO.telephone
                            }
                        }).then(resp => {
                            if (resp.data.responseData) {
                                this.$Message.success("当前手机号已注册，请直接登录");
                            } else {
                                this.$Message.success("注册成功");
                            }
                        }).catch();
                    }
                })
            },
            sendValCode(e) {

                //校验输入的手机号是否合规
                this.$refs['registerVO'].validateField('telephone', teleError => {
                    if (teleError) {
                    } else {
                        this.$axios.get("http://localhost:4000/user-service/user/existsUser", {
                            params: {telephone: this.registerVO.telephone}
                        }).then(resp => {
                            console.log(resp);
                            if (resp.data.responseData) {
                                this.$Message.success("当前手机号已注册，请直接登录");
                            } else {
                                //判断已经发送了验证码，开放注册按钮
                                this.registerDis = false;
                                // console.log(this.getValCode());
                                //云之迅平台一条短信耗费0.055元巨资，请谨慎使用该功能
                                // let info = {
                                //     sid: "3150e6387503799fe24cf78a7aa3ae66",
                                //     token: "b48242a359b5279c47ec7335d4b77bbc",
                                //     appid: "ae5351f175d4459ebce6cf97bc4ce9fa",
                                //     templateid: "445930",
                                //     param: "123456,60",
                                //     mobile: "18559179737",
                                //     uid: "2d92c6132139467b989d087c84a365d8"
                                // };
                                // this.$axios.post('/api', info).then(resp => {
                                //     console.log(resp)
                                // }).catch(error => {
                                //     this.$Message.error("短信发送出问题了快去检查一下")
                                //     console.log(error)
                                // })
                                let clock;
                                let valBtn = this.$refs['valBtn'];
                                this.data().valTime = this.$cookies.get("valTime");
                                valBtn.disabled = true;
                                valBtn.innerText = this.data().valTime + '秒后重发';
                                clock = setInterval(function () {
                                    this.data().valTime--;
                                    if (this.data().valTime > 0) {
                                        valBtn.innerText = this.data().valTime + '秒后重发';
                                        this.$cookies.set("valTime", this.data().valTime);
                                    } else {
                                        this.$cookies.remove("valTime");
                                        //清除js定时器
                                        clearInterval(clock);
                                        valBtn.disabled = false;
                                        valBtn.innerText = '重新发送';
                                        //重置时间
                                        this.data().valTime = 20;
                                    }
                                }, 1000);
                            }
                        }).catch(err => {
                            console.log(err);
                            this.$Message.error("服务出问题了还不快去修!");
                        });
                    }
                });
            },
            //获取6位数随机验证码，并保存在后台redis中
            getValCode() {
                this.$axios.get("http://localhost:4000/user-service/user/getValCode", {
                    params: {
                        telephone: this.telephone
                    }
                }).then(resp => {
                    return resp.data.responseData;
                }).catch(error => {
                    console.log(error)
                })
            }
        },
        mounted() {
            let clock;
            let valBtn = this.$refs['valBtn'];
            if (this.$cookies.isKey("valTime")) {
                this.data().valTime = this.$cookies.get("valTime");
                valBtn.disabled = true;
                valBtn.innerText = this.data().valTime + '秒后重发';
                clock = setInterval(function () {
                    this.data().valTime--;
                    if (this.data().valTime > 0) {
                        valBtn.innerText = this.data().valTime + '秒后重发';
                        this.$cookies.set("valTime", this.data().valTime);
                    } else {
                        this.$cookies.remove("valTime");
                        //清除js定时器
                        clearInterval(clock);
                        valBtn.disabled = false;
                        valBtn.innerText = '重新发送';
                        //重置时间
                        this.data().valTime = 20;
                    }
                }, 1000);
            }
            //将按钮置为不可点击


            console.log(1)
        }
    }
</script>
<style>
  .loginArea {
    width: 450px;
    height: 375px;
    border: solid 1px gray;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 20px;
    background-color: #f5f7f9;
  }

  .ivu-tabs-nav {
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
  }

  .ivu-tabs-ink-bar {
    width: 50%;
  }

  .ivu-form-item-error-tip {
    margin-left: 75px;
  }

  .resetPW {
    margin-left: 270px;
  }

  .thirdLogin {
    display: flex;
    /*justify-content: space-between;*/
    height: 30px;
    line-height: 30px;
  }

  .otherIcon {
    background-repeat: no-repeat;
    background-size: 100% 100%;
    -moz-background-size: 100% 100%;
    width: 30px;
    height: 30px;
    cursor: pointer;
  }
</style>

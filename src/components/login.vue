<template>
  <div class="loginArea">
    <Tabs value="name1">
      <TabPane label="登录" name="name1">

        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" size="large" placeholder="Username"
                   style="width: 300px;margin-left: 75px;margin-top: 30px">
              <Icon type="md-person" size="25" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" size="large" placeholder="Password"
                   style="width: 300px;margin-left: 75px">
              <Icon type="md-lock" size="25" slot="prepend"></Icon>
            </Input>

          </FormItem>
          <a class="resetPW">forget password?</a>
          <div style="margin-top: 10px;padding-bottom: 10px;">
            <Button type="primary" @click="handleSubmit('formInline')" style="margin-left: 200px">Signin</Button>
          </div>
          <div class="thirdLogin">
            <span style="margin-left: 75px">使用第三方账号登录</span>
            <div style="background-image: url('../../static/img/QQ.jpeg');margin-left: 75px" class="otherIcon"></div>
            <div style="background-image: url('../../static/img/wx.png');margin-left: 15px " class="otherIcon"></div>
          </div>
        </Form>
      </TabPane>
      <TabPane label="注册" name="name2">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" size="large" placeholder="telephone"
                   style="width: 300px;margin-left: 75px;margin-top: 30px">
              <Icon type="md-phone-portrait" size="25" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" size="large" placeholder="Password"
                   style="width: 300px;margin-left: 75px">
              <Icon type="md-text" size="25" slot="prepend"></Icon>
              <Button slot="append" v-text="valCode" @click="sendValCode"></Button>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')" style="margin-left: 200px;margin-top: 40px">Signin</Button>
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
                formInline: {
                    user: '',
                    password: ''
                },
                ruleInline: {
                    user: [
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
                            message: 'The password length cannot be less than 11 bits',
                            trigger: 'blur'
                        }
                    ]
                },
                valCode:'获取验证码'
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
            sendValCode(e){
                let nums = 3;
                let clock;
                //将按钮置为不可点击
                e.target.disabled = true;
                e.target.innerText = nums + '秒后重发';
                 clock = setInterval(function() {
                    nums--;
                    if(nums > 0) {
                        e.target.innerText = nums + '秒后重发';
                    } else {
                        //清除js定时器
                        clearInterval(clock);
                        e.target.disabled = false;
                        e.target.innerText = '重新发送';
                        //重置时间
                        nums = 3;
                    }
                }, 1000);
            }
        }
    }
</script>
<style>
  .loginArea {
    width: 450px;
    height: 350px;
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

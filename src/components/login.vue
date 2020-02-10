<template>
  <div class="loginArea">
    <Tabs value="name1">
      <TabPane label="登录" name="name1">

        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" size="large" placeholder="Username" style="width: 300px;margin-left: 75px;margin-top: 30px">
              <Icon type="md-person" size="25" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" size="large" placeholder="Password" style="width: 300px;margin-left: 75px">
              <Icon type="md-lock" size="25" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
          </FormItem>
        </Form>
      </TabPane>
      <TabPane label="注册" name="name2">
        <Form ref="formInline" :model="formInline" :rules="ruleInline">
          <FormItem prop="user">
            <Input type="text" v-model="formInline.user" size="large" placeholder="telephone" style="width: 300px;margin-left: 75px;margin-top: 30px">
              <Icon type="md-phone-portrait" size="25" slot="prepend"></Icon>

            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="formInline.password" size="large" placeholder="Password" style="width: 300px;margin-left: 75px">
              <Icon type="md-text" size="25" slot="prepend"></Icon>
              <Button slot="append">获取验证码</Button>
            </Input>
          </FormItem>
          <FormItem>
            <Button type="primary" @click="handleSubmit('formInline')">Signin</Button>
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
                    ]
                }
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
            }
        }
    }
</script>
<style>
  .loginArea {
    text-align: center;
    width: 450px;
    height: 300px;
    border: solid 1px gray;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius:20px;
    /*background-color: #f5f7f9;*/
  }
  .ivu-tabs-nav {
    left: 50%;
    transform: translateX(-50%);
    font-size: 20px;
  }
  .ivu-tabs-ink-bar{
    width: 50%;
  }
</style>

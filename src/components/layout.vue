<style scoped>
    .layout{
        border: 1px solid #d7dde4;
        background: #f5f7f9;
        position: relative;
        border-radius: 4px;
        overflow: hidden;
    }
    .layout-header-bar{
        background: #fff;
        box-shadow: 0 1px 1px rgba(0,0,0,.1);
    }
</style>
<template>
    <div class="layout">
        <Sider :style="{position: 'fixed', height: '100vh', left: 0, overflow: 'auto'}">
            <Menu active-name="1-2" theme="dark" width="auto" :open-names="['1']">
                <Submenu name="1" ref="main_title" >
                    <template slot="title"  >
                        <Icon type="ios-navigate" ref="maintitle"></Icon>
                        {{main_title1}}
                    </template>
                    <MenuItem name="1-1" @click.native="bindclick" id="test1" >{{ msg1 }}</MenuItem>
                    <MenuItem name="1-2">Option 2</MenuItem>
                    <MenuItem name="1-3">Option 3</MenuItem>
                </Submenu>
                <Submenu name="2">
                    <template slot="title">
                        <Icon type="ios-keypad"></Icon>
                        Item 2
                    </template>
                    <MenuItem name="2-1">Option 1</MenuItem>
                    <MenuItem name="2-2">Option 2</MenuItem>
                </Submenu>
                <Submenu name="3">
                    <template slot="title">
                        <Icon type="ios-analytics"></Icon>
                        Item 3
                    </template>
                    <MenuItem name="3-1">Option 1</MenuItem>
                    <MenuItem name="3-2">Option 2</MenuItem>
                </Submenu>
            </Menu>
        </Sider>
        <Layout :style="{marginLeft: '200px'}">
            <Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>
            <Content :style="{padding: '0 16px 16px'}">
                <Breadcrumb :style="{margin: '16px 0'}" >
                    <BreadcrumbItem  >home</BreadcrumbItem>
                    <BreadcrumbItem>Components</BreadcrumbItem>
                    <BreadcrumbItem>Layout</BreadcrumbItem>
                </Breadcrumb>
                <Card>
                    <div style="height: 600px"  >Content {{msg}} </div>
                </Card>
            </Content>
        </Layout>
    </div>
</template>
<script>
    export default {
        props:{
            msg:{
                  default:'111'
            },
            main_title1:{
                  default:'123'
            }
        },
        methods:{
            bindclick: function () {
                console.log(this.msg);
                this.$axios.get('http://localhost:8081/getPath', {
　　params: { 'path': 'D:\\data\\db' }
})
          .then(resp => {
            this.msg = resp.data;
          }).catch(err => {
            console.log(err);
          })
            }
        }

    }
</script>

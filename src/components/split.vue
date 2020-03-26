<template>
  <div class="demo-split">
    <Split v-model="split1" mode="vertical">
      <div slot="top" class="demo-split-pane">
        <Row>
          <div>
            <input v-model="path" class="searchInput" @keyup.enter="searchClick" style="font-size: 16px"/>
            <Icon type="md-search" @click="searchClick" class="searchBtn" size="30"/>
            <Icon type="md-arrow-round-back" @click="backClick" size="30" class="backBtn"/>
            <Icon type="md-add" size="30" @click="showModal" style="cursor: pointer"/>
            <Modal
              v-model="modal1"
              title="在该路径下新建文件夹"
              @on-ok="addFold"
            >
              <p><span>文件夹名：</span><input v-model="newFoldName"></input>
              </p>
            </Modal>
          </div>
          <div>
            <p v-for="(foldName,i) in foldList" v-bind:key="i">
              <Col id="foldName" span="8" style="font-size:16px">
                <div id="fold">
                  <Icon type="md-folder" size="20" class="fold" @click="foldClick"/>
                  <span v-text="foldName" class="fold" @click="foldClick"></span>
                </div>
              </Col>
            </p>
          </div>
          <div>
            <p v-for="(fileName,j) in fileList" v-bind:key="j">
              <Col id="fileName" span="8" style="font-size:16px">
                <div>
                  <Icon type="ios-paper" size="20" class="file" @click="fileClick"/>
                  <span v-text="fileName" class="file" @click="fileClick"> </span>
                </div>
              </Col>
            </p>
          </div>

        </Row>
      </div>
      //支持多文件上传，但是该组件其实是分批次调用action的
      <div slot="bottom" class="demo-split-pane">
        <Upload
          multiple
          type="drag"
          action="http://localhost:4000/fileupload/file/uploadFile"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          :data=dataObject
        >
          <div style="padding: 20px 0">
            <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
            <p>Click or drag files here to upload</p>
          </div>
        </Upload>
      </div>
    </Split>
  </div>
</template>
<script>
    import {Message} from 'iview';
    import "../style/spilt.css";
    //用于记录当前文件路径，防止输入框路径更变的情况
    let pathName = "D:\\";
    export default {
        data() {
            return {
                split1: 0.5,
                foldList: [],
                fileList: [],
                path: "D:\\",
                modal1: false,
                foldName: '',
                fileName: '',
                newFoldName: '新建文件夹',
                buttonSize: 'small',
                dataObject: {
                    path: pathName
                }
            };
        },
        methods: {
            searchClick() {
                this.dataObject.path = pathName = this.path;
                this.$axios
                    .get("http://localhost:4000/fileupload/file/getPath", {
                        params: {path: pathName}
                    })
                    .then(resp => {
                        pathName = this.path;
                        this.foldList = resp.data.foldList;
                        this.fileList = resp.data.fileList;
                    })
                    .catch(err => {
                        Message.error({
                            content: ' <Alert type="error" show-icon>' +
                                '当前路径非法' +
                                '    </Alert>',
                            duration: 3,
                            closable: true,
                            top: 500,
                        });
                        console.log(err);
                    });
            }, foldClick(e) {
                this.$axios
                    .get("http://localhost:4000/fileupload/file/getPath", {
                        params: {path: pathName + "\\" + e.target.innerText}
                    })
                    .then(resp => {
                        pathName = pathName + "\\" + e.target.innerText;
                        this.dataObject.path = this.path = pathName + "\\";
                        this.foldList = resp.data.foldList;
                        this.fileList = resp.data.fileList;
                    })
                    .catch(err => {
                        Message.error({
                            content: ' <Alert type="error" show-icon>' +
                                '出现了一些问题。。。' +
                                '    </Alert>',
                            duration: 3,
                            closable: true,
                            top: 500,
                        });
                        console.log(err)
                    });
            }, fileClick(e) {
                this.$axios({
                    method: 'GET',
                    url: 'http://localhost:4000/fileupload/' + pathName + "\\" + e.target.innerText,
                    responseType: 'blob'
                }).then(response => {
                    let blob = new Blob([response.data], {type: response.data.type});
                    let url = window.URL.createObjectURL(blob);
                    const link = document.createElement('a');// 创建a标签
                    link.href = url;
                    link.download = e.target.innerText;// 重命名文件
                    link.click();
                    URL.revokeObjectURL(url);// 释放内存
                }).catch(err => {
                    Message.error({
                        content: ' <Alert type="error" show-icon>' +
                            '出现了一些问题。。。' +
                            '    </Alert>',
                        duration: 3,
                        closable: true,
                        top: 500,
                    });
                    console.log(err)
                })
            }, backClick() {
                //去掉末尾的分隔符"\"
                let pathName = this.path.substring(0, this.path.lastIndexOf("\\"));
                if (pathName == '') {
                    Message.error({
                        content: ' <Alert type="error" show-icon>' +
                            '已经到达根目录' +
                            '    </Alert>',
                        duration: 3,
                        closable: true,
                        top: 500,
                    });
                } else {
                    this.path = pathName;
                }
                this.searchClick();
            }, uploadSuccess(response, file, fileList) {
                Message.success({
                    content: ' <Alert type="success" show-icon>' +
                        '文件上传成功！' +
                        '    </Alert>',
                    duration: 3,
                    closable: true,
                    top: 500,
                });
                this.searchClick();
                console.log(response);
                console.log(file);
                console.log(fileList);
            }, uploadError(error) {
                Message.error({
                    content: ' <Alert type="error" show-icon>' +
                        '文件未上传成功！' +
                        '    </Alert>',
                    duration: 3,
                    closable: true,
                    top: 500,
                });
                console.log(error)
            }, addFold() {
                this.$axios({
                    method: 'GET',
                    url: 'http://localhost:4000/fileupload/file/mkdir',
                    params: {path: pathName + "\\" + this.newFoldName},
                }).then(response => {
                    Message.success({
                        content: ' <Alert type="success" show-icon>' +
                            '新建文件夹成功！' +
                            '    </Alert>',
                        duration: 3,
                        closable: true,
                        top: 500,
                    });
                    this.searchClick();
                    console.log(response);
                }).catch(err => {
                    Message.error({
                        content: ' <Alert type="error" show-icon>' +
                            '出现了一些问题。。。' +
                            '    </Alert>',
                        duration: 3,
                        closable: true,
                        top: 500,
                    });
                    console.log(err)
                })
            }, showModal() {
                this.modal1 = true;
            }
        },
        mounted() {
            this.searchClick()
        }
    };
</script>

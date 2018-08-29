import React, { Component } from 'react';
import { Upload, Icon, message,Table,Button,Pagination,Spin } from 'antd';
import axios from 'axios';
import './App.css';
import { insertCTable } from './types.js'
import CtypesTable from './components/CtypesTable.js'
import * as api from './api/index.js'

class App extends Component {
  constructor(props){
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
    // this.getCookie();
  }
    state = {
      total:0,
        pageSize:10,
        page:1,
        tableData:[],
        path:'',
        loading:false,
        tableLoading:false,
        fileList:[]
    }
    componentDidMount(){
      var oTableWrap = document.getElementById("table-wrap");
      var oTop = oTableWrap.offsetTop;
      var wHeight = document.body.clientHeight;
    }
    getData(){
      this.setState({
          tableLoading:true
      })
      axios.get(api.getData,{params :{page:this.state.page,pageSize:this.state.pageSize}}).then(res=>{
          const data = res.data
          if(data.success){
              this.setState({
                  total: data.total,
                  tableData: data.data,
                  tableLoading:false
              })}else{
                this.setState({
                    total:0,
                    tableData:[],
                    tableLoading:false,
                    fileList:[]
                });
                message.error(data.data);
              }
          // insertCTable(res.data)
      })
    }
    handleDownload(){
      let href = `${api.download}/${this.state.path}`;
      window.location.href = href;
    }
  render() {
      let that = this;
      const props = {
          name: 'file',
          multiple: false,
          action: api.uploadfile,
          onChange(info) {
              that.setState({
                  loading:true,
                  page:1,
                  fileList:[info.fileList[info.fileList.length-1]]
              });
              const status = info.file.status;
              if (status !== 'uploading') {
              }
              if (status === 'done') {
                  message.success(`${info.file.name} 文件上传成功`);
                  const path = info.file.response.path;
                  that.setState({
                      path,
                      loading:false
                  },that.getData())
              } else if (status === 'error') {
                  message.error(`${info.file.name} 文件上传失败`);
              }

          },
      };

      const Dragger = Upload.Dragger;
      const pagination = {
          current:this.state.page,
          total: this.state.total,
          showTotal:(total)=>`共${total}条`,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          onChange: page=>{
            this.setState({page:page},()=>{this.getData();});

          },
          onShowSizeChange: (current, pageSize) => {
              this.setState({pageSize,page:1},()=>{this.getData()});
          },}
          const {tableData} = this.state;
    return (
      <div className="App">
          <div className="dragger-wrap">
              <Dragger {...props} fileList={this.state.fileList}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">单击或拖动文件到该区域上传</p>
                    {/*<p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>*/}
              </Dragger>
             <Button id="download" loading={this.state.loading} onClick={this.handleDownload} type="primary" shape="circle" icon="download" size="large" />
          </div>
          <div id="table-wrap">
              <Spin spinning={this.state.tableLoading}>
              {
                  tableData.map((item,index)=>{
                      if(item){
                          var keys = Object.keys(item);
                          return keys.map((val,key)=>{
                              if(item[val].indexOf("analysisType")!==-1){
                                  let itemVal = JSON.parse(item[val]);
                                  if(itemVal.analysisType.toUpperCase()==='C'){
                                      return(
                                          <CtypesTable data={itemVal} key={key} />
                                      )

                                  }
                              }
                          })
                      }
                  })
              }
              </Spin>
          </div>
          {
              this.state.total!==0?<Pagination className="mt10" {...pagination} />:null
          }
      </div>
    );
  }
}

export default App;

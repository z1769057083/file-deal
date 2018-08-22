import React, { Component } from 'react';
import { Upload, Icon, message,Table,Button} from 'antd';
import axios from 'axios';
import './App.css';




class App extends Component {
  constructor(props){
    super(props);
    this.handleDownload = this.handleDownload.bind(this);
    this.getData()
  }
    state = {
      total:0,
        pageSize:10,
        page:1
    }
    getData(){
      axios.post("http://127.0.0.1:7878/uploadfile").then(res=>{
          console.log(res)
      })
    }

    handleDownload(){
      window.location.href = "http://127.0.0.1:7878/web.zip"
    }
  render() {
      const props = {
          name: 'file',
          multiple: true,
          action: 'http://127.0.0.1:7878/uploadfile',
          onChange(info) {
              console.log(info)
              const status = info.file.status;
              if (status !== 'uploading') {
                  console.log(info.file, info.fileList);
              }
              if (status === 'done') {
                  message.success(`${info.file.name} file uploaded successfully.`);
              } else if (status === 'error') {
                  message.error(`${info.file.name} file upload failed.`);
              }
          },
      };
      const dataSource = [{
          key: '1',
          name: '胡彦斌',
          age: 32,
          address: '西湖区湖底公园1号'
      }, {
          key: '2',
          name: '胡彦祖',
          age: 42,
          address: '西湖区湖底公园1号'
      }];

      const columns = [{
          title: '姓名',
          dataIndex: 'name',
          key: 'name',
      }, {
          title: '年龄',
          dataIndex: 'age',
          key: 'age',
      }, {
          title: '住址',
          dataIndex: 'address',
          key: 'address',
      }];
      const Dragger = Upload.Dragger;
      const pagination = {
          total: this.state.total,
          defaultCurrent: this.state.page,
          pageSize: this.state.pageSize,
          showSizeChanger: true,
          onShowSizeChange: (current, pageSize) => {
              this.setState({
                  pageSize
              })
          },}
    return (
      <div className="App">
          <div className="dragger-wrap">
              <Dragger {...props}>
                    <p className="ant-upload-drag-icon">
                      <Icon type="inbox" />
                      </p>
                      <p className="ant-upload-text">Click or drag file to this area to upload</p>
                    <p className="ant-upload-hint">Support for a single or bulk upload. Strictly prohibit from uploading company data or other band files</p>
              </Dragger>
             <Button id="download" onClick={this.handleDownload} type="primary" shape="circle" icon="download" size="large" />
          </div>
          <Table className="mt50" dataSource={dataSource} columns={columns} pagination={pagination}/>
      </div>
    );
  }
}

export default App;

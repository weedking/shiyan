//这是可编辑用户列表EditableTable

import React, { Component } from 'react';
// import Button from 'antd/lib/button';
import { Table, Input, Button, Popconfirm, Form, } from 'antd';
import './App.css';

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
    <EditableContext.Provider value={form}>
        <tr {...props} />
    </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
    state = {
        editing: false,
    }

    toggleEdit = () => {
        const editing = !this.state.editing;
        this.setState({ editing }, () => {
            if (editing) {
                this.input.focus();
            }
        });
    }

    save = (e) => {
        const { record, handleSave } = this.props;
        this.form.validateFields((error, values) => {
            if (error && error[e.currentTarget.id]) {
                return;
            }
            this.toggleEdit();
            handleSave({ ...record, ...values });
        });
    }

    render() {
        const { editing } = this.state;
        const {
            editable,
            dataIndex,
            title,
            record,
            index,
            handleSave,
            ...restProps
        } = this.props;
        return (
            <td {...restProps}>
                {editable ? (
                    <EditableContext.Consumer>
                        {(form) => {
                            this.form = form;
                            return (
                                editing ? (
                                    <FormItem style={{ margin: 0 ,width:200}}>
                                        {form.getFieldDecorator(dataIndex, {
                                            rules: [{
                                                required: true,
                                                message: `${title} is required.`,
                                            }],
                                            initialValue: record[dataIndex],
                                        })(
                                            <Input
                                                ref={node => (this.input = node)}
                                                onPressEnter={this.save}
                                                onBlur={this.save}
                                            />
                                        )}
                                    </FormItem>
                                ) : (
                                    <div
                                        className="editable-cell-value-wrap"
                                        style={{ paddingRight: 24 }}
                                        onClick={this.toggleEdit}
                                    >
                                        {restProps.children}
                                    </div>
                                )
                            );
                        }}
                    </EditableContext.Consumer>
                ) : restProps.children}
            </td>
        );
    }
}

class EditableTable extends React.Component {
    constructor(props) {
        super(props);
        this.columns = [{
            title: '客户ID',
            dataIndex: 'id',
            // width: '30%',
            width: 60,
            // editable: true,
            // fixed: 'left',
        },
        //     {
        //     title: 'key1',
        //     dataIndex: 'key1',
        //     // width: '30%',
        //     width: 200,
        //     editable: true,
        //     // fixed: 'left',
        // },
            {
            title: '客户来源',
            dataIndex: 'source',
            width: 60,
            editable: true,
        }, {
            title: '需求产品',
            dataIndex: 'need',
            width: 60,
            editable: true,
        },{
            title: '所在城市',
            dataIndex: 'city',
            width: 60,
            editable: true,
        },{
            title: '公司名称',
            dataIndex: 'name',
            width: 130,
            editable: true,
            // textWrap: 'word-break',
            // render: (text, record) => (
            //     <div style={{ wordWrap: 'break-word', wordBreak: 'break-all' }}>
            //         {text}
            //     </div>
            // ),

        },{
            title: '公司地址',
            dataIndex: 'address',
            width: 130,
            editable: true,

        },{
            title: '联系人',
            dataIndex: 'contacts',
            width: 80,
            editable: true,
        },{
            title: '联系电话',
            dataIndex: 'phone',
            width: 20,
            editable: true,
        },{
            title: '职务',
            dataIndex: 'title',
            width: 60,
            editable: true,
        },{
            title: '联系人邮箱',
            dataIndex: 'email',
            width: 60,
            editable: true,
        },{
            title: '公司网址',
            dataIndex: 'url',
            width: 10,
            editable: true,
        },{
            title: '备注',
            dataIndex: 'remark',
            width: 80,
            editable: true,

        },{
                title: '操作',
                dataIndex: 'operation',
                fixed: 'right',
                width: 100,
                render: (text, record) => (
                    this.state.dataSource.length >= 1
                        ? (
                            //recrd.key
                            <Popconfirm title="Sure to delete?" onConfirm={() => this.handleDelete(record.id)}>
                                <a href="javascript:;">删除</a>
                            </Popconfirm>
                        ) : null
                ),
            }];

        this.state = {
            dataSource: [],
            // dataSource: [],
            count: 2,
        };

    }

    componentDidMount() {//组件挂载时执行的代码
        this.timerID = setInterval(
            () => this.tick(),
            1000 //每秒更新一次
        );
    }

    tick() {//定时器
        this.setState({
            date: new Date(),//创建当前时间
            child:'删除',
        });
        this.getCustomerList();
    }

    componentWillUnmount() {
        clearInterval(this.timerID);//清理计时器

    }

    //从后台获取用户列表
    getCustomerList(){
        /* 查询数据的格式 */
        let filter={
            object:{
                object:{

                }
            }
        };

        var url ="http://119.23.77.187:8080/getCustomerList";
        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值.
                debugger;
                console.log(responseJson);
                this.setState({
                    dataSource: responseJson

                })

            })
    }

    addCustomer(createID,key1,name,address,city,phone,contacts,email,source,title,need,urlfor,remark){
        let filter={
            object:{
                object:{

                }
            }
        };

        var preurl ="http://119.23.77.187:8080/addCustomer?id=";
        var and = "&";
        var key11="key1=";
        var name1="name=";
        var address1="address=";
        var city1="city=";
        var phone1="phone=";
        var contacts1="contacts=";
        var email1="email=";
        var source1="source=";
        var title1="title=";
        var need1="need=";
        var url1="url=";
        var remark1="remark=";

        var url= preurl+createID+and+key11+key1+and+name1+name+and+address1+address+and+city1+city+and+phone1+phone+and+contacts1+contacts+and+email1+email+and+source1+source+
            and+title1+title+and+need1+need+and+url1+urlfor+and+remark1+remark;

        // var url = "http://127.0.0.1:8080/addCustomer?id=5&name=776";

        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值.
                debugger;
                console.log(responseJson);
                this.setState({
                    // dataSource: responseJson

                })

            })

    }

    //删除选中的列表记录
    deleteCustomerItem(id){
        let filter={
            object:{
                object:{

                }
            }
        };

        var preurl ="http://119.23.77.187:8080/deleteCustomer?id=";
        var url = preurl+id;
        // var url = "http://127.0.0.1:8080/deleteCustomerItem?id=2";
        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值.
                debugger;
                console.log(responseJson);
                this.setState({
                    // dataSource: responseJson
                })

            })
    }

    updateCustomer(createID,key1,name,address,city,phone,contacts,email,source,title,need,urlfor,remark){
        let filter={
            object:{
                object:{

                }
            }
        };

        var preurl ="http://119.23.77.187:8080/updateCustomer?id=";
        var and = "&";
        var name1="name=";
        var address1="address=";
        var city1="city=";
        var phone1="phone=";
        var contacts1="contacts=";
        var email1="email=";
        var source1="source=";
        var title1="title=";
        var need1="need=";
        var url1="url=";
        var remark1="remark=";

        var url= preurl+createID+and+name1+name+and+address1+address+and+city1+city+and+phone1+phone+and+contacts1+contacts+and+email1+email+and+source1+source+
            and+title1+title+and+need1+need+and+url1+urlfor+and+remark1+remark;

        // var url = "http://127.0.0.1:8080/updateCustomer?id=868&name=香港人";

        var getInformation ={
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            /* json格式转换 */
            body:JSON.stringify(filter)
        }
        fetch(url,getInformation)
            .then(response => response.json())
            .then(responseJson=>{
                // 返回的数据 根据自己返回的json格式取值.
                debugger;
                console.log(responseJson);
                this.setState({
                    // dataSource: responseJson

                })

            })

    }

    handleDelete = (id) => {
        // const dataSource = [...this.state.dataSource];
        // this.setState({ dataSource: dataSource.filter(item => item.id !== id) });
        this.deleteCustomerItem(id);

    }

    handleAdd = () => {
        // Math.floor(Math.random()*(max-min+1)+min);//产生随机数
        var createID=Math.floor(Math.random()*(1000-1+1)+1);
        var key1="请填写key";
        var name="请填写公司名称";
        var address="请填写公司地址";
        var city="请填写城市";
        var phone="请填写电话";
        var contacts="请填写联系人";
        var email="请填写邮箱";
        var source="请填写来源";
        var title="请填写职务";
        var need="请填写产品";
        var url="请填写网址";
        var remark="请填写备注";

        const { count, dataSource } = this.state;
        const newData = {
            id: createID,
            key1: createID,

            name: `公司名称`,
            address: `深圳市南山区`,
        };

        // this.setState({
        //     dataSource: [...dataSource, newData],
        //     count: count + 1,
        // });

        this.addCustomer(createID,key1,name,address,city,phone,contacts,email,source,title,need,url,remark);
    }

    handleSave = (row) => {
        const newData = [...this.state.dataSource];
        const index = newData.findIndex(item => row.id === item.id);
        const item = newData[index];
        // newData.splice(index, 1, {
        //     ...item,
        //     ...row,
        // });

        //createID,key1,name,city,phone,contacts,email,source,title,need,urlfor,remark

        this.updateCustomer(row.id,row.key1,row.name,row.address,row.city,row.phone,row.contacts,
            row.email,row.source,row.title,row.need,row.url,row.remark);

        // this.updateCustomer(item.id,item.key1,item.name,item.city,item.phone,
        //     item.email,item.source,item.title,item.url);


        // this.setState({ dataSource: newData });
    }

    render() {
        const { dataSource } = this.state;
        const components = {
            body: {
                row: EditableFormRow,
                cell: EditableCell,
            },
        };
        const columns = this.columns.map((col) => {
            if (!col.editable) {
                return col;
            }
            return {
                ...col,
                onCell: record => ({
                    record,
                    editable: col.editable,
                    dataIndex: col.dataIndex,
                    title: col.title,
                    handleSave: this.handleSave,
                }),
            };
        });
        return (
            <div>
                <Button onClick={this.handleAdd} type="primary" style={{ marginBottom: 16 }}>
                    新增
                </Button>
                <Table
                    components={components}
                    rowClassName={() => 'editable-row'}
                    bordered
                    dataSource={dataSource}
                    columns={columns}
                    scroll={{x: 2600}}
                    // scroll={{x: 2000, y: 300}}



                />
            </div>
        );
    }
}


export default EditableTable;

import React, { useRef, useState } from 'react'
import './index.scss'
import { Card, Breadcrumb, Form, Input, Button, Select, Radio, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import useChannel from '@/hooks/useChannel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { publishArticle } from '@/apis/article';
import { useNavigate } from 'react-router-dom';

export default function Publish() {
    const [titleInput, setTitleInput] = useState();
    const [selectChannel, setSelectChannel] = useState();
    const { channels } = useChannel();
    const quillRef = useRef();
    const [picCount, setPicCount] = useState(0);
    const navi = useNavigate();

    //  上传封面//
    // 暂存上传后的图片//
    const cacheImageList = useRef([]);
    const [imageList, setImageList] = useState([]);
    const handleChange = val => {
        cacheImageList.current = val.fileList;
        setImageList(val.fileList);
    }

    // 发布文章//
    const onPublish = async (val) => {
        if (picCount !== imageList.length) {
            message.warning('上传数量和类型不一致');
            return;
        }
        const data = {
            ...val,
            cover: {
                type: picCount,
                imges: imageList.map(item => {
                    if (item)
                        if (item.response) {
                            return item.response.data.url;
                        }
                        else {
                            return item.url;
                        }
                })
            }
        }
        await publishArticle(data);
        navi('/article');
        message.success('发布成功');
    };

    const handleChangeRadio = (val) => {
        let { target: { value } } = val;
        setPicCount(value);
        if (value === 1) {
            let list = cacheImageList.current[0] ? [cacheImageList.current[0]] : [];
            setImageList(list);
        }
        else if (value === 3) {
            setImageList(cacheImageList.current);
        }
        else {
            setImageList([]);
        }
    };

    return (
        <div className='publish'>
            <Card
                className='card'
                title={
                    <Breadcrumb
                        items={[
                            {
                                title: '首页',
                                href: 'home'
                            },
                            {
                                title: '发布文章'
                            }
                        ]}
                    />
                }
            >
                <Form
                    className='form'
                    labelCol={{ span: 4 }}
                    onFinish={onPublish}
                >
                    <Form.Item
                        label="标题"
                        name='title'
                        rules={[
                            {
                                required: true,
                                message: '请输入文章标题'
                            }
                        ]}
                    >
                        <Input
                            className='title'
                            placeholder="请输入文章标题"
                            value={titleInput}
                            onChange={(val) => setTitleInput(val.target.value)}
                        />
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name='channel_id'
                        rules={[
                            {
                                required: true,
                                message: '请选择文章频道'
                            }
                        ]}
                    >
                        <Select
                            className='channel'
                            placeholder="请选择文章频道"
                            style={{ flex: 1 }}
                            options={channels.map(item => ({ value: item.id, label: item.name }))}
                            value={selectChannel}
                            onChange={(val) => setSelectChannel(val)}
                        />
                    </Form.Item>
                    <Form.Item label='封面'>
                        <Form.Item>
                            <Radio.Group
                                name='type'
                                value={picCount}
                                onChange={handleChangeRadio}
                                defaultValue={0}
                            >
                                <Radio value={1}>单图</Radio>
                                <Radio value={3}>三图</Radio>
                                <Radio value={0}>无图</Radio>
                            </Radio.Group>
                        </Form.Item>
                        {picCount > 0 && <Upload
                            name='image'
                            action={"http://geek.itheima.net/v1_0/upload"}
                            listType="picture-card"
                            fileList={imageList}
                            onChange={handleChange}
                            maxCount={picCount}
                        >
                            <PlusOutlined />
                        </Upload>}
                    </Form.Item>
                    <Form.Item
                        label="内容"
                        name='content'
                        rules={[
                            {
                                required: true,
                                message: '请输入文章内容'
                            }
                        ]}
                    >
                        <ReactQuill
                            ref={quillRef}
                            className="publish-quill"
                            theme="snow"
                            placeholder="请输入文章内容"
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ offset: 4 }}>
                        <Button type="primary" size="large" htmlType='submit'>发布文章</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div>
    )
}

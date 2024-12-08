import React, { useRef, useState } from 'react'
import './index.scss'
import { Card, Breadcrumb, Form, Input, Button, Select } from 'antd'
import useChannel from '@/hooks/useChannel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

export default function Publish() {
    const [titleInput, setTitleInput] = useState();
    const [selectChannel, setSelectChannel] = useState();
    const { channels } = useChannel();
    const quillRef = useRef();

    // 发布文章//
    const onPublish = (val) => {
        console.log(val);
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

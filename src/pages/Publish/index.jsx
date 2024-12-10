import React, { useEffect, useRef, useState } from 'react'
import './index.scss'
import { Card, Breadcrumb, Form, Input, Button, Select, Radio, Upload, message } from 'antd'
import { PlusOutlined } from '@ant-design/icons'
import useChannel from '@/hooks/useChannel';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'
import { editArticle, getArticle, publishArticle } from '@/apis/article';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function Publish() {
    const [titleInput, setTitleInput] = useState();
    const [selectChannel, setSelectChannel] = useState();
    const { channels } = useChannel();
    const quillRef = useRef();
    const [picCount, setPicCount] = useState(0);
    const navi = useNavigate();
    const [searchParams] = useSearchParams();
    // 需要编辑的文章id//
    const editID = searchParams.get('id');
    const [form] = Form.useForm();

    //  上传封面//
    // 暂存上传后的图片//
    const cacheImageList = useRef([]);
    const [imageList, setImageList] = useState([]);
    const handleChange = val => {
        cacheImageList.current = val.fileList;
        setImageList(val.fileList);
    }

    const getArticleByID = async (id) => {
        const res = await getArticle(id);

        let { title, channel_id, cover: { type, images } } = res.data;
        /* 
            因为 Form.Item 的 name 属性在使用 Ant Design 的表单时，
            默认会与表单控件（如 Input）的值进行双向绑定。
            当你给 Form.Item 加了 name 属性时，
            表单会自动管理这个字段的值，并且会覆盖你手动传递给 Input 的 value。
            所以使用 Form 的 setFieldsValue 方法来修改表单字段的值
         */
        form.setFieldsValue(
            {
                ...res.data,
                type
            }
        );
        setTitleInput(title);
        setSelectChannel(channel_id);
        setPicCount(type);
        let imgs = images.map(url => ({ url }));
        setImageList(imgs);
        cacheImageList.current = imgs;
    };

    useEffect(() => {
        if (editID) {
            getArticleByID(editID);
        }
    }, []);

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
                images: imageList.map(item => {
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
        editID ? await editArticle(editID, data) : await publishArticle(data);
        navi('/article');
        editID ? message.success('编辑成功') : message.success('发布成功');
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
                    form={form}
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
                        <Button type="primary" size="large" htmlType='submit'>{editID ? '编辑文章' : '发布文章'}</Button>
                    </Form.Item>
                </Form>
            </Card>
        </div >
    )
}

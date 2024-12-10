import React, { useEffect, useState } from 'react'
import './index.scss'
import { Card, Breadcrumb, Form, Radio, Select, DatePicker, Button, Table, Space, Tag, Popconfirm } from 'antd'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import imgNotFound from '@/assets/error.png'
import { deleteArticle, getArticles } from '@/apis/article';
import useChannel from '@/hooks/useChannel';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom'

export default function Article() {
    const [selectDate, setSelectDate] = useState(null);
    const [articleList, setArticleList] = useState([]);
    const [totalCount, setTotalCount] = useState(0);
    const [status, setStatus] = useState(0);
    const { channels } = useChannel();
    const [channel_id, setChannel_id] = useState();
    const [searchData, setSearchData] = useState({
        status: '',
        channel_id: '',
        begin_pubdate: '',
        end_pubdate: '',
        per_page: 4,
        page: 1
    });
    const navi = useNavigate();

    const colums = [
        {
            title: '封面',
            dataIndex: 'cover',
            render: cover => <img src={cover.images[0] || imgNotFound} alt="img" style={{ width: '80px' }} />
        },
        {
            title: '标题',
            dataIndex: 'title'
        },
        {
            title: '状态',
            dataIndex: 'status',
            render: status => status === 1 ? <Tag color="warning">待审核</Tag> : <Tag color="success">审核通过</Tag>
        },
        {
            title: '发布时间',
            dataIndex: 'pubdate'
        },
        {
            title: '阅读数',
            dataIndex: 'read_count',

        },
        {
            title: '评论数',
            dataIndex: 'comment_count',
        },
        {
            title: '点赞数',
            dataIndex: 'like_count',

        },
        {
            title: '操作',
            render: (article) => (
                <Space size="middle">
                    <Button type='primary' icon={<EditOutlined />} shape='circle' onClick={() => handleEdit(article)}></Button>
                    <Popconfirm
                        title="删除文章"
                        description="确定要删除文章吗?"
                        okText="确定"
                        cancelText="取消"
                        onConfirm={() => handleDelete(article)}
                    >
                        <Button type='primary' icon={<DeleteOutlined />} shape='circle' danger></Button>
                    </Popconfirm>
                </Space>
            )
        },
    ];

    const getArticleList = async () => {
        const res = await getArticles(searchData);
        setArticleList(res.data.results);
        setTotalCount(res.data.total_count);
    };

    useEffect(() => {
        getArticleList();
    }, [searchData]);


    const onChangeDate = (val) => {
        setSelectDate(val);
    };

    const handleChangeRadio = (val) => {
        setStatus(val.target.value);
    };

    const handlePageChange = (page) => {
        setSearchData({
            ...searchData,
            page
        });
    };

    const handleDelete = async (article) => {
        await deleteArticle(article.id);
        setSearchData({ ...searchData });
    };

    const handleEdit = (article) => {
        navi(`/publish?id=${article.id}`);
    };

    const onFinish = () => {
        setSearchData({
            ...searchData,
            page: 1,
            status,
            channel_id,
            begin_pubdate: selectDate ? dayjs(selectDate[0]).format('YYYY-MM-DD') : '',
            end_pubdate: selectDate ? dayjs(selectDate[1]).format('YYYY-MM-DD') : '',
        });

    };

    return (
        <div className='article'>
            <Card
                className='search-card'
                title={
                    <Breadcrumb
                        items={[
                            {
                                title: '首页',
                                href: 'home'
                            },
                            {
                                title: '文章列表'
                            }
                        ]}
                    />
                }
            >
                <Form className='form' onFinish={onFinish}>
                    <Form.Item label="状态">
                        <Radio.Group
                            name='status'
                            value={status}
                            onChange={handleChangeRadio}
                            defaultValue={0}
                        >
                            <Radio value={0}>全部</Radio>
                            <Radio value={1}>待审核</Radio>
                            <Radio value={2}>审核通过</Radio>
                        </Radio.Group>
                    </Form.Item>
                    <Form.Item
                        label="频道"
                        name='channel_id'
                        wrapperCol={{ span: 2 }}
                    >
                        <Select
                            className='channel'
                            placeholder="请选择文章频道"
                            options={channels.map(item => ({ value: item.id, label: item.name }))}
                            value={channel_id}
                            onChange={(val) => setChannel_id(val)}
                        />
                    </Form.Item>
                    <Form.Item
                        label='日期'
                        name='date'
                    >
                        <DatePicker.RangePicker value={selectDate} onChange={onChangeDate} />
                    </Form.Item>
                    <Form.Item>
                        <Button className='btn' type="primary" size="normal" htmlType='submit'>筛选</Button>
                    </Form.Item>
                </Form>
            </Card>
            <Card
                className='result-card'
                title={`根据筛选条件共查询到 ${totalCount} 条结果：`}
            >
                <Table
                    rowKey='id'
                    columns={colums}
                    dataSource={articleList}
                    pagination={
                        {
                            total: totalCount,
                            pageSize: searchData.per_page,
                            onChange: handlePageChange
                        }
                    }
                />
            </Card>
        </div >
    )
}

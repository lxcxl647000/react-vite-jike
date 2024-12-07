import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import './index.scss'

export default function BarChart({ title, xData, yData }) {
    const charts = useRef();

    const createCharts = () => {
        // 图表初始化 生成图表实例对象 charts对应渲染节点//
        const myChart = echarts.init(charts.current);
        // 准备图表参数//
        const option = {
            title: {
                text: title
            },
            xAxis: {
                type: 'category',
                data: xData
            },
            yAxis: {
                type: 'value'
            },
            series: [
                {
                    data: yData,
                    type: 'bar'
                }
            ]
        };
        // 使用图表参数并渲染//
        option && myChart.setOption(option);
    };

    useEffect(() => {
        createCharts();
    }, [])


    return (
        <div className='charts' ref={charts}></div>
    )
}

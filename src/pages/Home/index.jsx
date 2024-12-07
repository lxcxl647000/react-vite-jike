import React, { useEffect, useRef } from 'react'
import * as echarts from 'echarts';
import './index.scss'

export default function Home() {
    const charts = useRef();
    const charts2 = useRef();

    const createCharts = (node, title, xData, yData) => {
        // 图表初始化 生成图表实例对象 charts对应渲染节点//
        const myChart = echarts.init(node.current);
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
        createCharts(charts, '三大框架满意度', ['Vue', 'React', 'Angular'], [10, 40, 70]);
        createCharts(charts2, '三大框架使用度', ['Vue', 'React', 'Angular'], [40, 70, 10]);
    }, [])


    return (
        <div className="home">
            <div className='charts' ref={charts}></div>
            <div className='charts2' ref={charts2}></div>
        </div>
    )
}

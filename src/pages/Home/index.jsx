import React from 'react'
import BarChart from './components/BarChart';

export default function Home() {
    return (
        <div className="home">
            <BarChart title='三大框架满意度' xData={['Vue', 'React', 'Angular']} yData={[10, 40, 70]} />
            <BarChart title='三大框架使用度' xData={['Vue', 'React', 'Angular']} yData={[40, 70, 10]} />
        </div>
    )
}

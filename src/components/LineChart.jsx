import React from 'react'
import {Line} from "react-chartjs-2"
import {Chart as ChartJS} from "chart.js/auto"
import {Col, Row, Typography, Space} from "antd"

const LineChart = ({coinName, currentPrice, coinHistory}) => {
    
    const {Title} = Typography
    const coinPrice = []
    const coinTimeStamp = []

        for (let i=0 ; i<coinHistory?.data?.history?.length ; i++){
            coinPrice.push(coinHistory?.data?.history[i]?.price)
        }
        for (let i= coinHistory?.data?.history?.length - 1; i>=0; i-- ) {
            let date = new Date();
            date.setDate(date.getDate() - i);
            coinTimeStamp.push(date.toLocaleDateString())
        }

    const data = {
        labels: coinTimeStamp,
        datasets: [
            {
                label: `Price in USD through a year`,
                data: coinPrice.reverse(),
                fill: false,
                backgroundColor: "#0071bd",
                borderColor: "#0071bd"
            }
        ]
    }

    const options = {
        
        scales: [{
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true
                    }
                }
            ]
        }]
    }

    return (
        <>
            <Row className='chart-header'>
                <Col lg={12}>
                    <Title level={2} className="chart-title">
                        {coinName} Price Chart:
                    </Title>
                </Col>
                <Col lg={12} style={{textAlign: "right", alignSelf: "center"}}>
                        <Space>
                            <Row>
                                <Col>
                                        <Title level={4} className="price-change">
                                            {coinHistory?.data?.change}% 
                                        </Title>
                                </Col>
                                <Col>
                                        <Title level={4} className="current-price">
                                           Current {coinName} Price: {currentPrice} $
                                        </Title>
                                </Col>
                            </Row>
                        </Space>
                </Col>
                    <Line data={data} options={options} />
            </Row>
        </>
    )
}

export default LineChart
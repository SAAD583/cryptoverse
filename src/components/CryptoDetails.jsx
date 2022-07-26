import React from 'react'
import millify from 'millify'
import { useParams } from 'react-router'
import HTMLReactParser from "html-react-parser"
import { Col, Row, Select, Typography, Space } from 'antd'
import { useGetCryptoDetailsQuery } from '../services/cryptoApi'
import {MoneyCollectOutlined, ExclamationCircleOutlined, NumberOutlined, CheckOutlined, DollarCircleOutlined, ThunderboltOutlined, FundOutlined, StopOutlined, TrophyOutlined} from "@ant-design/icons"
import LineChart from './LineChart'
import { useGetCryptoHistoryQuery } from '../services/cryptoApi'
import Loader from './Loader'

const CryptoDetails = () => {
  const {Title, Text} = Typography
  const {Option} = Select
  const {coinId} = useParams()
  const {data, isSuccess} = useGetCryptoDetailsQuery(coinId)
  const cryptoDetails = data?.data?.coin
  const {data: coinHistory} = useGetCryptoHistoryQuery({uuId: coinId})

  const stats = [
    { title: 'Price to USD', value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`, icon: <DollarCircleOutlined /> },
    { title: 'Rank', value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    { title: 'Market Cap', value: `$ ${cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)}`, icon: <DollarCircleOutlined /> },
    { title: 'All-time-high(daily avg.)', value: `$ ${cryptoDetails?.allTimeHigh?.price && millify(cryptoDetails?.allTimeHigh?.price)}`, icon: <TrophyOutlined /> },
  ];

  const genericStats = [
    { title: 'Number Of Markets', value: cryptoDetails?.numberOfMarkets, icon: <FundOutlined /> },
    { title: 'Number Of Exchanges', value: cryptoDetails?.numberOfExchanges, icon: <MoneyCollectOutlined /> },
    { title: 'Aprroved Supply', value: cryptoDetails?.supply?.confirmed ? <CheckOutlined /> : <StopOutlined />, icon: <ExclamationCircleOutlined /> },
    { title: 'Circulating Supply', value: `$ ${cryptoDetails?.supply?.circulating && millify(cryptoDetails?.supply?.circulating)}`, icon: <ExclamationCircleOutlined /> },
  ];

  return (
    <Col className='coin-detail-container'>
        <Col className='coin-heading-container'>
          <Title level={2} className="coin-name">
            {cryptoDetails?.name} ({cryptoDetails?.symbol}) price
          </Title>
          <p>
            {cryptoDetails?.name} live price in US dollars.
            View value statistics, market cap and supply
          </p>
        </Col>
              
              
        <LineChart currentPrice={cryptoDetails?.price && millify(cryptoDetails?.price)} 
                  coinName={cryptoDetails?.name}
                  coinHistory={coinHistory}/>

          <Row justify='space-between' gutter={15}>

            <Col className='coin-value-statistics' lg={12} xs={24} sm={12} md={12}>
                  <Title level={3} className="coin-details-heading">
                    {cryptoDetails?.name} Value Statistics: 
                  </Title>
                  <p>
                    An overview showing the stats of {cryptoDetails?.name}
                  </p>
                {stats?.map(({icon, value, title}) => (
                  <Col className='coin-stats' key={title}>
                      <Space>
                      <Text>{icon}</Text>
                      <Text>{title}</Text>
                      
                      <Text>
                          {value}
                      </Text>
                      </Space>
                    
                  </Col>
                ))}
            </Col>


              <Col className='coin-value-statistics' lg={12} xs={24} sm={12} md={12}>
                <Title level={3} className="coin-details-heading">
                  {cryptoDetails?.name} Other Statistics: 
                </Title>
                <p>
                  An overview showing the stats of all cryptocurrencies
                </p>
              
              {genericStats?.map(({icon, value, title}) => (
                <Col className='coin-stats' key={title}>
                    <Space>
                    <Text>{icon}</Text>
                    <Text>{title}</Text>
                    
                    <Text>
                        {value}
                    </Text>
                    </Space>
                   
                </Col>
              ))}
              </Col>
        </Row>

        
        <Col>
            <div className="coin-desc">
              <Title level={3}>
                  what is {cryptoDetails?.name}
              </Title>
                {isSuccess? HTMLReactParser(cryptoDetails?.description): <Loader/>}
            </div>
            <Col style={{marginTop: "30px"}}>
                <Title level={4}>
                  {cryptoDetails?.name} Links:
                </Title>
                {cryptoDetails?.links?.map(link => (
                  <Row key={link?.name} target="_blank">
                    <Space>
                      <Title level={5}>
                        {link?.type}
                      </Title>
                      <a href={link?.url}>
                        {link?.name}
                      </a>
                    </Space>
                  </Row>
                ))}
            </Col>
        </Col>

    </Col>
  )
}

export default CryptoDetails
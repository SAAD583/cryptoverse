import React from 'react'
import millify from "millify"
import { Typography, Col, Row, Statistic } from 'antd'
import { Link } from 'react-router-dom'
import { useGetCryptosQuery } from '../services/cryptoApi'
import CryptoCurrencies from './CryptoCurrencies'
import News from './News'
import Loader from "./Loader"

const HomePage = () => {
  const {Title} = Typography;
  const {data, isFetching} = useGetCryptosQuery(10)
  const globalStats = data?.data?.stats

  if (isFetching) return <Loader/>

  return (
    <>
      <Title level={2} className='heading'>Global Crypto Stats: </Title>
      <Row gutter={10}>
        <Col span={12}> <Statistic title="Total CryptoCurrencies" value={globalStats.total}/></Col>
        <Col span={12}> <Statistic title="Total Exchanges" value={millify(globalStats.totalExchanges)}/></Col>
        <Col span={12}> <Statistic title="Total Market Cap" value={millify(globalStats.totalMarketCap)}/></Col>
        <Col span={12}> <Statistic title="Total 24h Volume" value={millify(globalStats.total24hVolume)}/></Col>
        <Col span={12}> <Statistic title="Total Markets" value={millify(globalStats.totalMarkets)}/></Col>
      </Row>
      <div>
        <Row className='home-page-section-title'>
            <Col lg={12} md={12} sm={12} xs={24}>
                <Title level={2} className="home-title">Top 10 Cryptocurrencies in the world: </Title>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24} style={{textAlign: "right", alignSelf: "center"}}>
                <Title level={4} className="show-more">
                  <Link to="/cryptocurrencies">Show More</Link>
                </Title>
            </Col>
                <CryptoCurrencies simplified/>
        </Row>
        <Row className='home-page-section-title'>
            <Col lg={12} md={12} sm={12} xs={24}>
                <Title level={2} className="home-title">Latest Ctypto News: </Title>
            </Col>
            <Col lg={12} md={12} sm={12} xs={24} style={{textAlign: "right", alignSelf: "center"}}>
                <Title level={4} className="show-more">
                  <Link to="/news">Show More</Link>
                </Title>
            </Col>
                <News simplified/>
        </Row>

      </div>
    </>
  )
}

export default HomePage
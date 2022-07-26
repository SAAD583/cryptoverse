import React from 'react'
import {Select, Typography, Row, Col, Avatar, Card} from "antd";
import moment from 'moment';
import { useGetCryptoNewsQuery } from '../services/cryptoNewsApi';
import { useGetCryptosQuery } from '../services/cryptoApi';
import Loader from "./Loader"

const News = (props) => {
  const [newsCategory, setnewsCategory] = React.useState("Cryptocurrency")
  const {data:coinsData} = useGetCryptosQuery(100)
  const {data, isFetching} = useGetCryptoNewsQuery({newsCategory, count: props.simplified? 6 : 12})
  const demoImg = "http://coinrevolution.com/wp-content/uploads/2020/06/cryptonews.jpg"
  console.log(coinsData);

  const {Option} = Select
  if (isFetching) return <Loader/>
  
  return (
    <Row gutter={[24,24]}>
      {!props.simplified && (<Col span={24}>
        <Select showSearch className='select-news' placeholder="Select a Crypto" 
                optionFilterProp='children' onChange={value => setnewsCategory(value)}>
                  {/* {filterOption={(inputValue, option) => option.children.toLowerCase().indexOf(inputValue.toLowerCase())}} */}
            <Option value="Cryptocurrency">
              Cryptocurrency
            </Option>
            {coinsData?.data?.coins.map(coin => <Option value={coin.name}>{coin.name}</Option> )}
        </Select>
      </Col>)}
      {data?.value.map((news, i) => (
        <Col xs={24} sm={24} md={24} lg={24} xl={12} key={i} >
          <Card hoverable className='news-card'>
            <a href={news.url} target="_blank" rel="norefferer">
                <Row align='space-between' style={{width: "100%"}}>
                  <Col lg={16} md={12} xs={24} sm={16} className="news-card-header">
                    <Typography.Title className='news-title' level={4}>
                      {news.name.length > 100 ? `${news.name.substring(0,100)}...` : news.name}
                    </Typography.Title>
                  </Col>
                  <Col>
                    <img className='news-img' width="80px" height="80px" src={news?.image?.thumbnail?.contentUrl || demoImg}/>   
                  </Col>
                </Row>
              <div className='description-container'>
                <p style={{color: "#1890ff"}}>
                  {news.description.length > 250? `${news.description.substring(0,250)}...`: news.description}
                </p>
              </div>
              <Row align='space-between' className='news-company-name-container'>
                <div>
                  <Avatar size={30} src={news?.provider[0]?.image?.thumbnail?.contentUrl} />
                  <Typography.Text className='news-company-name'>
                    {news?.provider[0]?.name.length > 25? `${news?.provider[0]?.name.substring(0,25)}...` : news?.provider[0]?.name}
                  </Typography.Text>
                </div>
                <Typography.Text>
                {moment(news.datePublished).startOf("ms").fromNow()}
                </Typography.Text>
              </Row>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  )
}

export default News
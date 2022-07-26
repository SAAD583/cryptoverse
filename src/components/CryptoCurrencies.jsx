import React, { useEffect } from 'react'
import millify from 'millify'
import { Link } from 'react-router-dom'
import {Card, Row, Col, Input} from 'antd'
import { useGetCryptosQuery } from '../services/cryptoApi'
import Loader from "./Loader"

const CryptoCurrencies = (props) => {
  const count = props.simplified? 10 : 50
  const {data, isFetching, isSuccess} = useGetCryptosQuery(count);
  const [cryptos, setCryptos] = React.useState()
  const [search, setSearch] = React.useState("")

 
/* The default value of the state is not set to the fetched data because the data 
needs time to be fetched, so we set the state to the data after it being fethed */
  useEffect(() => {
    if (isSuccess) {
      setCryptos(data?.data?.coins)
    }
    const filteredCrypto = data?.data?.coins?.filter(item => item.name.toLowerCase().includes(search.toLowerCase()))
    setCryptos(filteredCrypto)
  },[data, search] )
  if (isFetching) {
    return <Loader/>
  }
  

  return (
    <>
      {!props.simplified && <div className="search-crypto">
        <Input placeholder='Search Cryptocurrnecy' onChange={ e=> setSearch(e.target.value)} />
      </div>}
      <Row gutter={[32,32]}>
        {cryptos?.map((item) => (
          <Col xs={24} sm={12} lg={8} xl={6} className="crypto-card" key={item.uuid}>
            <Link to={`/crypto/${item.uuid}`}>
              <Card 
              title={`${item.rank} ${item.name}`}
              extra={<img className='crypto-img' width="50px" src={item.iconUrl}/>}
              hoverable>
                <p>Price: {millify(item.price)}</p>
                <p>Market Cap: {millify(item.marketCap)}</p>
                <p>Daily Change: {millify(item.change)}%</p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  )
}

export default CryptoCurrencies
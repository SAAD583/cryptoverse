import React from 'react'
import millify from "millify"
import { Collapse, Row, Col, Typography, Avatar } from 'antd'
import HTMLReactParser from "html-react-parser"

import { useGetCryptoExchangesQuery } from '../services/cryptoApi'

const Exchanges = () => {

  const {data, isFetching} = useGetCryptoExchangesQuery()
  console.log(data);
  return (
    <div>Exchanges</div>
  )
}

export default Exchanges
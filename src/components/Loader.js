import React from 'react'
import { Spin } from 'antd'

const Loader = () => {
  return (
    <div className='loader'>
        <div>
          <Spin />
        </div>
    </div>
  )
}

export default Loader
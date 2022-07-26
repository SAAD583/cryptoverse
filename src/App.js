import React, {useState, useEffect, useRef} from "react";
import { Route, Link, BrowserRouter, Router, Routes} from 'react-router-dom';
import { Typography, Layout, Space, Row, Col } from "antd";
import {NavBar, HomePage, Exchanges, CryptoCurrencies, CryptoDetails, News} from "./components";
import "./style.css"

export const myContext = React.createContext()
function App() {

  const [menuIsClicked, setMenuIsClicked] = useState(true)
  const [marginTop, setMarginTop] = useState(0)
  const x = {menuIsClicked, setMenuIsClicked, marginTop, setMarginTop}
  const navbar = useRef()

  const [activeMenu, setActiveMenu] = useState(false)
  const [screenSize, setScreenSize] = useState()

  useEffect(() => {
    const handleResize = () => setScreenSize(window.innerWidth)
    window.addEventListener("resize", handleResize)

    if (window.innerWidth < 768) setActiveMenu(false)
    else setActiveMenu(true)
    return () => window.removeEventListener("resize", handleResize)
  })

  const {Sider, Content} = Layout

  return (
    <myContext.Provider value={x}>
    <div className="app">
      <Layout>
        <Sider ref={navbar} width={275} className={`${!activeMenu && "top-navbar"}`}>
            <NavBar activeMenu={activeMenu}/>
        </Sider>

        <Layout>
          <Content className="main-content" style={{marginTop: marginTop, transition: "margin ease-in-out .4s"}}>
              <div className="main">
                  <div className="routes">
                    <Routes>
                      <Route path="/" element={<HomePage/>}/>
                      <Route path="*" element={<HomePage/>}/>
                      <Route path="/cryptoCurrencies" element={<CryptoCurrencies />} />
                      <Route path="/crypto/:coinId" element={<CryptoDetails />} />
                      <Route path="/news" element={<News />} />
                    </Routes>
                  </div>
                  <div className="footer">
                      <Typography.Title level={5} 
                      style={{textAlign: "center", color: "white",
                             backgroundColor:"rgb(0, 21, 41)", marginBottom: "0",
                             padding: "15px"}}>
                    
                      Cryptoverse <br />
                      All rights reserved
                      <br />
                    <Row className="try" justify="space-between" wrap style={{margin: "10px auto"}} >
                      <Col sm={8}>
                        <Link to='/'>Home</Link>
                      </Col>
                      <Col sm={8}>
                        <Link to='/cryptoCurrencies'>CryptoCurrencies</Link>
                      </Col>
                      <Col sm={8}>
                        <Link to='/news'>News</Link>
                      </Col>
                    </Row>
                  </Typography.Title>
                </div>
              </div>
      
          </Content>
        </Layout>
      </Layout>
      
    </div>
    </myContext.Provider>
  );
}

export default App;

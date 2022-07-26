import React, {useState, useEffect, useRef, useContext} from 'react';
import {Button, Menu, Typography, Avatar} from "antd";
import 'antd/dist/antd.css';
import { Link } from 'react-router-dom';
import {HomeOutlined, BulbOutlined, FundOutlined, MenuOutlined} from "@ant-design/icons"
import icon from "../images/cryptocurrency.png";
import { myContext } from '../App';

const NavBar = ({activeMenu}) => {

    const menuContext = useContext(myContext)
    const {menuIsClicked, setMenuIsClicked, marginTop, setMarginTop} = menuContext
    
    const [closedMenu, setClosedMenu] = useState(false)
    const navbarListContainer = useRef()
    const navbarList = useRef()
    const constNav = useRef()

    useEffect(() => {
      const navbarListHeight = navbarList.current.menu.list.getBoundingClientRect().height;
      const constNavHeight = constNav.current.getBoundingClientRect().height;
      if (menuIsClicked) {
        navbarListContainer.current.style.height = 0;
        // The height of the navigation bar
        setMarginTop(constNavHeight)
      } else {
        navbarListContainer.current.style.height = `${navbarListHeight}px`;
        setMarginTop(`${navbarListHeight + constNavHeight}px`)
      }
    }, [menuIsClicked])

    function getItem(label, key, icon, children, type) {
        return {
          key,
          icon,
          children,
          label,
          type,
        };
      }

      const items = [
        getItem((<Link to='/'>Home</Link>), 'sub1', <HomeOutlined/>),
        getItem((<Link to='/cryptocurrencies'>Cryptocurrencies</Link>), 'sub2', <FundOutlined />),
        getItem((<Link to='/news'>News</Link>), 'sub4', <BulbOutlined />),
      ];

  return (
    <div className="nav-container">
        <div className='logo-container' ref={constNav}>
            <>
              <Avatar src={icon} size="large"/>
                {activeMenu && <Typography.Title level={2} className="logo">
                    <Link to="/">Cryptoverse</Link>
                </Typography.Title>}
                {!activeMenu && <MenuOutlined onClick={() => setMenuIsClicked(!menuIsClicked)} className='menu-burger'/>}
            </>
        </div>
        <div className='navbar-list-container' ref={navbarListContainer} style={{overflow: "hidden", transition: "all ease-in-out .4s"}}>
        <Menu
            ref={navbarList}
            className="nav-items"
            theme='dark'
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            mode="inline"
            items={items}
        />
        </div>
    </div>
  )
}

export default NavBar
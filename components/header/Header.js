import Link from "next/link";

import style from "./styleHeader.module.css";
import Image from "next/image";
import Search from "./../search/Search";
import LKHeader from "./../LKHeader/LKHeader";
import {names} from "./../../constants/general";
import React, { useState} from "react";

const searchStyle = {
  display: "flex",
  color: "blue",
  flexGrow: 1,
};
 


function Menu(props) {
  const [showMenu, setShowMenu] = useState(false);

   const invokeMenu = ()=> {
     setShowMenu(!showMenu);
     props.invokeMenuMobile(!showMenu)
   }
  
  const myLoader = ({ src, width, quality, height }) => {
    return `/${src}?w=${width}&h=${height}&q=${quality || 75}`;
  };

  return (
    <>
      <div className={style.head}>
        <div className={style.logo}>
          <Link href="/">{names.siteName}</Link>
        </div>
         <div style={searchStyle} >
            <Search />
          </div> 
        <div className={style.headLK}>
          <LKHeader />
        </div>
      </div>

      <div className={style.headMobile}>
        <div className={style.logoMobile}>
          <div className={style.headMenu}  onClick={()=>invokeMenu()} >
            <button
                className={style.header__burger}
                type="button"
              >
                <Image
                  loader={myLoader}
                  src="./images/Hamburger_icon.svg"
                  alt="search"
                  width={50}
                  height={50}
                />
              </button>
          </div>
          
          <div className={style.headLink}> 
            <Link href="/">{names.siteName}</Link>
          </div>
        </div>
        <div className={style.headLKMobile}>
          <LKHeader />
        </div>
      </div>
      {/* <div className={style.MobileHead}>
        
      <div className={style.headMenu}>
        <button
          className={style.header__burger + " " + style.js_burger_to_sidebar}
          type="button"
        >
          <Image
            loader={myLoader}
            src="./images/Hamburger_icon.svg"
            alt="search"
            width={26}
            height={26}
          />
        </button>
        </div>

        <div className={style.logo}>
          <Link href="/">{names.siteName}</Link>
        </div>
        <div style={lk}>
          <LKHeader />
        </div>
      </div> */}
    </>
  );
}

export default Menu;

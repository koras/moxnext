import Link from "next/link";

import style from "./styleHeader.module.css";
import Image from "next/image";
import Search from "./../search/Search";
import LKHeader from "./../LKHeader/LKHeader";

const searchStyle = {
  display: "flex",
  color: "blue",
  flexGrow: 1,
};

const lk = {
  color: "blue",
  width: "250px",
};

function Menu() {
  const myLoader = ({ src, width, quality, height }) => {
    return `/${src}?w=${width}&h=${height}&q=${quality || 75}`;
  };

  return (
    <>
      <div className={style.head}>
        <div className={style.logo}>
          <Link href="/">MoexBox</Link>
        </div>
         <div style={searchStyle} >
            <Search />
          </div> 
        <div style={lk}>
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
          <Link href="/">MoexBox</Link>
        </div>
        <div style={lk}>
          <LKHeader />
        </div>
      </div> */}
    </>
  );
}

export default Menu;

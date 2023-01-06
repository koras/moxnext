 
import Link from 'next/link'
  
  import style from'./styleHeader.module.css';
   
  import Search from './../search/Search';
  import LKHeader from './../LKHeader/LKHeader';
   
  const searchStyle = {
    
    display: 'flex',
    color: 'blue',
    flexGrow: 1, 
  };
  
  const lk = {
    color: 'blue',
    width: '250px', 
  };
  
  function Menu() {
    return ( 
        <div className={style.head}>
          <div className={style.logo} >
            <Link href="/">MoexBox</Link>
          </div>
          <div style={searchStyle} >
            <Search />
          </div>
          <div  style={lk} >
            <LKHeader/>
          </div>
        </div> 
    );
  }
  
  export default Menu;
  
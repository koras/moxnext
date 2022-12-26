 
import Link from 'next/link'
  
  //import './styleHeader.css';
   
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
        <div className="head">
          <div className="logo" >
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
  
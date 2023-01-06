 
// import {
//   useLocation,    matchPath
// } from "react-router-dom"; 
import style from './styleMenu.module.css';
 

import Link from 'next/link'
 


function Menu() {
 // const location = useLocation();

//  console.log(location);
 // console.log(location.pathname);
    //const  routeF = matchPath(this.props.location, 'inspect')
 // console.log(routeF );
//   console.log(matchPath(location.pathname,'inspects'))
  return ( 
    <div className={style.menu}> 
      <ul>
          <li>
            <Link href="/dashboard">Анализировать</Link>
          </li>
          <li>
            <Link href="/inspects">Модерировать</Link>
          </li>
          <li>
            <Link href="/#">Отслеживать</Link>
          </li>
        </ul> 
     </div> 
  );
}

export default Menu;

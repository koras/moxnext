 
// import {
//   useLocation,    matchPath
// } from "react-router-dom"; 
import style from './styleMenu.module.css';
import { useSession, signIn, signOut } from "next-auth/react";
 

import Link from 'next/link'
{/* <button onClick={() => signOut()}>Sign out</button> */}

function MenuMobile() { 
  return ( 
    <div> 
    <div className={style.menuMobile}> 
      <ul>
          <li>
            <Link href="/dashboard">Анализировать</Link>
          </li>
          {/* <li>
            <Link href="/inspects">Модерировать</Link>
          </li> */}
          {/* <li>
            <Link href="/#">Отслеживать</Link>
          </li> */}
        </ul> 
      </div> 
      
      {/* <div className={style.menu +" "+style.adminMenu}> 
      <ul>
          <li>
            <Link href="/users">Пользователи</Link>
          </li> 
        </ul> 
      </div>  */}
     </div>
  );
}

export default MenuMobile;

 
 

//import './styleSearch.css';
import Image from 'next/image'
import icon from './Vector_search_icon.svg';
 
import styles from './style.module.css'; 


const myLoader = ({ src, width, quality,height }) => {
  return `/${src}?w=${width}&h=${height}&q=${quality || 75}`
}


function Search() {

  return ( 
    <div className={styles.searchBox}> 
      {/* <div className={styles.searchBox__light}> 
          <div className={styles.searchBox__icon}>
            
            <Image
              loader={myLoader}
              src='./images/Vector_search_icon.svg'
              alt="search"
              width={26}
              height={26}
            />
            
          </div>
          <div className={styles.searchBox__input}>
            <input type="text" name="search" placeholder="Ведите название тикера или компании"/>
            </div>
          <div className={styles.searchBox__disable}>x</div>
      </div>  */}
     </div> 
  );
}

export default Search;

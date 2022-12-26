 
 

//import './styleSearch.css';
 
import icon from './Vector_search_icon.svg';
 
function Search() {
  return ( 
    <div className="search-box"> 
      <div className="search-box__light"> 
          <div className="search-box__icon"><img src={icon} alt="React Logo" /></div>
          <div className="search-box__input"><input type="text" name="search" placeholder="Ведите название тикера или компании"/></div>
          <div className="search-box__disable">x</div>
      </div> 
     </div> 
  );
}

export default Search;

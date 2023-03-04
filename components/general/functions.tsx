 
  
  const getPercent = (_priceDate: any, _priceCurrent: any) => {
    if (_priceCurrent >= _priceDate) {
      // цена выросла
      if (_priceCurrent != 0) {
        const mount = (_priceCurrent - _priceDate) / (_priceCurrent / 100);
        return '+' + parseInt(mount);
      }
    } else {
      // цена упала
      if (_priceDate != 0) {

        const mount = (_priceDate - _priceCurrent) / (_priceDate / 100);

        return '-' + parseInt(mount)
      }
    }
    return "+0";
  }
export {  getPercent };

 
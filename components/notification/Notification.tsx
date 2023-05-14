import { useState } from 'react';
import style from './styleNotification.module.css';

const Notification = ({ showNotification, message }: { showNotification: boolean, message: string })  => {
  // const [showNotification, setShowNotification] = useState(true);
  // setTimeout(() => {
  //   setShowNotification(false);
  // }, 1000); 
 
  return (
    <>
     
      {showNotification && (
        <div className={style.notification}>
           <p>{message}</p> 
        </div>
      )}
    </>
  );
}

export default Notification;
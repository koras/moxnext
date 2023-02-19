 
import { useNavigate } from "react-router-dom";
import   {   useEffect } from "react";
import styles from"./stylesModal.module.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import {
  useRouter
} from 'next/router'

export default  (props:any) => { 
  const router:any = useRouter();
  
    const toInstrument = () => {
      router.push("/dashboard");
    // router.push("/dashboard/" + props.instrument.type + "/" + props.instrument.ticker);
    };
  // /instrument/edit/16

  const toBack = () => {
//    router.push("/instrument/edit/" + props.instrument.instrument_id);
    router.reload(window.location.pathname)
  // router.push("/dashboard/" + props.instrument.type + "/" + props.instrument.ticker);
  };
  // /instrument/edit/16
  
  const toChart = () => {
 //   router.push("/dashboard");
   router.push("/" + props.instrument.type + "/" + props.instrument.ticker);
  };

  const sendEvent = () => {
    props.close(false)
    props.setLoad(false);
    router.push(`/event/change/${props.server.hash}`);
  };

  return (
    <div className={styles.formModal}>
      <div className={styles.formModalHead}>Инструмент сохранён</div>
      {/* <a className="close"  onClick={closeModal}>
        &times;
      </a> */}
      <div className={styles.formModalBody}>
        <p>Спасибо, что вы добавили событие.</p>
        <p>
           
        </p> 
      </div>
      <div className={styles.formModalButtons + " "+ styles.buttonRight}>
  
      <button
          type="button"
          onClick={toBack}
          className="btn btn-primary"
        >
          Вернуться
        </button>

        <button
          type="button"
          onClick={toInstrument}
          className="btn btn-primary"
        >
          К анализу
        </button>
        <button
          type="button"
          onClick={toChart}
          className="btn btn-primary"
        >
          График
        </button>

      </div>
    </div>
  );
}; 

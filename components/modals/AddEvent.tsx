 
import { useNavigate } from "react-router-dom";

import styles from"./stylesModal.module.css";
//import "bootstrap/dist/css/bootstrap.min.css";
import {
  useRouter
} from 'next/router'

export const AddEvent = (props:any) => { 
 const router:any = useRouter();
 
  const toInstrument = () => {
    router.push("/" + props.instrument.type + "/" + props.instrument.ticker);
  };

  const sendEvent = () => {};

  return (
    <div className={styles.formModal}>
      <div className={styles.formModalHead}>Событие отправлено на проверку</div>
      {/* <a className="close"  onClick={closeModal}>
        &times;
      </a> */}
      <div className={styles.formModalBody}>
        <p>Спасибо, что вы добавили событие.</p>
        <p>
          События помогают анализировать прошлое инструмента. На основе прошлого
          можно строить предположения о будущем цены.
        </p>
        <p>
          После успешной проверки события другими участниками сообщества,
          событие будет добавлено на график, а вам будет добавлен рейтинг нашего
          сообщества
        </p>
      </div>
      <div className={styles.formModalButtons + " "+ styles.buttonRight}>
        <button type="button" onClick={sendEvent} className="btn btn-primary">
          Отредактировать событие
        </button>
        <button
          type="button"
          onClick={toInstrument}
          className="btn btn-primary"
        >
          К инструменту
        </button>
      </div>
    </div>
  );
};

export default AddEvent;

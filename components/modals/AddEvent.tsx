 
import { useNavigate } from "react-router-dom";

import style from"./stylesModal.module.css";
//import "bootstrap/dist/css/bootstrap.min.css";

export const AddEvent = (props:any) => {
  const navigate = useNavigate();

 
  const toInstrument = () => {
    navigate("/" + props.instrument.type + "/" + props.instrument.ticker);
  };

  const sendEvent = () => {};

  return (
    <div className="form-modal">
      <div className="form-modal-head">Событие отправлено на проверку</div>
      {/* <a className="close"  onClick={closeModal}>
        &times;
      </a> */}
      <div className="form-modal-body">
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
      <div className="form-modal-buttons button-right">
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

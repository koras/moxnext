// http://localhost:3000/event/create/btc

import Head from 'next/head'

import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment'; 

import 'moment/locale/ru';

import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from 'tinymce';
 
import styles from './../style_form.module.css'
import React, { useState, useEffect, useRef } from "react";

import Datetime from 'react-datetime';
import { eventsName } from "../../../constants/general";

import ContentBox from "../../../components/ContentBox";
import AddEvent from "../../../components/modals/AddEvent";
import Notification from "../../../components/notification/Notification";

 
import  {notificationStore}  from "../../../stories/notificationStore";

 


import { useRouter } from 'next/router'

export default function TickerUrlIndex() {

  const addNotification = notificationStore((state:any) => state.addNotifications);

  const [isload, setLoad] = useState(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidSource, setIsInvalidSource] = useState(false);
  const [isInvalidText, setIsInvalidText] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [errorFulltext, setErrorFulltext] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [pricesDate, setPricesDate] = useState(Array);
  const [serverResponse, setServerResponse] = useState({});
  const [showSendButton, setShowSendButton] = useState(true);
  const [open, setOpen] = useState(false);
  const [fulltext, setFullText] = useState("");
  const [title, setTitle] = useState("События графика");
  const [errors, setErrors] = useState(Array);


  interface InfoType {
    title: string;
    typeId: number;
    date: string;
    source: string;
    shorttext: string;
    fulltext: string|undefined;
    instrument_id: string;
  }

  const [getData, setData] = useState<InfoType>({
    title: "",
    typeId: 0,
    date: moment().format("DD/MM/YYYY"),
    source: "",
    shorttext: "",
    fulltext: "",
    instrument_id: "",
  });


  const textareaEl = useRef<Editor | null>(null);



  const getType = () => {

    const res = eventsName.filter((option: any) => {
      if (getData) {
        return option.value === +getData.typeId;
      }
    })
    return (res) ? res : {};

  };
  let ticker: any = null;
  let url: any = null;


  const router = useRouter(); 

  const { action, tickerUrl } = router.query

  if (router.isReady) {
    if (tickerUrl && tickerUrl.length > 0) {
      ticker = tickerUrl[0];
    }

    if (tickerUrl && tickerUrl.length > 1) {
      url = tickerUrl[1];
    }
  }

  useEffect(() => {
    let urlRequest = "";
    const getEvent = async (action: any, tickers: string, urls: any) => {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json, text/plain, */*',
      }
      console.log('action', action)

        urlRequest = process.env.NEXT_PUBLIC_SERVER_URL +`/event/${action}/${tickers}`;

      console.log('urlRequest ', urlRequest);
      fetch(urlRequest, { headers })
        .then((response: any) => {
          return response.json()
        })
        .then((data: any) => {
          console.log(data);

          console.log( data.data.date);

          setData({ ...data.data, instrument_id: data.instrument.instrument_id });
          // отдельно
          setFullText(data.data.fulltext);
          setInstrument(data.instrument);
          setLoad(true);
          updateTitle(action, data.instrument)
          
          let chartDate = [];
          for(const dt of data.date ){
            chartDate.push(dt.Date);
          }
          setPricesDate(chartDate) 

        }).catch(function (error) {
          console.log("Ошибка обработана, продолжить работу ", error);
        });
      console.log('result');
    };

    if (router.isReady && !isload) {
      getEvent(action, ticker, url);
    }
 
  
  });


  const changeStatePopup =(params:boolean)=>{

  setOpen(params);
  }


  const handleEditorChange = (content: string, editor: any) => {
    setData({ ...getData, fulltext: content });

    if (!writeForm) {
      return true;
    }

    setData({ ...getData, fulltext: content });



    const element = editor.getContainer();
    if (element) {
      if (content.length < 200) {
        element.style.border = "1px solid red";
      } else {

        element.style.border = "1px solid #ced4da";
      }
    }

  };

  const updateTitle = (action: any, instrument: any) => {
    if (action === "change") {
      setTitle('Изменение события на графике : ' + instrument.instrument_name);
      return '';
    }

    if (action === "create") {
      setTitle('Добавление нового события на график : ' + instrument.instrument_name);
      return;

    }
    return 'События ';
  }





  let news: any = {};


  const closeModal = () => {
    setOpen(false)
  };

  const getValidateType = () => {
    if (!writeForm) {
      return true;
    }
    return getData.typeId != 0;
  }
  const handleDateSelect = (info: any) => {


  }


  const getDate = () => {
    if (getData) {
      return moment(getData.date, 'DD/MM/YYYY').toDate()
    }
  }
  // ПРоверяем условия
  const validation = () => {

    const fulltextLocal = textareaEl?.current?.editor?.getContent()

    setWriteForm(true);
    setIsInvalidTitle(false);
    setIsInvalidSource(false);
    setIsInvalidText(false);


    let isInvalidTitle = true;
    let isInvalidSource = true;
    let isInvalidText = true;
    let isInvalidFulltext = true;


    if (!getData.title || (getData.title && getData.title.length < 10)) {
      setIsInvalidTitle(true);
      console.log('bug 1');
      isInvalidTitle = false;
    }

    if (getData.typeId === 0) {

      console.log('bug 2');
    }

    if (!getData.source || (getData.source && getData.source.length < 10)) {
      isInvalidSource = false;
      setIsInvalidSource(true);
      console.log('bug 3');
    }
    if (!getData.shorttext || (getData.shorttext && getData.shorttext.length < 10)) {
      setIsInvalidText(true);
      isInvalidText = false;
      console.log('bug 4');
    }

    //   console.log('fulltext',fulltext);

    setData({ ...getData, fulltext: fulltextLocal });

    if (!fulltextLocal || (fulltextLocal && fulltextLocal.length < 190)) {
      isInvalidFulltext = false;
      setErrorFulltext(true);
      console.log('bug 5 ', fulltextLocal);
      console.log
    }

    if (isInvalidTitle && isInvalidSource && isInvalidText && isInvalidFulltext) {
      setShowSendButton(false);
      console.log('bug 5');
      return true;
    }
    return false;

  };






  const getValidFullContent = (editor: any) => {
    editor.on("click", (e: any) => {
      const element = editor.getContainer();
      if (element) {
        if (errorFulltext) {
          element.style.border = "1px solid green";
        }
      }
    });
  }



  const sendEvent = async () => { 

    setErrors([]);
    const current = textareaEl?.current?.editor?.container;

    if(current && current.style){ 
      current.style.border = "1px solid red";
    }
  //  console.log('textareaEl.current');
 //   console.log(textareaEl.current.editor);

  //  if(textareaEl && textareaEl.current && textareaEl.current.currentContent){

      // console.log('textareaEl.current');
      // console.log(textareaEl.current.editor?.getContent());
      // console.log(textareaEl.current.currentContent);
    const fulltextLocal = textareaEl?.current?.editor?.getContent()
      setData({ ...getData, fulltext: fulltextLocal});
  //  } 
 


    console.log(getData,instrument)
    
    if (validation()) {
      //   const hash = news.saveEvent(news.eventNew);
      console.log('getData')
      console.log(getData,instrument)
      const responses = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/event/save`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //  mode: 'cors', // no-cors, *cors, same-origin
     //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     //   credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
      //  redirect: 'follow', // manual, *follow, error
       // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
        body: JSON.stringify(getData) // body data type must match "Content-Type" header
      })
      .then((response) => {

        return response.json();
      }
      )
    //  .then((json) => setData(json))
      .catch((error) => {
        console.log( 'error 1');
        console.log( error);
      }
      
    //  setError(error)
      );





      // responses.then((json:any) => setData(json))
      // .catch((error:any) => {
      //   console.log( 'error');
      //   console.log( error);
      // })
      
     
      if (responses.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await responses.json();
     //   console.log(json);
      //  return json;
        setServerResponse(json);
        setOpen(true)
      } else {
        
        console.log("Ошибка HTTP: " );
        console.log( responses.errors);

        let dataErrors = responses.errors.map((item:any)=>{ return item.message });
        setErrors(dataErrors);

        addNotification({ messages: dataErrors, type: 'error' });
  
        setErrors(responses.errors);
    //    console.log( responses.data.message);
    //    console.log( responses.data.message);
      } 
      



    //  const response = await createEvent(getData)
  
      console.log(serverResponse);
      
    }
  };

  const textButton = () => {
    return 'Предложить изменение';
  }

  const getButton = () => {
    //  if (showSendButton) {
    return <button type="button" onClick={sendEvent} className="btn btn-primary">{textButton()}</button>
    //  }
    return <></>;
  }

  // меняем тип события
  const changeTypeEvent = (value: any) => {
    setData({ ...getData, typeId: value.value });
  }

  const setDateEvent = (value: any) => {
    news.eventDate = moment(value).format("DD/MM/YYYY");
    const eventDate = moment(value).format("DD/MM/YYYY");
    setData({ ...getData, date: eventDate });
  }


  const changeEventSource = (value: string) => {
    // setSource(value);
    setData({ ...getData, source: value });
  }
  // устанавливаем название события
  const changeEventText = (value: string) => {

    setData({ ...getData, shorttext: value });
  }

  const isValidDate = (status: boolean) => {
    //   console.log(status);
    return status;
    //   setData({...getData, title:text});
  }

  const changeEventName = (value: any) => {
    setData({ ...getData, title: value });
  }

  var valid = (current: any) => {
    // выбрать можно только день торгов.
    const dt = current.format("YYYY-MM-DD")
    return pricesDate.includes(dt);
    return current.day() == 0 && current.day() != 8;
  };





  if (router.isReady && isload) {
//    open={open}
    return (
      <> 
        {/* <div className={styles.notificationContainer}> 
          <div className={styles.notificationContainerChild}> 
            {errors && errors.map((item: any, i: any) => (
              <Notification key={i} item={item}  message={item.message} />
            ))}
          </div>
        </div> */}
        <ContentBox title={title} ticker="">
        
       

          <Popup open={open}
            closeOnDocumentClick={false}
            onClose={closeModal}>
            <AddEvent 
            setLoad={setLoad}
            server={serverResponse}
            close={changeStatePopup}
            instrument={instrument} />
          </Popup>
          
          <Form className={styles.formContent}>
            <div className={styles.rowForm}>
              <div className={styles.rowFormLine}>
                <div className={styles.formBlock25}>
                  <label>Событие:</label>
             
                  <Select
                    styles={{
                      control: (baseStyles, state) => ({
                        ...baseStyles,
                        borderColor: getValidateType() ? '#ced4da' : 'red',
                      }),
                    }}
                    id={'id'}
                    instanceId={'instanceId'}
                    value={getType()}
                    className={styles.formSelect}
                    placeholder={"Что произошло?"}
                    onChange={(value) => changeTypeEvent(value)}
                    options={eventsName}
                  />
                </div>

                <div className={styles.formBlock25}>
                  <label>Дата события:</label>
                  <Datetime
                    value={getDate()}
                    isValidDate={valid}
                    timeFormat={false}
                    closeOnSelect={true}
                    closeOnClickOutside={true}
                    dateFormat='DD/MM/yyyy'
                    initialViewMode="days"
                    inputProps={{
                      placeholder: "DD/MM/yyyy",
                      required: true,

                    }}

                    onChange={(date: any) => setDateEvent(date)}

                  />
                </div>
              </div>
            </div>

            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Короткое название:</label>
                <Form.Control
                  id={'text'}
                  onChange={(text: any) => changeEventName(text.target.value)}
                  value={getData.title}
                  type="text"
                  aria-errormessage="asdasd"
                  maxLength={250}
                  isInvalid={isInvalidTitle}
                  placeholder="Сплит акций, выход отчётности за квартал, выплата девидендов" />
              </div>
            </div>

            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Источник:</label>
                <Form.Control
                  isInvalid={isInvalidSource}
                  onChange={(text: any) => changeEventSource(text.target.value)}
                  value={getData.source}
                  placeholder="http://" />
              </div>
            </div>

            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Короткое описание:</label>
                <Form.Control
                  value={getData.shorttext}
                  isInvalid={isInvalidText}
                  onChange={(text: any) => changeEventText(text.target.value)}

                  as="textarea"
                  rows={3}
                  placeholder="Объявление девидендов в 135 рублей на акцию"
                />
              </div>
            </div>

            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Полное описание:</label>
                <Editor
                  ref={textareaEl}
                  id={'editor'}
                  tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
                  apiKey="5kp3x2dadjoph5cgpy61s3ha1kl7h6fvl501s3qidoyb4k6u"
                  initialValue={fulltext}
                  //  onInit={(evt, editor) => editorRef.current = editor}
                  init={{
                    placeholder: "Подробное описание события",
                    extended_valid_elements: "br[*],p,b,",
                    entity_encoding: "raw",
                    height: 400,
                    width: "100%",
                    menubar: false,
                    resize: false,
                    branding: false,
                    plugins: [
                      " wordcount",
                    ],
                    toolbar: "formatselect |  bold italic ",
                    content_style:
                      "body {  font-size:17px }",
                    paste_as_text: true,
                    setup: (editor: any) => getValidFullContent(editor)
                  }}
                  onEditorChange={handleEditorChange}
                />
              </div>
            </div>
            <div className="row-form">
              <div className={styles.formBlock100 + " " + styles.buttonRight}>
                {getButton()}
              </div>
            </div>
          </Form>
        </ContentBox>
      </>
    );

  }
  return <>load page</>;
}

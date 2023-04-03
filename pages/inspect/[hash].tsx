// http://localhost:3000/event/create/btc

import Head from 'next/head'

import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment';
//  https://www.npmjs.com/package/react-diff-viewer
//import  { diffWordsWithSpace, diffChars, diffWords } from "react-diff-viewer";
import  ReactDiffViewer,{  DiffMethod,  } from "react-diff-viewer";


import  { diffWordsWithSpace, diffChars, diffWords } from "diff";

import parse from "html-react-parser";

import 'moment/locale/ru';

import { Editor } from "@tinymce/tinymce-react";
import { Editor as TinyMCEEditor } from 'tinymce';
 
import styles from './../event/style_form.module.css'

import stylesInspect from './styleInspect.module.css'

 
import React, { useState, useEffect, useRef } from "react";

import Datetime from 'react-datetime';
import { eventsName } from "../../constants/general";

import ContentBox from "../../components/ContentBox";
import AddEvent from "../../components/modals/AddEvent";


import { useRouter } from 'next/router'

export default function Index() {

  const [isload, setLoad] = useState(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidSource, setIsInvalidSource] = useState(false);
  const [isInvalidText, setIsInvalidText] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [errorFulltext, setErrorFulltext] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [pricesDate, setPricesDate] = useState(Array);
  const [serverResponse, setServerResponse] = useState({});
 
  const [title, setTitle] = useState("События графика");

 
  const [storeNew, setEventNew] = useState(); 
  const [storeOld, setEventOld] = useState(); 

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

 

  const diffViewer  = (textNew:string,textOld:string) => {
 
    let diffTexts = diffWords(textNew,textOld)

    let result = "";
    if (diffTexts.length > 1) {
      result += `<span class="diffAdded">${textOld}</span><br>`;
      result += `<span class="diffRemove">${textNew}</span>`;
    } else {
      result = `<span class="diffDefault">${textOld}</span>`;
    }
    return parse(result);
  }
  
  const getFullText = ()  => {
     let textNew2 = storeNew.Fulltext.replace(/<\/p>/g, "</p>\n").replace(/<\/?[^>]+(>|$)/g, "");
      let  textOld2 = storeOld.Fulltext.replace(/<\/p>/g, "</p>\n").replace(/<\/?[^>]+(>|$)/g, "");
    const diffTexts = diffWords(textNew2, textOld2);
    return updateText(diffTexts);
  };


  const getType = () => {

    const res = eventsName.filter((option: any) => {
      if (getData) {
        return option.value === +getData.typeId;
      }
    })
    return (res) ? res : {};

  };

  const router = useRouter(); 
  console.log(' router.query', router.query);
  const { hash } = router.query

  if (router.isReady) {
     console.log(' hash', hash);
  }

  useEffect(() => {
    let urlRequest = "";
    const getEvent = async (hash: any) => {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json, text/plain, */*',
      }
        urlRequest = process.env.NEXT_PUBLIC_SERVER_URL +`/event/inspect/${hash}`;
      fetch(urlRequest, { headers })
        .then((response: any) => {
          return response.json()
        })
        .then((data: any) => {           
          setEventOld(data.event_old) 
          setEventNew(data.event_new) 
          setInstrument(data.instrument);
          setLoad(true);

        }).catch(function (error) {
          console.log("Ошибка обработана, продолжить работу ", error);
        });
      console.log('result');
    };

    if (router.isReady && !isload) {
      getEvent( hash);
    }
 
  
  });



  const getDate = () => {
    const diffTexts = diffChars(storeNew.date, storeOld.date);
    return updateText(diffTexts);
  };

  const updateText = (diffTexts:any) => {
    let result = "";
      console.log(storeOld,diffTexts[0].value,diffTexts.length);
    if( diffTexts.length === 1  ){
      console.log(diffTexts[0].value);
      result = `<span class="diffDefault">${diffTexts[0].value}</span>`;
    }else{ 
      for (const item of diffTexts) {
   
        if (item.added) {
          result += `<span class="diffAdded">${item.value}</span>`;
        } else if (item.removed) {
          result += `<span class="diffRemove">${item.value}</span>`;
        } else {
          result += `<span class="diffDefault">${item.value}</span>`;
        }
      }
      result = result.replace(/\n/g, "<br/>");
    }
    return parse(result);
  };


  const changeStatePopup =(params:boolean)=>{

  //setOpen(params);
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

  const updateTitle = (action: any) => {
    return 'События ';
  }
  let news: any = {};
  const closeModal = () => {
    //setOpen(false)
  };

  const getValidateType = () => {
    if (!writeForm) {
      return true;
    }
    return getData.typeId != 0;
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
    const current = textareaEl?.current?.editor?.container;

    if(current && current.style){ 
      current.style.border = "1px solid red";
    }
 
    
    const fulltextLocal = textareaEl?.current?.editor?.getContent()
      setData({ ...getData, fulltext: fulltextLocal});
  //  } 
 


    console.log(getData,instrument)
    
    if (validation()) {
      //   const hash = news.saveEvent(news.eventNew);
      console.log('getData')

 
      console.log(getData,instrument)

      const responses = await fetch(process.env.NEXT_PUBLIC_SERVER_URL + `/event/save`, {
        method: 'POST', 
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(getData) // body data type must match "Content-Type" header
      }) 
      
     
      if (responses.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await responses.json();
     //   console.log(json);
      //  return json;
        setServerResponse(json);
       
      } else {
        alert("Ошибка HTTP: " + responses.status);
    
        
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
 
  const getText = () => {
    const diffTexts = diffWordsWithSpace(storeNew.shorttext, storeOld.shorttext);
    return updateText(diffTexts);
  };
  const getTitle = () => {
    const diffTexts = diffWords(storeNew.title, storeOld.title);
    return updateText(diffTexts);
  };
  const getSource = () => {
    const textOld = storeNew.source;
    const textNew = storeOld.source;
    const diffTexts = diffWords(textNew, textOld);
    let result = "";
    if (diffTexts.length > 1) {
      result += `<span class="diffAdded">${textOld}</span><br>`;
      result += `<span class="diffRemove">${textNew}</span>`;
    } else {
      result = `<span class="diffDefault">${textOld}</span>`;
    }
    return parse(result);
  };

  if (router.isReady && isload) {
//    open={open}
    return (
      <>
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
               
              <div className={stylesInspect.rowFormFulltext +" "+ stylesInspect.rowFormText}>{getType()}</div>
            </div>

            <div className={styles.formBlock25}>
              <label>Дата события:</label>
              <div className={stylesInspect.rowFormFulltext +" "+ stylesInspect.rowFormText}>{getDate()}</div>
            </div>
          </div>
        </div>

        <div className={stylesInspect.rowForm}>
          <div className={stylesInspect.formBlock100}>
            <label>Короткое название:</label>
            <div className={stylesInspect.rowFormFulltext +" "+ stylesInspect.rowFormText}>{getTitle()}</div>
          </div>
        </div>

        <div className={stylesInspect.rowForm}>
          <div className={stylesInspect.formBlock100}>
            <label>Источник:</label>
            <div className={stylesInspect.rowFormFulltext +" "+ stylesInspect.rowFormText}>{getSource()}</div>
          </div>
        </div>



        <div className={stylesInspect.rowForm}>
          <div className={stylesInspect.formBlock100}>
            <label>Короткое описание:</label>
            <div className={stylesInspect.rowFormFulltext +" "+ stylesInspect.rowFormText}>{getText()}</div>
          </div>
        </div>

        <div className={stylesInspect.rowForm}>
          <div className={stylesInspect.formBlock100}>
            <label>Полное описание:</label>
            <div className={stylesInspect.rowFormFulltext}>{getFullText()}</div>
          </div>
        </div>
       
       
       
       
        <div className={stylesInspect.rowForm}>
         
          <div className={stylesInspect.formBlock100 +" "+stylesInspect.buttonRight+" "+stylesInspect.inspectButtons}>
            <label>Ваше решение:</label>
            <button
              title="После нескольких жалоб текст будет скрыт"
              type="button"
              onClick={sendEvent}
              className="btn btn-danger"
            >
              Пожаловаться
            </button>
            <button
              type="button"
              onClick={sendEvent}
              title="Предложить автору доработать текст"
              className="btn btn-warning"
            >
              На доработку
            </button>
            <button
              title="Текст полностью готов для публикации"
              type="button"
              onClick={sendEvent}
              className="btn btn-success"
            >
              Одобрить
            </button>
          </div>
        </div>
      </Form>


        </ContentBox>
      </>
    );

  }
  return <>load page</>;
}

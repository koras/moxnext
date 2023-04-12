// http://localhost:3000/event/create/btc

import Head from 'next/head'

import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment';
//  https://www.npmjs.com/package/react-diff-viewer
//import  { diffWordsWithSpace, diffChars, diffWords } from "react-diff-viewer";
import  ReactDiffViewer,{  DiffMethod,  } from "react-diff-viewer";


import  { diffWordsWithSpace, diffChars, diffWords,diffLines } from "diff";

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

  interface InfoType {
    fulltext: string,
    title: string,
    type_id: string,
    user_id: string,
    hash: string,
    event_id: string,
    source: string,
    slug: string,
    instrument_id: string,
    date: string,
    shorttext: string,
    parent_event_id: string, 
    published: string,
  }

  const [storeNew, setEventNew] = useState<InfoType | null>(null); 
  const [storeOld, setEventOld] = useState<InfoType | null>(null); 

 
 

  const textareaEl = useRef<Editor | null>(null);

 

  const diffViewer  = (textNew:string,textOld:string) => {
 
    let diffTexts = diffLines(textNew,textOld)

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
    if(storeNew && storeNew.fulltext && storeOld && storeOld.fulltext){ 
        let textNew2 = storeNew.fulltext.replace(/<\/p>/g, "</p>\n").replace(/<\/?[^>]+(>|$)/g, "");
          let  textOld2 = storeOld.fulltext.replace(/<\/p>/g, "</p>\n").replace(/<\/?[^>]+(>|$)/g, "");
        const diffTexts = diffLines(textNew2, textOld2);
        return updateText(diffTexts);
      }else if(storeNew && storeNew.fulltext){ 
        let textNew2 = storeNew.fulltext.replace(/<\/p>/g, "</p>\n").replace(/<\/?[^>]+(>|$)/g, "");
       
        const diffTexts = diffLines(textNew2, "");
        return updateText(diffTexts);
      } 
      
      return "";
  };


  const getType = () => {
    const tipeOld = eventsName.find((option: any) => {
      if (storeOld) {
        return option.value === +storeOld.type_id;
      }
    })
    const tipeNew = eventsName.find((option: any) => {
      if (storeNew) {
        return option.value === +storeNew.type_id;
      }
    })

    if(tipeOld && tipeOld.label && tipeNew && tipeNew.label){ 
      const diffTexts = diffLines(tipeOld.label,tipeNew.label);
        return updateText(diffTexts);
    }else if( tipeNew && tipeNew.label){ 
      const diffTexts = diffLines(tipeNew.label,"");
      return updateText(diffTexts);
    } 
    return null;
  };

  const router = useRouter(); 
  
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

    };

    if (router.isReady && !isload) {
      getEvent( hash);
    }
  });



  const getDate = () => {
    if(storeNew && storeNew.date && storeOld && storeOld.date){ 
      const diffTexts = diffLines(storeNew.date, storeOld.date);
      return updateText(diffTexts);
    }else  if(storeNew && storeNew.date){ 
      const diffTexts = diffLines(storeNew.date, "");
      return updateText(diffTexts);
    }
    return "";
  };

  const updateText = (diffTexts:any) => {
    let result = "";

    if( diffTexts.length === 1  ){
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



  const sendEvent = async () => { 
    const current = textareaEl?.current?.editor?.container;

    if(current && current.style){ 
      current.style.border = "1px solid red";
    }
    const fulltextLocal = textareaEl?.current?.editor?.getContent()
   } 
 
  const getText = () => {
    if(storeNew && storeNew.shorttext && storeOld && storeOld.shorttext){ 
      const diffTexts = diffLines(storeNew.shorttext, storeOld.shorttext);
      return updateText(diffTexts);
    }else 
    if(storeNew && storeNew.shorttext ){ 
      const diffTexts = diffLines(storeNew.shorttext, "");
      return updateText(diffTexts);
    }
    return "";
  };

  const getTitle = () => {

    if(storeNew && storeNew.title && storeOld && storeOld.title){ 
      const diffTexts = diffLines(storeNew.title, storeOld.title);
      return updateText(diffTexts);
    }else if(storeNew && storeNew.title ){ 
      const diffTexts = diffLines(storeNew.title, "");
      return updateText(diffTexts);
    } 

    return "";
  };
  const getSource = () => {
    let result = "";
    if(storeNew && storeNew.source && storeOld && storeOld.source){ 
      const textOld = storeNew.source;
      const textNew = storeOld.source;
      const diffTexts = diffLines(textNew, textOld);
      if (diffTexts.length > 1) {
        result += `<span class="diffAdded">${textOld}</span><br>`;
        result += `<span class="diffRemove">${textNew}</span>`;
      } else {
        result = `<span class="diffDefault">${textOld}</span>`;
      }
      return parse(result);
    }else if(storeNew && storeNew.source ){ 
      return parse(storeNew.source);
    }
    return "";
  };

  // отправка на доработку
  const sendToRevision = () => {

  };
  // одобренный материал
  const sendApprove = () => {

  };
   


  if (router.isReady && isload) {
//    open={open}
    return (
      <>
        <ContentBox title={title} ticker="">
          {/* <Popup open={open}
            closeOnDocumentClick={false}
            onClose={closeModal}>
            <AddEvent 
            setLoad={setLoad}
            server={serverResponse}
            close={changeStatePopup}
            instrument={instrument} />
          </Popup>
          
           */}



          <Form className={styles.formContent}>
            <div className={styles.rowForm}>
              <div className={styles.rowFormLine}>
                <div className={styles.formBlock25 +" "+ stylesInspect.rowFormEvent}>
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
                  onClick={sendToRevision}
                  className="btn btn-danger">На доработку</button>
                <button
                  title="Текст полностью готов для публикации"
                  type="button"
                  onClick={sendApprove}
                  className="btn btn-success">Одобрить</button>
              </div>
            </div>
          </Form>
        </ContentBox>
      </>
    );

  }
  return <>load page</>;
}

import Head from 'next/head'
import Image from 'next/image' 
import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment';
import DatePicker from "react-datepicker"; 

import { Editor } from "@tinymce/tinymce-react";

import styles from './../styleform.module.css'
import React, {  useRef,useState } from "react";

import { eventsName } from "./../../../constants/general";
 
import ContentBox from "./../../../components/ContentBox";
import AddEvent from "./../../../components/modals/AddEvent";


import {
  useEffect
} from 'react'
import {
  useRouter
} from 'next/router' 

export default function Index() {

  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidSource, setIsInvalidSource] = useState(false);
  const [isInvalidText, setIsInvalidText] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [errorFulltext, setErrorFulltext] = useState(false);
  const [showSendButton, setShowSendButton] = useState(true);
  const [open, setOpen] = useState(false);

  
  const editorRef = useRef('chart');
  let router:any = useRouter();
  let news:any = {};
  let instrument:any = {};
   
  let storeNew:any = {};
  const { url,ticker } = router.query

  const closeModal = () => {
    setOpen(false)
  };
  const getType = () => {
    if(storeNew.id){  
        return   eventsName.filter(function(option) {
        return option.value === +storeNew.typeId;
      })
    }
  };
  const getValidateType= () => {
    if(!writeForm){
      return true;
    }
   // console.log(news.eventNew.typeId);
    if(news.eventNew.typeId){ 
      return true;
    }
    return false; 
  // return  news.storeNew.typeId !==0;
  }
  const handleDateSelect = (info:any) =>
  {
  
    //  console.log(info);
  }


  const getDate = () => {
    return moment().toDate()  ;
    if(storeNew.id){ 
      return moment(storeNew.date, 'DD/MM/YYYY').toDate()  ;
      } 
      if(news.eventDate ===''){ 
        return moment().toDate()  ;
      }else{
        return moment(news.eventDate, 'DD/MM/YYYY').toDate()  ;
      }
  }
 // ПРоверяем условия
const validation = () => {
 
  setWriteForm(true);
  setIsInvalidTitle(false);
  setIsInvalidSource(false); 
  setIsInvalidText(false);

  
  let isInvalidTitle = true;
  let isInvalidSource = true;
  let isInvalidText = true;
  let isInvalidFulltext = true;

  
  if(!news.eventNew.title  || (news.eventNew.title  && news.eventNew.title.length < 10)){ 
  
   setIsInvalidTitle(true);
   isInvalidTitle = false;
  }

  if(!news.eventNew.source  || (news.eventNew.source  && news.eventNew.source.length < 10)){ 


    isInvalidSource = false;
    setIsInvalidSource(true);
  } 
  if(!news.eventNew.text || (news.eventNew.text && news.eventNew.text.length < 10)){ 
    setIsInvalidText(true);
    isInvalidText = false;
  }
  console.log(news.eventNew.fulltext,!news.eventNew.fulltext);
  if( !news.eventNew.fulltext || (news.eventNew.fulltext && news.eventNew.fulltext.length < 190)){ 
    isInvalidFulltext = false;
    setErrorFulltext(true);
  }

  if(isInvalidTitle && isInvalidSource && isInvalidText && isInvalidFulltext){ 
    setShowSendButton(false);

    news.changeTypeEvent( storeNew.id, {});
    news.setDateEvent(storeNew.id, moment().toDate())
    console.log(news.eventNew);
    news.eventNew.fulltext =''
    news.eventNew.text =''
    news.eventNew.source = ''
    news.eventNew.title = ''
    return true;
  }

 return false;

};
   
const sendEvent = () => {
  
  if(news.eventNew.id === undefined){
    news.eventNew.date = news.eventDate
  }
  console.log(news.eventNew);
 
  news.eventNew.ticker = ticker;
 
  if(validation()){
 //   const hash = news.saveEvent(news.eventNew);
 
    //console.log('sendEvent',news.eventNew,hash)
   // return;
    setOpen(true) 
  //  navigate("/checkevent/"+news.eventNew.ticker+'/'+hash);
  }

};

  const textButton = ()=>{
    return 'Предложить изменение'; 
  }

  const getButton=()=>{
    if(showSendButton){ 
     return  <button type="button"  onClick={sendEvent} className="btn btn-primary">{textButton()}</button>
    }
      return <></> ; 
  }
  const handleEditorChange = (content:any, editor:any) => {
    //  onEditorChange={text => news.changeEventFulltext(text)}
      news.changeEventFulltext(content);
    //  console.log("Content was updated:", content);
      if(!writeForm){
       // console.log("1111Content was updated:", content);
        return true;
      }
    
      const element = editor.getContainer();
     
      if (element) {
          if(content.length < 200){ 
              element.style.border = "1px solid red";
          }else{
              element.style.border = "1px solid #ced4da";
          }
        }
      
    };

    
  if(url === undefined){
    //  news.eventNew.getGefault(ticker)
  //    storeNew.instrument = instrument.getSingle(ticker);
      
     // console.log( storeNew );
    }else{
   //   storeNew = news.getNew(ticker,url); 
    }
    let event = Object.assign({}, storeNew);

  
  
  return (

    <ContentBox title="График изменения цен Биткоина">
      <Popup open={open}
        closeOnDocumentClick={false}
        onClose={closeModal}>
        <AddEvent instrument={storeNew.instrument} />
      </Popup>
      <Form className={styles.formContent}>
        <div className={styles.rowForm}>
          <div className={styles.rowFormLine}>
            <div className={styles.formBlock25}>
              <label>Событие:</label>{storeNew.value}

              <Select
                styles={{
                  control: (baseStyles, state) => ({
                    ...baseStyles,
                    borderColor: getValidateType() ? '#ced4da' : 'red',
                  }),
                }}
                defaultValue={getType()}
                value={getType()}
                className={styles.formSelect + " react-select"}
                placeholder="Что произошло?"
                onChange={(value) => news.changeTypeEvent(storeNew.id, value)}
                options={eventsName}
              />
            </div>

            <div className={styles.formBlock25}>
              <label>Дата события:</label>
               <DatePicker
                title='asd'
                required={true}
                dateFormat='dd/MM/yyyy'
                onChange={(date:any) => news.setDateEvent(storeNew.id, date)}
                onSelect={handleDateSelect} //when day is clicked
                selected={getDate()}
                className="form-control" />
            </div>
          </div>
        </div>

        <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Короткое название:</label>

            <Form.Control
              onChange={(text:any) => news.changeEventName(storeNew.id, text.target.value)}
              value={storeNew.title}
              type="text"
              label="sdasd"
              aria-errormessage="asdasd"
              maxLength={256}
              errormessage="sadasdsd"
              isInvalid={isInvalidTitle}
              placeholder="Сплит акций, выход отчётности за квартал, выплата девидендов" />


          </div>
        </div>

        <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Источник:</label>
            <Form.Control
              isInvalid={isInvalidSource}
              onChange={text => news.changeEventSource(storeNew.id, text.target.value)}
              value={event.source}
              placeholder="http://" />
          </div>
        </div>

        <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Короткое описание:</label>
            <Form.Control

              isInvalid={isInvalidText}

              onChange={text => news.changeEventText(storeNew.id, text.target.value)}
              value={event.text}
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
              tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
              apiKey="5kp3x2dadjoph5cgpy61s3ha1kl7h6fvl501s3qidoyb4k6u"
              initialValue={storeNew.fulltext}




              onInit={(evt, editor) => editorRef.current = editor}



              placeholder="Подробная новость или событие"
              init={{
                extended_valid_elements: "br[*],p,b,",
                entity_encoding: "raw",
                selector: "textarea",
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
                setup: (editor:any) => {
                  editor.on("click", (e) => {
                    const element = editor.getContainer();

                    if (element) {
                      if (errorFulltext) {
                        element.style.border = "1px solid green";
                      }
                    }
                  });


                }
              }}
              onEditorChange={handleEditorChange}
            />
          </div>
        </div>
        <div className="row-form">
          <div className={styles.formBlock100 + " "+styles.buttonRight}>
            {getButton()}
          </div>
        </div>
      </Form>
    </ContentBox>

  )
}

import Head from 'next/head'
import Image from 'next/image' 
import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment';
import DatePicker from "react-datepicker"; 

import { Editor } from "@tinymce/tinymce-react";

import styles from './../styleform.module.css'
import React, {  useRef,useState,useContext } from "react";

import { eventsName } from "../../../constants/general";
 
import ContentBox from "../../../components/ContentBox";
import AddEvent from "../../../components/modals/AddEvent";

import { getInstrument,getNewsSingle } from '../../../hooks/index'

import {  useEffect} from 'react'
import {  useRouter} from 'next/router' 










export default function TickerUrlIndex(props) {

  console.log(props);
  const router = useRouter();
  if(!router.query){
    return <></>;
  }

  let ticker = '';
  let url:string = '';
 // typeof router.query?.action === "string" ? 
  
 const action =  typeof router.query?.action === "string"  ? router.query.action : ""; 
let tickerUrl =  typeof router.query?.tickerUrl === "object"  ?  router.query.tickerUrl : []; 
  
    console.log(router.query);
    if( tickerUrl && tickerUrl.length > 0){
     ticker =  tickerUrl[0];
    }

    if( tickerUrl && tickerUrl.length > 1){
      url =  tickerUrl[1];
     }
 
    console.log( action);
    if(action === "" || ticker === ""){
      return ;
    }
 // const {action, tickerUrl } = router.query
 

  
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidSource, setIsInvalidSource] = useState(false);
  const [isInvalidText, setIsInvalidText] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [errorFulltext, setErrorFulltext] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [eventDate, setEventDate] = useState(moment().format("DD/MM/YYYY"));
  const [title, setTitle] = useState('');
  const [source, setSource] = useState('');
  const [text, setText] = useState('');
  const [fulltext, setFulltext] = useState('');
 // const [typeId, setTypeId] = useState({value: 0, label: '', type: ''});
  const [typeId, setTypeId] = useState(0);
  const [showSendButton, setShowSendButton] = useState(true);
  const [open, setOpen] = useState(false);
  
 
  //console.log( action, tickerUrl);


  const editorRef = useRef('chart'); 
  let news:any = {};
  //let instrument:any = {};
   

 // console.log(tickerUrl);
  // if(tickerUrl && tickerUrl[0]){
  //     ticker = tickerUrl[0];
  //     let storeNew:any = {instrument:getInstrument(ticker)}; 
  // } 
  //if( tickerUrl && tickerUrl[1]){
   // url = tickerUrl[1];
   
//  let data ={};
//  let isLoading = false;
//  let isError = false;
//  let isSuccess = false;

 //  if(action === "edit"){ 
    console.log('ssss')
    let { isSuccess, isError,  isLoading, data  } = getNewsSingle(ticker, url);
//  } 
     //   console.log({ isLoading, isError, data, error });
      // if (isError) {
      //   return <span>Ошибка: {error.message}</span>;
      // }
      // if (isLoading) return <p>Загрузка...</p>;
      // if (error) return <p>Ошибка: {error.message}</p>;
      
      console.log(data)
      //  if(data  && data.data  && data.data.date){ 
    //  setEventDate(data.date);
    //  setSource(data.source);   
   // }
      // console.log(data ,
      // data.id,
      // data.event,
      // data.type,
      // data.typeId,
      // data.hash,
      // data.source,
      // data.url,
      // data.title_url);
  //   setEventDate] = useState(moment().format("DD/MM/YYYY"));
 //    setTitle] = useState('');
  //  setSource] = useState('');
 //    setText] = useState('');
  //  setFulltext()
  //  setTypeId(data.)
    
 // } 
  console.log('url=='+url) 

  const closeModal = () => {
    setOpen(false)
  };
  const getType = () => {
    return ;
 //   if(storeNew.id){  
  console.log(typeId)
     const  res =  eventsName.filter((option)=> {
        return option.value === typeId;
      })
        console.log( (res && res[0])?res[0]:{},typeId);
      return  (res && res[0])?res[0]:{};

  //  }
  };

  const getValidateType= () => {
    if(!writeForm){
      return true;
    }
   // console.log(news.eventNew.typeId);
    if(typeId != 0){ 
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
    return  moment(eventDate, 'DD/MM/YYYY').toDate()
 //   return moment().toDate()  ;
      if(news.id){ 
        return moment(news.eventDate, 'DD/MM/YYYY').toDate()  ;
        } 
      
      if(news.eventDate == undefined){ 
        console.log('asd2222da')
        return moment().toDate()  ; 
      }else{
        console.log('as11',news.eventDate,moment(news.eventDate, 'DD/MM/YYYY').toDate())
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

  
  if(!title  || (title  && title.length < 10)){ 
  
   setIsInvalidTitle(true);
   isInvalidTitle = false;
  }

  if(!source  || (source  && source.length < 10)){ 


    isInvalidSource = false;
    setIsInvalidSource(true);
  } 
  if(!text || (text && text.length < 10)){ 
    setIsInvalidText(true);
    isInvalidText = false;
  }
  console.log(fulltext,!fulltext);
  if( !fulltext || (fulltext && fulltext.length < 190)){ 
    isInvalidFulltext = false;
    setErrorFulltext(true);
  }

  if(isInvalidTitle && isInvalidSource && isInvalidText && isInvalidFulltext){ 
    setShowSendButton(false);


   const params =  {
      // eventDate,title,source,text,fulltext,typeId, action, ticker, url
      eventDate: eventDate,
      title: title,
      source: source,
      text: text,
      fulltext: fulltext,
      typeId: typeId,
      action: action, 
      ticker: ticker,
      url: url,
    };
    createNews(params);
    return true;
  }

 return false;

};
   
const sendEvent = () => {
  
  // if(news.eventNew.id === undefined){
  //   news.eventNew.date = news.eventDate
  // }
  console.log(news);
 
  
  
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
    setFulltext(content);
    //  onEditorChange={text => news.changeEventFulltext(text)}
//      changeEventFulltext(content);
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

    if(action === "edit"){
      // редактируем событие
    }else{
      // или создаём новый елемент

    }
    
  if(action === undefined){
    //  news.eventNew.getGefault(ticker)
  //    storeNew.instrument = instrument.getSingle(ticker);
      
     // console.log( storeNew );
    }else{
   //   storeNew = news.getNew(ticker,url); 
    }
 //   let event = Object.assign({}, storeNew);

  // меняем тип события
  const  changeTypeEvent = (value:any) => {
      console.log(value.value);
      setTypeId(value.value);
      return
    }

    // устанавливаем дату
    const setDateEvent= (value:any) => {
      console.log(value);
      console.log(moment(value).format("DD/MM/YYYY"));
      news.eventDate = moment(value).format("DD/MM/YYYY");
      const eventDate = moment(value).format("DD/MM/YYYY");
      setEventDate(eventDate);
    }
    // устанавливаем название события
    const changeEventName = (value:string) => {
      setTitle(value);
    }
    // устанавливаем название события
    const changeEventSource = (value:string) => {
      setSource(value);
    }
    // устанавливаем название события
    const changeEventText = (value:string) => {
      setText(value);
    }
    // устанавливаем название события
    const changeEventFulltext = (value:string) => {
      setFulltext(value);
    }
     
    

    if (isSuccess) {
  return (
    <> 
   <ContentBox title="График изменения цен Биткоина" ticker="">
      <Popup open={open}
        closeOnDocumentClick={false}
        onClose={closeModal}>
        <AddEvent instrument={instrument} />
      </Popup>
      {news.eventDate}
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

               // defaultValue={getType()}
                value={getType()}
                className={styles.formSelect  }
                placeholder="Что произошло?"
                onChange={(value) => changeTypeEvent(value)}
                options={eventsName}
              />
            </div>

            <div className={styles.formBlock25}>
              <label>Дата события:</label>
               <DatePicker
                title='asd'
                required={true}
                dateFormat='dd/MM/yyyy'
                onChange={(date:any) => setDateEvent(date)}
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
              id={'text'}
              onChange={(text:any) => changeEventName(text.target.value)}
              value={title}
              type="text"
              aria-errormessage="asdasd"
              maxLength={256}
              isInvalid={isInvalidTitle}
              placeholder="Сплит акций, выход отчётности за квартал, выплата девидендов" />


          </div>
        </div>

        <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Источник:</label>
            <Form.Control
              isInvalid={isInvalidSource}
              onChange={text => changeEventSource(text.target.value)}
              value={source}
              placeholder="http://" />
          </div>
        </div>

        <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Короткое описание:</label>
            <Form.Control

              isInvalid={isInvalidText}

              onChange={text => changeEventText(text.target.value)}
              value={text}
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
              id={'Editor'}
              tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
              apiKey="5kp3x2dadjoph5cgpy61s3ha1kl7h6fvl501s3qidoyb4k6u"
             // initialValue={fulltext}
            //  onInit={(evt, editor) => editorRef.current = editor}

 
              init={{
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
  </>
  );

            }


  if (isLoading) {
    return <div className="center">Loading...</div>;
  }

  if (isError) {
    return (
      <div className="center">
        We couldn't find your pokemon{" "}
        <span role="img" aria-label="sad">
          😢
        </span>
      </div>
    );
  }

  return <></>;
}

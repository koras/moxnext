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

import { getInstrument,getNewsSingle,setEventTitle,setEventFulltext } from '../../../hooks/index'

import {  useEffect} from 'react'
import {  useRouter} from 'next/router' 




export default function TickerUrlIndex() {

  const [isload, setLoad] = useState(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidSource, setIsInvalidSource] = useState(false);
  const [isInvalidText, setIsInvalidText] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [errorFulltext, setErrorFulltext] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [title, setTitle] = useState(""); 
  const [getData, setData] = useState({}); 
  
  const [showSendButton, setShowSendButton] = useState(true);
  const [open, setOpen] = useState(false);

   const changeEventName = (status:string) => {
    setTitle(status);
  }

//   useEffect(() => {
//     changeEventName("") ;
//  });

 
  const router = useRouter();
  const editorRef = useRef('chart'); 
  if(!router.query){
    return <></>;
  }

  let ticker = '';
  let url:string = '';
 // typeof router.query?.action === "string" ? 
  
 const action =  typeof router.query?.action === "string"  ? router.query.action : ""; 
let tickerUrl =  typeof router.query?.tickerUrl === "object"  ?  router.query.tickerUrl : []; 
  

 
  
    useEffect(() => {

      if( tickerUrl && tickerUrl.length > 0){
        ticker =  tickerUrl[0];
       }
   
       if( tickerUrl && tickerUrl.length > 1){
         url =  tickerUrl[1];
        }
    
       if(action === "" || ticker === ""){
         return ;
       }

        

      if (router.isReady) {
        // Code using query 
 
        const fetchSomethingById = async () => {
          const headers = { 'Content-Type': 'application/json' }
          const data = await fetch('http://localhost:3000/news.js', { headers })   
          .then((response:any) => { 

            if(response.ok){
           //   console.log(response.body); //first consume it in console.log
            //response.body.json(); //then consume it again, the error happens
     
         }
            //  console.log(response.json());
            return response.json()
          }) 
          .then(res => {
           console.log(123123);
          //  console.log(data);


          console.log(res[0]);
           setData(res[0])
           setLoad(true)
        //  } 
        return res[0];
            }
           );
          
           setTitle(data.title);
          // setData(data)
           console.log(data );
        
        };
        fetchSomethingById();
       //     const response = await fetch('http://localhost:3000/news.js');
        
      
       }
    }, [router.isReady]);
 
    
 

 // const {action, tickerUrl } = router.query
 
 
//   const [eventDate, setEventDate] = useState(moment().format("DD/MM/YYYY"));
  
//   const [source, setSource] = useState('');
//   const [text, setText] = useState('');
//   const [fulltext, setFulltext] = useState('');
//  // const [typeId, setTypeId] = useState({value: 0, label: '', type: ''});
   const [typeId, setTypeId] = useState(0); 
  
   

 
 
  
 
  let news:any = {};
  //let instrument:any = {};
   

  
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
  
//  } 
       
     //   console.log({ isLoading, isError, data, error });
      // if (isError) {
      //   return <span>Ошибка: {error.message}</span>;
      // }
      // if (isLoading) return <p>Загрузка...</p>;
      // if (error) return <p>Ошибка: {error.message}</p>;

 
 
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
 
  const closeModal = () => {
    setOpen(false)
  };
  const getType = () => {
    return ;
 //   if(storeNew.id){  
  
     const  res =  eventsName.filter((option)=> {
        return option.value === data.typeId;
      })
      
      return  (res && res[0])?res[0]:{};

  //  }
  };

  const getValidateType= () => {
    if(!writeForm){
      return true;
    }
    
    if(data.typeId != 0){ 
      return true;
    }
    return false; 
  // return  news.storeNew.typeId !==0;
  }
  const handleDateSelect = (info:any) =>
  {
  
    
  }


  const getDate = () => {
    return  moment(data.date, 'DD/MM/YYYY').toDate()
 //   return moment().toDate()  ;
      if(news.id){ 
        return moment(news.eventDate, 'DD/MM/YYYY').toDate()  ;
        } 
      
      if(news.eventDate == undefined){ 
        
        return moment().toDate()  ; 
      }else{
      //  console.log('as11',news.eventDate,moment(news.eventDate, 'DD/MM/YYYY').toDate())
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

  
  if(! data.title  || ( data.title  &&  data.title.length < 10)){ 
  
   setIsInvalidTitle(true);
   isInvalidTitle = false;
  }

  if(! data.source  || ( data.source  &&  data.source.length < 10)){ 


    isInvalidSource = false;
    setIsInvalidSource(true);
  } 
  if(! data.text || ( data.text &&  data.text.length < 10)){ 
    setIsInvalidText(true);
    isInvalidText = false;
  }
  
  if( ! data.fulltext || ( data.fulltext &&  data.fulltext.length < 190)){ 
    isInvalidFulltext = false;
    setErrorFulltext(true);
  }

  if(isInvalidTitle && isInvalidSource && isInvalidText && isInvalidFulltext){ 
    setShowSendButton(false);


  //  const params =  {
  //     // eventDate,title,source,text,fulltext,typeId, action, ticker, url
  //     eventDate: eventDate,
  //     title: title,
  //     source: source,
  //     text: text,
  //     fulltext: fulltext,
  //     typeId: typeId,
  //     action: action, 
  //     ticker: ticker,
  //     url: url,
  //   };
    createNews( data);
    return true;
  }

 return false;

};
   
const sendEvent = () => {
  
  // if(news.eventNew.id === undefined){
  //   news.eventNew.date = news.eventDate
  // }
  
  
  
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
    setEventFulltext(content);
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

      setTypeId(value.value);
      return
    }

    // устанавливаем дату
    const setDateEvent= (value:any) => {
   //   console.log(value);
    //  console.log(moment(value).format("DD/MM/YYYY"));
      news.eventDate = moment(value).format("DD/MM/YYYY");
      const eventDate = moment(value).format("DD/MM/YYYY");
      setEventDate(eventDate);
    }
    // устанавливаем название события
    // const changeEventName = (value:any) => {
    //  // setEventTitle(value);
    //   setTitle(value.target.value);
    // }
    // устанавливаем название события
    const changeEventSource = (value:string) => {
    //  setSource(value);
    }
    // устанавливаем название события
    const changeEventText = (value:string) => {
  //    setText(value);
    }
    // устанавливаем название события
    const changeEventFulltext = (value:string) => {
  //    setFulltext(value);
    }
     
    
 
    if ( router.isReady && isload) {

     
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
        {/* <div className={styles.rowForm}>
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
        </div> */}

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

        {/* <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Источник:</label>
            <Form.Control
              isInvalid={isInvalidSource}
              onChange={text => changeEventSource(text.target.value)}
              value={data.source}
              placeholder="http://" />
          </div>
        </div> */}

        {/* <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Короткое описание:</label>
            <Form.Control

              isInvalid={isInvalidText}

              onChange={text => changeEventText(text.target.value)}
              value={data.text}
              as="textarea"
              rows={3}
              placeholder="Объявление девидендов в 135 рублей на акцию"
            />
          </div>
        </div> */}

        {/* <div className={styles.rowForm}>
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
        </div> */}
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


  // if (isLoading) {
  //   return <div className="center">Loading...</div>;
  // }

  // if (isError) {
  //   return (
  //     <div className="center">
  //       We couldn't find your pokemon{" "}
  //       <span role="img" aria-label="sad">
  //         😢
  //       </span>
  //     </div>
  //   );
  // }

  return <></>;
}

// http://localhost:3000/event/create/btc

import Head from 'next/head'
import Image from 'next/image' 
import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment';
import DatePicker from "react-datepicker"; 

import { Editor } from "@tinymce/tinymce-react";

import styles from './../styleform.module.css'
import React, {  useRef,useState,useEffect } from "react";

import Datetime from 'react-datetime';
import { eventsName } from "../../../constants/general";
 
import ContentBox from "../../../components/ContentBox";
import DateFormatInput from 'material-ui-next-datepicker'
import AddEvent from "../../../components/modals/AddEvent";

//import { getInstrument,getNewsSingle,setEventTitle,setEventFulltext } from '../../../hooks/index'
 
import {  useRouter} from 'next/router' 

const defaultNews = {"date": "","event":"","fulltext": "","link": "","source": "","text": "","ticker": "","title": "","title_url": "","type": "","typeId": 0,"url": "",
"instrument": {"instrumentId": 101, "name": 'Биткоин', "price": 150, "type": 'crypto', "change": '+10'}};
 


export default function TickerUrlIndex() {

  const [isload, setLoad] = useState(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidSource, setIsInvalidSource] = useState(false);
  const [isInvalidText, setIsInvalidText] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [errorFulltext, setErrorFulltext] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [title, setTitle] = useState(""); 
  const [source, setSource] = useState(""); 

interface InfoType {
    title: string; 
    typeId:number; 
    date: string; 
    source :string; 
    shorttext :string; 
    fulltext :string; 
  }
 
  const [getData, setData] = useState<InfoType>({
    title: "",
    typeId:0,
    date: moment().format("DD/MM/YYYY"),
    source :"",
    shorttext:"",
    fulltext:"",
  }); 
  
  const [showSendButton, setShowSendButton] = useState(true);
  const [open, setOpen] = useState(false);
  const [eventDate, setEventDate] = useState(moment().format("DD/MM/YYYY"));
   const [text, setText] = useState('');
   const [fulltext, setFulltext] = useState('');
   const [typeId, setTypeId] = useState(0); 


   const changeEventName = (status:any) => {
    setTitle(status);

    //let stitle:any =  {title : status}
    setData({...getData, title : status});
  }

  const getType = () => {
 
    const  res =  eventsName.filter((option:any)=> {
      if(getData){ 
  
       return option.value === +getData.typeId;
      }
     })
     return  (res && res[0])?res[0]:{};
 };
//  const setEventFulltext = (text:string)  => {
//   // event = { ...event , event.title: text};
//   // console.log(event);
//   setData({...getData,fulltext:text});
//  };

 let ticker:any = null;
 let url:any = null;


 //let action:any  = null; 
 //let tickerUrl:any = []; 

 const router = useRouter();
 const { asPath } = useRouter();
 
 const {action,tickerUrl} = router.query

 
  

 if (router.isReady) {
 if( tickerUrl && tickerUrl.length > 0){
  ticker =  tickerUrl[0];
 }

 if( tickerUrl && tickerUrl.length > 1){
   url =  tickerUrl[1];
  }
}

  useEffect(() => {


  //  if(!tickerUrl && !url) {
  //    return;
  //  }


  //  setLoad(true);

    const fetchSomethingById = async (tickers:any ,urls:any) => {
      //return [];
      //   "accept": "application/json, text/plain, */*",
      const headers = { 
        'Accept': 'application/json',
          'Content-Type': 'application/json, text/plain, */*',   
        }
        let urlRequest = `http://localhost:8083/api/event/${tickers}/${urls}`;
        console.log('urlRequest ',urlRequest );
        fetch(urlRequest,{ headers })   
      .then((response:any) => {
        console.log('fetch');
        console.log('fetch',response);
        return response.json()
      }) 
      .then((res:any) => {
        console.log(res);
        setData(res);
        setLoad(true);
      //  return res[0];
        }).catch(function(error) {

          console.log("Ошибка обработана, продолжить работу",error);
        
        });
    //    setData(data); 
        console.log('result');
    };

    
    
 
   if(router.isReady &&  !isload) {
    fetchSomethingById(ticker ,url);
   }
     //   console.log(action);
         
      // }
       //     }, [router.isReady, isload]);
  //       }, [ router.isReady, isload,fetchSomethingById]);
         });
  


       //  if (router.isReady) {
          // Code using query 
        
          //  action =  typeof router.query?.action === "string"  ? router.query.action : ""; 
          //  tickerUrl =  typeof router.query?.tickerUrl === "object"  ?  router.query.tickerUrl : []; 

          //  if( tickerUrl && tickerUrl.length > 0){
          //   ticker =  tickerUrl[0];
          //  }
          
          //  if( tickerUrl && tickerUrl.length > 1){
          //    url =  tickerUrl[1];
          //   }
      //  }
 
    console.log(action, tickerUrl )



  // if(!router.isReady){
  //   return <></>;
  // } 
    
  
  
  let news:any = {};
 
 
  const closeModal = () => {
    setOpen(false)
  };
 
  const getValidateType= () => {
    if(!writeForm){
      return true;
    }
    
    if(typeId != 0){ 
      return true;
    }
    return false; 
  // return  news.storeNew.typeId !==0;
  }
  const handleDateSelect = (info:any) =>
  {
  
    
  }

  console.log('ok' );

  const getDate = () => {
    if(getData){ 
    return  moment(getData.date, 'DD/MM/YYYY').toDate()
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

  
  if(! getData.title  || ( getData.title  &&  getData.title.length < 10)){ 
  
   setIsInvalidTitle(true);
   isInvalidTitle = false;
  }

  if(! getData.source  || ( getData.source  &&  getData.source.length < 10)){ 


    isInvalidSource = false;
    setIsInvalidSource(true);
  } 
  if(! getData.shorttext || ( getData.shorttext &&  getData.shorttext.length < 10)){ 
    setIsInvalidText(true);
    isInvalidText = false;
  }
  
  if( ! getData.fulltext || ( getData.fulltext &&  getData.fulltext.length < 190)){ 
    isInvalidFulltext = false;
    setErrorFulltext(true);
  }

  if(isInvalidTitle && isInvalidSource && isInvalidText && isInvalidFulltext){ 
    setShowSendButton(false);



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
      return <>11</> ; 
  }
  const handleEditorChange = (content:string, editor:any) => {
   // setEventFulltext(content);
      console.log(content);
  //  setData({...getData, fulltext:content});
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


    getData.title


    
  // меняем тип события
 // const getTitle = () => {
    //  if(getData &&  getData.title){
    //    console.log( getData);
    //    return getData.title;
    //  }
   // }

    
  // меняем тип события
  const  changeTypeEvent = (value:any) => {
    console.log(value);
    setData({...getData, typeId:value.value});
    //  setTypeId(value.value);
    
    }

    //useEffect(() => {  
    // устанавливаем дату
    const setDateEvent= (value:any) => {
   //   console.log(value);
    //  console.log(moment(value).format("DD/MM/YYYY"));
      news.eventDate = moment(value).format("DD/MM/YYYY");
      const eventDate = moment(value).format("DD/MM/YYYY");
    //  setEventDate(eventDate);
      setData({...getData, date:eventDate});
    }
  //},[]);



    // устанавливаем название события
    // const changeEventName = (value:any) => {
    //  // setEventTitle(value);
    //   setTitle(value.target.value);
    // }
    // устанавливаем название события
    const changeEventSource = (value:string) => {
     // setSource(value);
      setData({...getData, source : value});
    }
    // устанавливаем название события
    const changeEventText = (value:string) => {
   //   setText(value);
      setData({...getData, shorttext: value});
    }
    // устанавливаем название события
    const changeEventFulltext = (value:string) => {
      setFulltext(value);
      setData({...getData, title:text});
    }
    const isValidDate = (status:boolean) => {
   //   console.log(status);
      return status;
   //   setFulltext(value);
   //   setData({...getData, title:text});
    }
     
    var valid = ( current:any ) => {
      return current.day() != 0 && current.day() != 6;
   }; 
     
    const [startDate, setStartDate] = useState(new Date());
 
    if ( router.isReady) {

      const property = {placeholder:"asdasd"}


  return (
    <> 
   <ContentBox title="График изменения цен Биткоина" ticker="">
       <Popup open={open}
        closeOnDocumentClick={false}
        onClose={closeModal}>
        <AddEvent instrument={instrument} />
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
              <Datetime      
              value={getDate()}
             // isValidDate={(status:any) =>isValidDate(status)}
              isValidDate={ valid }
              strictParsing={false}
              inputProps={property}
              closeOnClickOutside={true}
              timeFormat={false}
              closeOnSelect={true}
              dateFormat='DD/MM/yyyy'
              locale={"date-fns/locale/ru"}
              onChange={(date:any) => setDateEvent(date)}  /> 



              {/* <DatePicker selected={startDate} onChange={(date:Date) => setStartDate(date)} /> */}
               {/* <DatePicker 
          //     title='asd'
               // required={true}
                dateFormat='dd/MM/yyyy'
                 onChange={(date:any) => setDateEvent(date)}
               //  onSelect={handleDateSelect} //when day is clicked
                // selected={getDate()}
                className="form-control" />   */}
            </div> 
          </div>
        </div>  

         <div className={styles.rowForm}>
          <div className={styles.formBlock100}>
            <label>Короткое название:</label>
            <Form.Control
              id={'text'}
              
              onChange={(text:any) => changeEventName(text.target.value)}
              value={getData.title}
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
              onChange={(text:any) => changeEventSource(text.target.value)}
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
              onChange={(text:any) => changeEventText(text.target.value)}

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
              initialValue={getData.fulltext}
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
                  editor.on("click", (e:any) => {
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

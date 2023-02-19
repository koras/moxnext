// http://localhost:3000/event/create/btc

import Head from 'next/head'

import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment';
//  

import { createEvent } from '../../../hooks/index'

import 'moment/locale/ru';

import { Editor } from "@tinymce/tinymce-react";

import styles from '../../event/styleform.module.css'
import React, { useState, useEffect, useRef } from "react";

import Datetime from 'react-datetime';
import { eventsName } from "../../../constants/general";

import ContentBox from "../../../components/ContentBox";
import SaveInstrument from "../../../components/modals/SaveInstrument";


import { useRouter } from 'next/router'

export default function TickerUrlIndex() {

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
  const [selectedFiles, setFile] = useState(undefined);
  const [currentFile, setCurrentFile] = useState(undefined);
   
 
 

  interface InfoType {
    instrument_id: string;
    instrument_name:  string; 
    instrument_full_name:  string; 
    type:  string; 
    ticker:  string; 
    site:  string; 
    price:  string; 
    isin:  string; 
    currency:  string; 
    INSTRUMENT_CATEGORY: string; 
    LIST_SECTION: string; 
    CURRENCY_MOEX: string; 
  }

  const [getData, setData] = useState<InfoType>({
    instrument_id: "",
    instrument_name: "",
    instrument_full_name: "",
    type:  "", 
    ticker: "",
    price: "",
    site: "",
    isin:  "",
    currency:  "",
    INSTRUMENT_CATEGORY:  "",
    LIST_SECTION:  "",
    CURRENCY_MOEX:  "",
  });


  const textareaEl = useRef(null);



  const getType = () => {

    const res = eventsName.filter((option: any) => {
      if (getData) {

        return option.value === +getData.typeId;
      }
    })
    return (res) ? res : {};

  }; 


  const router = useRouter(); 

  const { instrumentId } = router.query

  
  useEffect(() => {
 
    const getEvent = async (instrumentId: any) => {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json, text/plain, */*',
      }
      fetch(`http://localhost:8083/api/instrument/get/${instrumentId}`, { headers })
        .then((response: any) => {
          return response.json()
        })
        .then((data: any) => {
          console.log('data');
          console.log(data);
          setData({ ...data});
          // отдельно
 
          setLoad(true);


        }).catch(function (error) {
          console.log("Ошибка обработана, продолжить работу ", error);
        });
      console.log('result');
    };

    if (router.isReady && !isload) {
      getEvent(instrumentId);
    }
 
  
  });


  const changeStatePopup =(params:boolean)=>{

  setOpen(params);
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

 


  

  const onFileChange = (event:any) => {
    // Update the state
     setFile(event.target.files);
   
  };
// https://www.geeksforgeeks.org/file-uploading-in-react-js/
  const sendEvent = async () => {
 
  

   // if (validation()) {

      const formData = new FormData(); 
      console.log(getData);

      for(const name in getData) {
        formData.append(name, getData[name]);
      }

      formData.append("industry_id", "0");
       
      if(selectedFiles && selectedFiles[0]){ 
        formData.append( "upload", selectedFiles[0]);
      }
      //   const hash = news.saveEvent(news.eventNew);
      console.log('getData')

 
      console.log(getData,instrument)

      const responses = await fetch(`http://localhost:8083/api/instrument/update`, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
      //  mode: 'cors', // no-cors, *cors, same-origin
     //   cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
     //   credentials: 'same-origin', // include, *same-origin, omit
        headers: {
           'Accept': 'application/json',
         //'Content-Type': 'application/json',
       //   'Content-Type': 'multipart/form-data'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formData
      //  redirect: 'follow', // manual, *follow, error
       // referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  //      body: JSON.stringify(getData) // body data type must match "Content-Type" header`
      }) 
      
     



      
      if (responses.ok) { // если HTTP-статус в диапазоне 200-299
        // получаем тело ответа (см. про этот метод ниже)
        let json = await responses.json();
     //   console.log(json);
      //  return json;
        setServerResponse(json);
        setOpen(true)
      } else {
        alert("Ошибка HTTP: " + responses.status);
    
        
      } 




    //  const response = await createEvent(getData)
  
      //console.log(serverResponse.hash);
      
  //  }
  };

  const textButton = () => {
    return 'Сохранить';
  }

  const getButton = () => {
    //  if (showSendButton) {
    return <button type="button" onClick={sendEvent} className="btn btn-primary">{textButton()}</button>
    //  }
    return <></>;
  }

 
 
  const isValidDate = (status: boolean) => {
    //   console.log(status);
    return status;
    //   setData({...getData, title:text});
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
        <ContentBox title={title} ticker="">
          <Popup open={open}
            closeOnDocumentClick={false}
            onClose={closeModal}>
            <SaveInstrument 
            setLoad={setLoad}
            server={serverResponse}
            close={changeStatePopup}
            instrument={getData} />
          </Popup>
          
          <Form className={styles.formContent}>
            <div className={styles.rowForm}>
              <div className={styles.rowFormLine}>
                <div className={styles.formBlock25}>
                  <label>Отрасль:</label>
             
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

              </div>
            </div>

            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Короткое название:</label>
                <Form.Control
                  id={'instrument_name'}
                  onChange={(text: any) =>  {  setData({ ...getData, instrument_name: text.target.value })}}
                  value={getData.instrument_name}
                  type="text"
                  aria-errormessage="asdasd"
                  maxLength={256}
                  isInvalid={isInvalidTitle}
                  placeholder="Сплит акций, выход отчётности за квартал, выплата девидендов" />
              </div>
            </div>
            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Полное название:</label>
                <Form.Control
                  id={'text'}
                  onChange={(text: any) =>  {  setData({ ...getData, instrument_full_name: text.target.value })}}
                  value={getData.instrument_full_name}
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
                  onChange={(text: any) =>  {  setData({ ...getData, site: text.target.value })}}
                  value={getData.site}
                  placeholder="http://" />
              </div>
            </div>

            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Короткое описание:</label>
                <Form.Control
                  value={getData.description}
                  isInvalid={isInvalidText}
                  onChange={(text: any) =>  {  setData({ ...getData, description: text.target.value })}}
                  as="textarea" 
                  rows={3}
                  placeholder="Объявление девидендов в 135 рублей на акцию"
                />
              </div>
            </div>


            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Источник:</label>
                <Form.Control
                 
                onChange={onFileChange} 
                  type='file' />
              </div>
            </div>


            <div className="row-form">
              <div className={styles.formBlock100 + " " + styles.buttonRight}>
                {getButton()}
              </div>
            </div>






            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Тип, не меняется:</label>
                <Form.Control
                 className={styles.readOnly} 
                  readOnly={true}
                  disabled
                  value={getData.type}
                   />
              </div>
            </div>
            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>ISIN:</label>
                <Form.Control
                 className={styles.readOnly} 
                  readOnly={true}
                  disabled
                  value={getData.isin}
                   />
              </div>
            </div>
             
             <div className={styles.rowForm}>
               <div className={styles.formBlock100}>
                 <label>Текущая цена:</label>
                 <Form.Control
                  className={styles.readOnly} 
                   readOnly={true}
                   disabled
                   value={getData.price}
                    />
               </div>
             </div>
             
            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>ticker:</label>
                <Form.Control
                 className={styles.readOnly} 
                  readOnly={true}
                  disabled
                  value={getData.ticker}
                   />
              </div>
            </div>
            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Тип, не меняется:</label>
                <Form.Control
                 className={styles.readOnly} 
                  readOnly={true}
                  disabled
                  value={getData.CURRENCY_MOEX}
                   />
              </div>
            </div>
            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Тип, не меняется:</label>
                <Form.Control
                 className={styles.readOnly} 
                  readOnly={true}
                  disabled
                  value={getData.LIST_SECTION}
                   />
              </div>
            </div>
            <div className={styles.rowForm}>
              <div className={styles.formBlock100}>
                <label>Тип, не меняется:</label>
                <Form.Control
                 className={styles.readOnly} 
                  readOnly={true}
                  disabled
                  value={getData.INSTRUMENT_CATEGORY}
                   />
              </div>
            </div> 
 
          </Form>
        </ContentBox>
      </>
    );

  }
  return <>load page</>;
}

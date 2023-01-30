// http://localhost:3000/event/create/btc

import Head from 'next/head'
 
import Popup from 'reactjs-popup';
import Form from "react-bootstrap/Form";
import Select from "react-select";
import moment from 'moment'; 
 
import 'moment/locale/ru';

import { Editor } from "@tinymce/tinymce-react";

import styles from './../styleform.module.css'
import React, { useState, useEffect } from "react";

import Datetime from 'react-datetime';
import { eventsName } from "../../../constants/general";

import ContentBox from "../../../components/ContentBox";
import AddEvent from "../../../components/modals/AddEvent";


import { useRouter } from 'next/router'

export default function TickerUrlIndex() {

  const [isload, setLoad] = useState(false);
  const [isInvalidTitle, setIsInvalidTitle] = useState(false);
  const [isInvalidSource, setIsInvalidSource] = useState(false);
  const [isInvalidText, setIsInvalidText] = useState(false);
  const [writeForm, setWriteForm] = useState(false);
  const [errorFulltext, setErrorFulltext] = useState(false);
  const [instrument, setInstrument] = useState({});
  const [showSendButton, setShowSendButton] = useState(true);
  const [open, setOpen] = useState(false);


  interface InfoType {
    title: string;
    typeId: number;
    date: string;
    source: string;
    shorttext: string;
    fulltext: string;
  }

  const [getData, setData] = useState<InfoType>({
    title: "",
    typeId: 0,
    date: moment().format("DD/MM/YYYY"),
    source: "",
    shorttext: "",
    fulltext: "",
  });
 


  const changeEventName = (status: any) => {
    setData({ ...getData, title: status });
  }

  const getType = () => {

    const res = eventsName.filter((option: any) => {
      if (getData) {

        return option.value === +getData.typeId;
      }
    })
    return (res ) ? res : {};

  };
  let ticker: any = null;
  let url: any = null;


  const router = useRouter();
  const { asPath } = useRouter();

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
    const getEvent = async (tickers: any, urls: any) => {
      const headers = {
        'Accept': 'application/json',
        'Content-Type': 'application/json, text/plain, */*',
      }
      let urlRequest = `http://localhost:8083/api/event/${tickers}/${urls}`;
      console.log('urlRequest ', urlRequest);
      fetch(urlRequest, { headers })
        .then((response: any) => {
          return response.json()
        })
        .then((data: any) => {
          console.log(data);
          setData(data.data);
          setInstrument(data.instrument);
          setLoad(true);
        }).catch(function (error) {
          console.log("Ошибка обработана, продолжить работу ", error);
        });
      console.log('result');
    };


    if (router.isReady && !isload) {
        getEvent(ticker, url);
    }
  });

  let news: any = {};


  const closeModal = () => {
    setOpen(false)
  };

  const getValidateType = () => {
    if (!writeForm) {
      return true;
    }

    return false;
  }
  const handleDateSelect = (info: any) => {


  }


  const getDate = () => {
    if (getData) {
      return moment(getData.date, 'DD/MM/YYYY').toDate()
      //   return moment().toDate()  ;
      if (news.id) {
        return moment(news.eventDate, 'DD/MM/YYYY').toDate();
      }

      if (news.eventDate == undefined) {

        return moment().toDate();
      } else {
        return moment(news.eventDate, 'DD/MM/YYYY').toDate();
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


    if (!getData.title || (getData.title && getData.title.length < 10)) {

      setIsInvalidTitle(true);
      isInvalidTitle = false;
    }

    if (!getData.source || (getData.source && getData.source.length < 10)) {


      isInvalidSource = false;
      setIsInvalidSource(true);
    }
    if (!getData.shorttext || (getData.shorttext && getData.shorttext.length < 10)) {
      setIsInvalidText(true);
      isInvalidText = false;
    }

    if (!getData.fulltext || (getData.fulltext && getData.fulltext.length < 190)) {
      isInvalidFulltext = false;
      setErrorFulltext(true);
    }

    if (isInvalidTitle && isInvalidSource && isInvalidText && isInvalidFulltext) {
      setShowSendButton(false);



      return true;
    }

    return false;

  };

  const sendEvent = () => {

    // if(news.eventNew.id === undefined){
    //   news.eventNew.date = news.eventDate
    // }



    if (validation()) {
      //   const hash = news.saveEvent(news.eventNew);

      //console.log('sendEvent',news.eventNew,hash)
      // return;
      setOpen(true)
    }

  };

  const textButton = () => {
    return 'Предложить изменение';
  }

  const getButton = () => {
    if (showSendButton) {
      return <button type="button" onClick={sendEvent} className="btn btn-primary">{textButton()}</button>
    }
    return <>11</>;
  }
  const handleEditorChange = (content: string, editor: any) => {
    if (!writeForm) {
      return true;
    }

    const element = editor.getContainer();
    if (element) {
      if (content.length < 200) {
        element.style.border = "1px solid red";
      } else {
        element.style.border = "1px solid #ced4da";
      }
    }

  };


  getData.title


  // меняем тип события
  const changeTypeEvent = (value: any) => {
    console.log(value);
    setData({ ...getData, typeId: value.value });
    //  setTypeId(value.value);

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
    //   setText(value);
    setData({ ...getData, shorttext: value });
  }
  // устанавливаем название события
  const changeEventFulltext = (value: string) => {

    setData({ ...getData, title: text });
  }
  const isValidDate = (status: boolean) => {
    //   console.log(status);
    return status;
    //   setData({...getData, title:text});
  }

  var valid = (current: any) => {
    return true;
    return current.day() == 0 && current.day() != 8;
  };

  const [startDate, setStartDate] = useState(new Date());

  if (router.isReady) {
 
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
                  id={'Editor'}
                  tinymceScriptSrc={"/assets/libs/tinymce/tinymce.min.js"}
                  apiKey="5kp3x2dadjoph5cgpy61s3ha1kl7h6fvl501s3qidoyb4k6u"
                  initialValue={getData.fulltext}
                  //  onInit={(evt, editor) => editorRef.current = editor}
                  init={{
                    placeholder:"Подробное описание события",
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
                    setup: (editor: any) => {
                      editor.on("click", (e: any) => {
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

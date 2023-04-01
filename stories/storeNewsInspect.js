//import { observable,autorun, makeObservable, computed, action }  from "mobx"

import { makeAutoObservable } from "mobx";
 


import moment from "moment";

//import _ from "lodash";

class storeNewsInspect {
  constructor() {
    makeAutoObservable(this);
  }
  // объект для редактирования
  eventNew = {
    
  };

  

  changeTypeEvent(id, value) {
    console.log(value);
    this.news.forEach((element) => {
      if (element.id === id) {
        element.typeId = value.value; 
        element.event = value.label;
        element.type = value.type;
      }
    });
    this.eventNew.typeId = value.value;
    this.eventNew.event = value.label;
    this.eventNew.type = value.type;
  }
  // обновляем дату при редактированиие события
  setDateEvent(id, date) {
    if(date){ 
    console.log(date);
      this.news.forEach((element) => {
        if (element.id === id) {
          element.date = moment(date).format("DD/MM/YYYY");
          this.eventNew.date = moment(date).format("DD/MM/YYYY");
        }
      });
    }
  }

  changeEventName(id, text) {
    this.news.forEach((element) => {
      if (element.id === id) {
        element.title = text;
        this.eventNew.title = text;
        // element.date = moment( date).format("DD/MM/YYYY")
      }
    });
  }

  changeEventSource(id, text) {
    this.news.forEach((element) => {
      if (element.id === id) {
        element.source = text;
        this.eventNew.source = text;
        // element.date = moment( date).format("DD/MM/YYYY")
      }
    });
  }

  changeEventText(id, text) {
    this.news.forEach((element) => {
      if (element.id === id) {
        element.text = text;
        this.eventNew.text = text;
        // element.date = moment( date).format("DD/MM/YYYY")
      }
    });
  }

  changeEventFulltext(text) {
  //  console.log(text);
    this.eventNew.fulltext= text;
  }

  // сохраняем событие
  saveEvent=()=> {
    console.log( this.eventNew);
    return this.eventNew.hash;
   //return md5(this.eventNew.text +  Math.floor(Math.random()));
  }
  getInspectEvent(hash){
    // сперва пытаемся получить новость по хэшу
    const event = this.news.filter((item) => {
      return item.hash === hash ;
    });
    this.eventNew = Object.assign({}, event[0]);
    return event[0];
  }

  getEvent(hash) { 
    // сперва пытаемся получить новость по хэшу
    const event = this.news.filter((item) => {
      return  (item.hash === hash ) ;
    });
    this.eventNew = Object.assign({}, event[0]);
    return event[0];
  }

  getAll() {
    return this.news;
  }
}

export { storeNewsInspect };

export const newsInspect = new storeNewsInspect();

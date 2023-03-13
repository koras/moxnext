//import { observable,autorun, makeObservable, computed, action }  from "mobx"

import { makeAutoObservable } from "mobx";

import moment from "moment";

//import _ from "lodash";
//let md5 = require('md5');
class storeNews {
  constructor() {
    makeAutoObservable(this);
  }

  news = [  ];

  eventDate = "";

  default = {
    event: "",
    type: "",
    typeId: 0,
    hash: "",
    ticker: "",
    title_url: "",
    instrument: {
      instrumentId: 1111,
      name: "Биткоин",
      type: "crypto",
      ticker: "btc",
      price: 120,
      change: "-10",
      currency: "$",
    },
    date: "",
    title: "",
    source: "",
    fulltext: "",
    text: "",
    link: "",
  };

  // объект для редактирования

  eventNew = {
    id: Number,
    title: String,
    source: String,

    date: String,
    fulltext: String,
    text: String,
    link: String,
    ticker: String,
    instrument: {
      instrumentId: Number,
      name: String,
      type: String,
      ticker: String,
      price: Number,
      change: String,
      currency: String,
    },
  };

  getGefault(ticker) {
    this.eventNew = Object.assign({}, this.default);
    return this.eventNew;
  }

  changeTypeEvent(id, value) {
    console.log(value);

    if (id === undefined) {
      this.eventNew.typeId = value.value;
      this.eventNew.event = value.label;
      this.eventNew.type = value.type;
      console.log(this.eventNew);
      return value;
    }

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
    console.log(id, date);
    if (id && date) {
      console.log(date);

      this.news.forEach((element) => {
        if (element.id === id) {
          element.date = moment(date).format("DD/MM/YYYY");
          this.eventNew.date = moment(date).format("DD/MM/YYYY");
        }
      });
    } else {
      this.eventDate = moment(date).format("DD/MM/YYYY");
    }
  } // обновляем дату при редактированиие события

  getDateNew() {
    if (this.eventNew && this.eventNew.date) {
      return this.eventNew.date;
    }
  }

  changeEventName(id, text) {
    //    if(element.id)
    if (id === undefined) {
      this.eventNew.title = text;
      return;
    }
    this.news.forEach((element) => {
      if (element.id === id) {
        element.title = text;
        this.eventNew.title = text;
        // element.date = moment( date).format("DD/MM/YYYY")
      }
    });
  }

  changeEventSource(id, text) {
    if (id === undefined) {
      this.eventNew.source = text;
      return;
    }
    this.news.forEach((element) => {
      if (element.id === id) {
        element.source = text;
        this.eventNew.source = text;
        // element.date = moment( date).format("DD/MM/YYYY")
      }
    });
  }

  changeEventText(id, text) {
    if (id === undefined) {
      this.eventNew.text = text;
      return;
    }

    this.news.forEach((element) => {
      if (element.id === id) {
        element.text = text;
        this.eventNew.text = text;
      }
    });
  }

  changeEventFulltext(text) {
    this.eventNew.fulltext = text;
  }

  // сохраняем событие
  saveEvent = () => {
    //  console.log( this.eventNew);
    return this.eventNew.hash;
    //return md5(this.eventNew.text +  Math.floor(Math.random()));
  };
  getInspectEvent(hash) {
    // сперва пытаемся получить новость по хэшу
    const event = this.news.filter((item) => {
      return item.hash === hash;
    });
    this.eventNew = Object.assign({}, event[0]);
    return event[0];
  }

  getNew(ticker, url) {
    // сперва пытаемся получить новость по хэшу
    const event = this.news.filter((item) => {
      return (
        (item.url === url && item.ticker === ticker) ||
        (item.hash === url && item.ticker === ticker)
      );
    });
    this.eventNew = Object.assign({}, event[0]);
    return event[0];
  }

  getEventDateAndTicker(ticker, date) {
    console.log(ticker, date);
    // сперва пытаемся получить новость по хэшу
    const event = this.news.filter((item) => {
      return item.date === date && item.ticker === ticker;
    });
    this.eventNew = Object.assign({}, event[0]);
    return event[0];
  }

  getNews() {
    return this.news;
  }
}

export { storeNews };

export const news = new storeNews();

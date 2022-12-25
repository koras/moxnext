
//import { observable,autorun, makeObservable, computed, action }  from "mobx"
 
 
//import { makeAutoObservable } from "mobx";
import {storeNews} from "./storeNews";
//import _ from "lodash";

// class Store {
  
//   constructor() {
//     makeAutoObservable(this);
//  }
   

//    getNews () { 
//     return this.getNews
//   }

// }

// export { Store };

export const store = {
  storeNews,
}
import { create } from 'zustand';
import { immer } from "zustand/middleware/immer";
import { devtools } from "zustand/middleware";
// Создаем хранилище Zustand
export const notificationStore = create(
  
  devtools(
  
    immer((set) => ({
  count: 0,
  cakesData: { },
  addNotifications: (data:any) => { 
    set((state: any) => {
      state.cakesData = data;
    })
  },
})))

);

//export default notificationStore;
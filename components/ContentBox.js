// import {

//   Link
// } from "react-router-dom";
import { FC } from "react";
import Menu from "./menu/Menu";
import MenuMobile from "./menu/MenuMobile";

import Header from "./header/Header";
import Head from "next/head";
import styles from "./styleContent.module.css";
import { notice } from "../constants/general";
import React, {
  forwardRef,
  useState,
  useImperativeHandle,
  useEffect,
} from "react";

import { notificationStore } from "../stories/notificationStore";

import Notification from "./notification/Notification";

 
function ContentBox({ content = "", children, ...params }, ref) {
  const [showMenu, setShowMenu] = useState(false);
  const [notificationVisible, setNotificationVisible] = useState(true);

  const cakesData = notificationStore((state) => state.cakesData);
   const addNotification = notificationStore((state) => state.addNotifications);


  useEffect(() => {
    setNotificationVisible(true);

    const timer = setTimeout(() => {
      setNotificationVisible(false);
      
      addNotification({});
      clearTimeout(timer);
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [cakesData]);

  const hideNotification = () => {
    setNotificationVisible(false);
  };

  let className = styles.boxContent;
  if (params.hideBorder) {
    className += " " + styles.boxContentHide;
  }

  const getHead = () => {
    let result = "";
    if (params.ticker || params.title) {
      result = (
        <div className={styles.titleClass}>
          <h2>
            {" "}
            {params.ticker ? params.ticker + " : " : ""} {params.title}
          </h2>
        </div>
      );
    }
    return result;
  };

  const getTitleSeo = () => {
    return params.pageTitle ? params.pageTitle : "";
  };

  const invokeMenuMobile = (status) => {
    console.log(status);
    setShowMenu(status);
  };

  const updateErrors = (params) => {
    console.log(params);
  };

  const getDescriptionSeo = () => {
    return params.pageDescription ? params.pageDescription : "";
  };

  useImperativeHandle(ref, () => ({
    updateErrors,
  }));

  return (
    <div>
      <div className={styles.notificationContainer}>
     
          {cakesData &&
            cakesData.messages &&
            cakesData.messages.map((item, i) => (
              <Notification
                key={i}
                item={item}
                message={item}
                showNotification={notificationVisible}
              />
            ))}
    
      </div>
      <Head>
        <title>{getTitleSeo()}</title>
        <meta name="description" content={getDescriptionSeo()} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={styles.headerClass}>
        <Header invokeMenuMobile={(status) => invokeMenuMobile(status)} />
      </div>
      <div className={styles.headerClassMobile}></div>

      {showMenu ? (
        <div className={styles.headerClassMenuMobile}>
          <MenuMobile />
        </div>
      ) : (
        <></>
      )}
      {/* {()=>showNotification()} */}

     

      <div className={styles.contentClass}>
        <div className={styles.mainClass}>
          <div className={styles.menuClass}>
            <Menu />
            <div className={styles.blockHr}></div>
          </div>
          <div className={styles.mainContent}>
            {getHead()}
            <div className={className}>{children}</div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}></div>
        <div className={styles.footerContentNotice}>{notice}</div>
      </div>
    </div>
  );
}

export default forwardRef(ContentBox);

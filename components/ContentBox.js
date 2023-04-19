// import {

//   Link
// } from "react-router-dom";
import Menu from "./../components/menu/Menu";
import Header from "./header/Header";
import Head from 'next/head'
import styles from "./styleContent.module.css";
import {notice} from "./../constants/general";

 


function ContentBox({ content="", children, ...params }) {
  let className = styles.boxContent;
  if (params.hideBorder) { 
    className += " "+ styles.boxContentHide;
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

  const  getTitleSeo = ()=> {
    return params.pageTitle ? params.pageTitle  : "";
  }

  const  getDescriptionSeo = ()=> {
    return params.pageDescription ? params.pageDescription  : "";
  }
   
  return (
    <div>
        <Head>
            <title>{getTitleSeo()}</title>
            <meta name="description" content={getDescriptionSeo()} />
            <meta name="viewport" content="width=device-width, initial-scale=1" />
            <link rel="icon" href="/favicon.ico" />
        </Head>
      <div className={styles.headerClass}>
        <Header />
      </div>
      <div className={styles.headerClassMobile}>
     
      </div>
      <div className={styles.contentClass}>
        <div className={styles.mainClass}>
          <div className={styles.menuClass}>
            <Menu />
            <div className={styles.blockHr}></div>
          </div>
          <div className={styles.mainContent}>
            {getHead()}
            <div className={className}>
              {children}
            </div>
          </div>
        </div>
      </div>

      <div className={styles.footer}>
        <div className={styles.footerContent}>

        </div>
        <div className={styles.footerContentNotice}>
          {notice}
        </div>
      </div>
    </div>
  );
} 

export default ContentBox;

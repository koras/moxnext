import Link from 'next/link'

//import "./styleNews.css";
import { useRouter } from 'next/navigation';

 
import React, { useState, useEffect } from "react";

 
import styles from './styleInfoBox.module.css';
 
 
export default function Infobox(props: any) {

  return <div className={styles.infoBox}>
      <div className={styles.infoBoxLogo}>
        <img alt="" src={process.env.NEXT_PUBLIC_IMG_LOGO + `${props.instrument.logo}`} />
      </div>
      <div className={styles.infoBoxContent}>
      <div className={styles.infoMainBox}>
          <div className={styles.infoMain}>
          <div className={styles.infoMainInstrumentName}> 
          <h6> <Link href={"/" +props.instrument.type +"/" +props.instrument.ticker} >
             {props.instrument.instrument_name} </Link></h6>
          </div>
          <div className={styles.infoMainPrice}> {props.instrument.price} {props.instrument.mark} </div>
          </div>
          <div >
            {/* <Link href={`/${props.instrument.type}/${props.instrument.ticker}`}>{name}</Link> */}
              {props.instrument.description}
            </div>
          </div>
    </div>
  </div>;

};

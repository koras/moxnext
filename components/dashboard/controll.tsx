// http://localhost:3000/event/create/btc

import Select from "react-select";


import 'moment/locale/ru';

import { eventsName, controllTypeInstrument,controllSharesLevel } from "../../constants/general"; 
import React, { useState} from "react";


import  styles from './styleForm.module.css'

export default function DashboardControll(props:any) {
    interface InstrumentType {
        typeId: number; 
        level: number; 
      }
       
      const [typeId, setTypeId] = useState(0);
      const [level, setLevel] = useState(0);
      
    const [getData, setData] = useState<InstrumentType>({
        typeId: 0,  
        level: 0,  
      });

    const [writeForm, setWriteForm] = useState(false);
    const getType = () => {
        const res = controllTypeInstrument.filter((option: any) => {
                return option.value === typeId
        })
 
        return (res) ? res : [];
        
    };

    
    const getSharesLevel = () => {
        const res = controllSharesLevel.filter((option: any) => {
         //   if (getData) {
                return option.value === +level;
          //    }
        })
        return (res) ? res : {};
    };



    const getValidateType = () => {
        if (!writeForm) {
            return true;
        }
        //   return getData.typeId != 0;
    }
    const changeTypeEvent = (value: any) => {
        setTypeId(value.value)
        console.log('changeTypeEvent ',value.value);

        if(value.value != "shares"){
            setLevel(0)
            props.onChangeType({typeId:typeId,level:0})
        }
        props.onChangeType({typeId:value.value})
    }
    const changeTypeLevel = (value: any) => {
        setLevel(value.value)
 
        console.log('changeTypeLevel ',value.value);
        props.onChangeType({typeId:typeId,level:value.value})
    }

  
    const getShareLevel  = () => {
    
        const type = getType();

        if(type && type[0] && type[0].type && type[0].type == "shares"){ 

                return  <div className={styles.formControll25}>
                        <div className={styles.controllTitle} >
                            <label>Эшелон</label>
                        </div>
                        <div className={styles.controllSearch} >
                                <Select
                                    styles={{
                                        control: (baseStyles, state) => ({
                                            ...baseStyles,
                                            borderColor: getValidateType() ? '#ced4da' : 'red',
                                        }),
                                    }}
                                    id={'id'}
                                    instanceId={'instanceId'}
                                    value={getSharesLevel()}
                                    className={styles.formSelect}
                                    placeholder={"Любой ..."}
                                    onChange={(value) => changeTypeLevel(value)}
                                    options={controllSharesLevel}
                                />
                            </div>
                    </div>
        }else{
            return <></>
        }
    }





    return (
        <div>
            <div className={styles.controll}> 
                <div className={styles.formControll25}>
                    <div className={styles.controllTitle} >
                        <label>Тип инструмента</label>
                    </div>
                    <div className={styles.controllSearch} >
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
                            placeholder={"акции/крипта"}
                            onChange={(value) => changeTypeEvent(value)}
                            options={controllTypeInstrument}
                        />
                    </div>
                </div>
                     {getShareLevel()} 
            
            </div>
        </div>
    );

}


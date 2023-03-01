// http://localhost:3000/event/create/btc

import Select from "react-select";


import 'moment/locale/ru';

import { eventsName, controllTypeInstrument } from "../../constants/general"; 
import React, { useState} from "react";


import  styles from './styleForm.module.css'

export default function DashboardControll() {
    const [writeForm, setWriteForm] = useState(false);
    const getType = () => {
        const res = eventsName.filter((option: any) => {
            //    if (getData) {

            //        return option.value === +getData.typeId;
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
                <div className={styles.formControll25}>
                    <div className={styles.controllTitle} >
                        <label>Уровень/Вид/Эшелон</label>

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
                            placeholder={"Любой ..."}
                            onChange={(value) => changeTypeEvent(value)}
                            options={eventsName}
                        />
                    </div>
                </div>


                
                <div className={styles.formControll25}>
                    <div className={styles.controllTitle} >
                        <label>Отрасль(для акций)</label>
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
                            placeholder={"Любой ..."}
                            onChange={(value) => changeTypeEvent(value)}
                            options={eventsName}
                        />
                    </div>
                </div>
                
            </div>
        </div>
    );

}


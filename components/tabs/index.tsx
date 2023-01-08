import styles from "./style.module.css";


import { useState } from "react";

function Tabs(props: any) {

    const [activeTab, setActiveTab] = useState(1);
    const [hintInfo, setHintInfo] = useState('Время изменения');
    const [changes, setСhanges] = useState(-24);

    const onClickTab = (k: number) => {
        setActiveTab(k);

        let info = props.objects.filter((item: object) => {
            const id = item.id;
            return id === k;
        })
        setСhanges(info[0].changes);
        setHintInfo(info[0].hintInfo);
        props.onTimeChange(info[0].time);
    }
    const activeNav = (id: number) => {
        if (id === activeTab) {
            return styles.active;
        } else {
            return styles.tabLink;
        }
    }


    const titleClass = (props: any) => {
        return (props.hint && props.hint !== "") ? styles.tabButton__title : styles.tabButton__titleOne + " ";
    }

    function Hint(props: any) {
        return <div className={styles.tabButton__hint}>{props.hint}</div>;
    }


    function ObjectRow(propsRows: any) {
        return <li className={activeNav(propsRows.id)}
            onClick={() => onClickTab(propsRows.id)}>
            <div className={styles.tabButton}>
                <div className={titleClass(propsRows)}>{propsRows.name}</div>
                {propsRows.hint && propsRows.hint !== "" ? <Hint hint={propsRows.hint} /> : null}
            </div>
        </li>;
    }



    function Info() {
        return <div className={styles.tabInfoBlock}>
            <div className={styles.tabInfo}>
                <div className={styles.tabInfoName}>{props.infoBox.title}</div>
                <div className={styles.tabInfoHint}>{hintInfo}</div>
            </div>
            <div className={styles.tabInfoPrice}>
                <div className={styles.tabInfoBlockName + " minus"}>{changes}%</div>
            </div>
        </div>;
    }

    return (
        <div className={styles.tabs}>
            <Info />
            <div className={styles.tabList}>
                <ul>
                    {props.objects.map((object: any, i: number) => <ObjectRow name={object.name} hint={object.hint} id={object.id} key={i} />)}
                </ul>
            </div>
        </div>
    );
}

export default Tabs;

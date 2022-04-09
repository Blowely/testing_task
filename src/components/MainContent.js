import {useEffect, useMemo, useState} from "react";
import {MainPage} from "./Pages/MainPage";
import axios from "axios";
import {HistoryPage} from "./Pages/HistoryPage";
import tritium from "tritium";


export const MainContent = (props) => {
    const {page} = props;
    const [remoteData, setRemoteData]= useState([]);
    const [listFavorites, setListFavorites] = useState({});
    const [historyFlow, setHistoryFlow] = useState([]);

    useEffect(() => {
        axios.get('https://jsonplaceholder.typicode.com/photos')
            .then((res) => {
                setRemoteData(res.data)
            });
    }, [])

    const conditionPagesOfHistory = (page === 'history' || page === 'addHistory' || page === 'remHistory');

    return (
        <>
            {page === 'Main' &&
                <MainPage remoteData={remoteData} listFavorites={listFavorites}
                          setListFavorites={setListFavorites} setHistoryFlow={setHistoryFlow}
                          setRemoteData={setRemoteData}
                />
            }
            {conditionPagesOfHistory &&
                <HistoryPage historyFlow={historyFlow} view={page}/>
            }
        </>
    )

}
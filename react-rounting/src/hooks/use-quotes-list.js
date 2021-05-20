import { useState, useEffect } from "react"
import { requestStatus } from "./use-http";



const useQuotesList = (quotesListRequest = null) => {
    const [quotesList, setQuotesList] = useState([]);
    const {sendRequest: getQuotesList, status, data, error} = quotesListRequest || {};
    useEffect(() => {
        if(quotesList.length > 0){
            return quotesList;
        }
        getQuotesList();
        if(status !== requestStatus.completed || !!error){
            return;
        }
        setQuotesList(data);
    }, [status, error, data, getQuotesList, quotesList]);
    return {quotesList, status};
}

export default useQuotesList;
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import QuoteForm from "../components/quotes/QuoteForm";
import useHttp, {requestStatus} from '../hooks/use-http';
import {addQuote} from '../lib/api';

const NewQuote = () => {
    const {sendRequest, status} = useHttp(addQuote);
    const history = useHistory();
    useEffect(() => {
        if(status === requestStatus.completed){
            history.replace('/quotes');
        }
    }, [status, history]);

    const addQuoteHandler = quoteData => {
        sendRequest(quoteData);
    }
    return <QuoteForm isLoading={status === requestStatus.pending} onAddQuote={addQuoteHandler}/>
}

export default NewQuote;
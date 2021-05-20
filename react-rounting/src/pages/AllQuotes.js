import QuoteList from "../components/quotes/QuoteList";
import LoadingSpinner from "../components/UI/LoadingSpinner";
import useHttp, { requestStatus } from "../hooks/use-http";
import useQuotesList from "../hooks/use-quotes-list";
import { getAllQuotes } from "../lib/api";


const AllQuotes = () => {
  const { quotesList: allQuotesList, status } = useQuotesList(useHttp(getAllQuotes, true));
  if (status === requestStatus.pending ||!allQuotesList || allQuotesList.length <= 0) {
    return (
      <div className="loading">
        <LoadingSpinner />
      </div>
    );
  }
  return (
    <QuoteList quotes={allQuotesList}/>
  );
};

export default AllQuotes;

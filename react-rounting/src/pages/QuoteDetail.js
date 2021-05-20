import { Route, useParams, Link, useRouteMatch } from "react-router-dom";
import { Fragment, useEffect } from "react";
import Comments from "../components/comments/Comments";
import HighlightedQuote from "../components/quotes/HighlightedQuote";
import NotFound from "./NotFound";
import { getSingleQuote } from "../lib/api";
import useHttp, { requestStatus } from "../hooks/use-http";
import LoadingSpinner from "../components/UI/LoadingSpinner";

const QuoteDetail = (props) => {
  const {
    sendRequest: getQuoteRequest,
    status,
    data: quote,
    error,
  } = useHttp(getSingleQuote.bind(props.quoteId));
  const params = useParams();
  const match = useRouteMatch();
  useEffect(() => {
    if (!!quote || !!status) {
      return;
    }
    getQuoteRequest(params.quoteId);
  }, [status, error, quote, getQuoteRequest, params]);
  if (!status || status === requestStatus.pending) {
    return (
      <div className="loading">
        <LoadingSpinner />;
      </div>
    );
  }
  if (!quote && status === requestStatus.completed) {
    return <NotFound />;
  }
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className="centered">
          <Link className="btn--flat" to={`${match.url}/comments`}>
            Load Comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments quoteId={params.quoteId}/>
      </Route>
    </Fragment>
  );
};

export default QuoteDetail;

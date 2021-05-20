import { Fragment } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import LoadingSpinner from '../UI/LoadingSpinner';

import QuoteItem from './QuoteItem';
import classes from './QuoteList.module.css';

const sortQuotes = (quotes, ascending) => {
  return quotes.sort((quoteA, quoteB) => {
    if (ascending) {
      return quoteA.id > quoteB.id ? 1 : -1;
    } else {
      return quoteA.id < quoteB.id ? 1 : -1;
    }
  });
};

const QuoteList = (props) => {
  const history = useHistory();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  let isAscendingSorted = searchParams.get('sort') === 'asc';
  const quotesList = sortQuotes(props.quotes, isAscendingSorted);
  const handleSorting = () => {
    history.push({
      pathname: location.pathname,
      search: `?sort=${isAscendingSorted ? 'desc' : 'asc'}`
    });
  }
  return (
    <Fragment>
      <div className={classes.sorting}>
        <button onClick={handleSorting}>Sort {isAscendingSorted ? `Descending` : 'Ascending'}</button>
      </div>
      {props.isLoading && (
          <div className="loading">
            <LoadingSpinner />
          </div>
        )}
      <ul className={classes.list}>
        {quotesList.map((quote) => (
          <QuoteItem
            key={quote.id}
            id={quote.id}
            author={quote.author}
            text={quote.text}
          />
        ))}
      </ul>
    </Fragment>
  );
};

export default QuoteList;

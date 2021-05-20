import { Redirect, Switch } from "react-router-dom";
import { Route } from "react-router-dom/cjs/react-router-dom.min";
import Layout from "./components/layout/Layout";
import AllQuotes from "./pages/AllQuotes";
import NewQuote from "./pages/NewQuote";
import NotFound from "./pages/NotFound";
import QuoteDetail from "./pages/QuoteDetail";

function App() {
  return (
    <Layout>
      <Switch>
        <Route path="/" exact>
          <Redirect from="/" to="/quotes" />
        </Route>
        <Route path="/quotes" exact>
          <AllQuotes></AllQuotes>
        </Route>
        <Route path="/quotes/:quoteId">
          <QuoteDetail />
        </Route>
        <Route path="/new-quote">
          <NewQuote />
        </Route>
        <Route path="*">
          <NotFound/>
        </Route>
      </Switch>
    </Layout>
  );
}

export default App;

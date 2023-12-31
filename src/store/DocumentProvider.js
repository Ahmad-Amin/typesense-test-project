import { useState } from "react";
import DocumentContext from "./documents-context";

const DocumentProvider = (props) => {
  const [results, setResults] = useState({
    documents: [],
    facet_counts: [],
    totalResults: 0,
  });
  const [showMore, setShowMore] = useState(false);

  const tranformRecordAndStore = (apiResponse) => {

    const { hits, facet_counts, found } = apiResponse.results[0] || {};

    if (showMore) {
      setResults((prevState) => ({
        ...prevState,
        documents: [...prevState.documents, ...hits],
      }));
      setShowMore(false);
    } else {
      setResults({
        documents: hits,
        facet_counts: facet_counts,
        totalResults: found,
      });
    }
  };

  const documentContext = {
    results: results,
    setResults: setResults,
    tranformRecordAndStore: tranformRecordAndStore,
    setShowMore: setShowMore,
  };

  return (
    <DocumentContext.Provider value={documentContext}>
      {props.children}
    </DocumentContext.Provider>
  );
};

export default DocumentProvider;

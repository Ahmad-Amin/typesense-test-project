import React from "react";

const DocumentContext = React.createContext({
  results: [],
  setResults: () => {},
  showMore: false,
  setShowMore: () => {},
  tranformRecordAndStore: () => {},
});

export default DocumentContext;

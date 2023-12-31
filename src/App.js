import React, { useEffect, useState, useContext, useMemo } from "react";

import useTypesense from "./hooks/useTypesense";
import { debounce } from "lodash";

import ResultCard from "./components/ResultCard";
import SiderBarFilter from "./components/SiderBarFilter";
import DocumentContext from "./store/documents-context";

const commonSearchParams = {
  query_by: "title",
  facet_by: "release_year, type",
  highlight_full_fields: "title",
  offset: 0,
  per_page: 15,
  sort_by: "_text_match:desc",
  max_facet_values: 100,
  collection: "Movies",
};

const App = () => {
  const { client } = useTypesense();
  const docCtx = useContext(DocumentContext);

  const [searchParameters, setSearchParameters] = useState({
    q: "",
    filter_by: "",
  });

  const handleInputChange = useMemo(
    () =>
      debounce((value) => {
        setSearchParameters((prevState) => ({ ...prevState, q: value }));
      }),
    []
  );

  const handleAdditionalFilter = useMemo(
    () => (additionalFilters) => {
      const transformFilterString = Object.entries(additionalFilters)
        .filter(([key, values]) => values.length > 0)
        .map(([key, values]) => `${key}:= [${values.join(", ")}]`)
        .join(" && ");

      setSearchParameters((prevState) => ({
        ...prevState,
        filter_by: transformFilterString,
      }));
    },
    []
  );  

  const extractMoreRecords = () => {
    setSearchParameters((prevState) => ({
      ...prevState,
      offset: commonSearchParams["offset"] + commonSearchParams["per_page"],
    }));
    docCtx.setShowMore(true);
  };

  const isMoreRecord =
    docCtx.results.totalResults > docCtx.results.documents.length;

  useEffect(() => {
    if (!client) return;
    const fetchDataFromTypesense = async () => {
      try{
        const searchRequests = {
          searches: [
            { ...searchParameters },
          ],
        };
        const response = await client.multiSearch.perform(
          searchRequests,
          commonSearchParams
        );
        docCtx.tranformRecordAndStore(response);
      } catch(error){
        alert("Error fetching data from Typesense:", error);
      }
    };

    fetchDataFromTypesense();

    return () => handleInputChange.cancel();
  }, [searchParameters, client, docCtx, handleInputChange]);

  return (
    <div className="text-center">
      <h1 className="pt-5 text-3xl font-bold">Welome TypeSense Test Project</h1>

      <p className="w-4/12 mx-auto text-neutral-700 my-7">
        This dataset used is of Movie. It consist of multiple information about
        the movie i.e., it's rating, cast, release year, language, country etc..
      </p>
      <div className="flex gap-3 justify-center">
        <label className="text-lg font-medium text-center">Movies title</label>
        <input
          className="border bg-gray-50 mr-2 px-4 py-1 rounded-md"
          placeholder="start typing..."
          type="text"
          onChange={(e) => handleInputChange(e.target.value)}
        />
      </div>

      <hr className="my-10" />

      <h2 className="text-2xl font-bold">Extracted Results</h2>
      {docCtx.results.totalResults !== 0 && (
        <p>
          {docCtx.results.totalResults} results found - Searched 8,807 Movies{" "}
        </p>
      )}
      <div className="grid gap-3 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <div className="col-span-3">
          <div className="m-10 grid grid-flow-row gap-8 text-neutral-600 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {docCtx.results?.documents.map(({ document, highlight }, index) => (
              <ResultCard
                key={document.id + index}
                document={document}
                highlight={highlight}
              />
            ))}
          </div>
          {isMoreRecord && (
            <button
              className="bg-blue-500 text-white px-4 py-2 my-3"
              onClick={extractMoreRecords}
            >
              Show More
            </button>
          )}
        </div>
        <SiderBarFilter
          filters={docCtx.results.facet_counts}
          handleAdditionalFilter={handleAdditionalFilter}
        />
      </div>
    </div>
  );
};

export default App;

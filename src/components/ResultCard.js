import Modal from "../UI/Modal/Modal";
import { useState } from "react";

import CardDetails from './CardDetails'

import DOMPurify from "dompurify";

import React from "react";

const ResultCard = ({ document, highlight }) => {
  const title =
    Object.keys(highlight).length === 0
      ? document.title
      : highlight.title?.value;

  const highlightedTitle = DOMPurify.sanitize(title);
  const { description } = document;

  const [modalShow, setModalShow] = useState(false);
  const showMoreDetails = () => {
    setModalShow(true);
  };

  return (
    <div className="flex justify-center item-center">
      <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
        <h5
          className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white"
          dangerouslySetInnerHTML={{ __html: highlightedTitle }}
        ></h5>
        <p className="font-normal text-gray-700 dark:text-gray-400">
          {description}
        </p>
        <button
          className="mt-10 bg-blue-500 text-white px-3 py-1 rounded-sm"
          onClick={showMoreDetails}
        >
          More Details
        </button>
      </div>

      {modalShow && (
        <Modal onhideDetails={() => setModalShow(false)}>
          {document && <CardDetails document={document} />}
        </Modal>
      )}
    </div>
  );
};

export default ResultCard;

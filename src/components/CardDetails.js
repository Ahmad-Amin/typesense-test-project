import React from "react";

const CardDetails = ({ document }) => {
  const {
    cast,
    country,
    date_added,
    description,
    director,
    duration,
    rating,
    release_year,
    title,
    type,
  } = document;

  return (
    <div className=" bg-gray-100 flex flex-col justify-center rounded-xl ">
      <div className="bg-white shadow-lg border-gray-100 border sm:rounded-3xl p-8 flex space-x-8">
        <div className="flex flex-col w-full space-y-4">
          <div className="flex justify-between items-start">
            <h2 className="text-3xl font-bold">{title}</h2>
            <div className="bg-yellow-400 font-bold rounded-xl p-2">
              {rating}
            </div>
          </div>
          <div className="flex justify-between">
            <div>
              <div className="text-sm text-gray-400">
                {type}({country})
              </div>
              <div className="text-lg text-gray-800">{release_year}</div>
            </div>
            <div>
              <div className="text-sm text-gray-400">{date_added}</div>
              <div className="text-lg text-gray-800">{duration}</div>
            </div>
          </div>
          <p className=" text-gray-400">{description}</p>
          <strong>Cast</strong>
          <ul className="text-gray-400" style={{ columns: "2" }}>
            {cast.split(",").map((mem, index) => (
              <li key={index}>{mem}</li>
            ))}
          </ul>
          <div className="flex text-lg font-bold">{director}</div>
        </div>
      </div>
    </div>
  );
};

export default CardDetails;

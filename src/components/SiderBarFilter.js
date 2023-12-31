import React, { useState } from "react";
import Checkbox from "./Checkbox";

const SiderBarFilter = ({ filters, handleAdditionalFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const transformedFilters = Object.fromEntries(filters.map(({ field_name, counts }) => [field_name, counts]));

  const handleCheckboxChange = (key, value) => {
    setSelectedFilters((prevSelectedFilters) => {
      const updatedFilters = { ...prevSelectedFilters };

      if (updatedFilters[key]) {
        if (updatedFilters[key].includes(value)) {
          updatedFilters[key] = updatedFilters[key].filter(
            (filter) => filter !== value
          );
        } else {
          updatedFilters[key] = [...updatedFilters[key], value];
        }
      } else {
        updatedFilters[key] = [value];
      }

      handleAdditionalFilter(updatedFilters);
      return updatedFilters;
    });
  };

  return (
    <div className="px-5">
      {Object.keys(transformedFilters).map((key, index) => (
        <div key={`${key}-${index}`}>
          <p className="t text-lg bg-neutral-100 py-2 rounded-md">
            Filter by {key}
          </p>
          <ul className="p-5 grid grid-cols-3">
            {transformedFilters[key].map((rec, index) => (
              <li key={`${key}-${index}`}>
                <Checkbox
                  record={rec}
                  checked={(selectedFilters[key] || []).includes(rec.value)}
                  onChange={() => handleCheckboxChange(key, rec.value)}
                />
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default SiderBarFilter;

import React from "react";

export default function SortSelect({ sortDescription, handleSort }) {
  return (
    <select onChange={handleSort}>
      <option value="default">{sortDescription}</option>
      <option value="asc">Ascending</option>
      <option value="desc">Descending</option>
    </select>
  );
}
import React from 'react';

function SearchAndFilter({ searchQuery, setSearchQuery, filterCriteria, setFilterCriteria }) {
  return (
    <div className="search-filter">
      <input
        type="text"
        placeholder="Search items..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
      />
      <select
        value={filterCriteria}
        onChange={(e) => setFilterCriteria(e.target.value)}
      >
        <option value="all">All Items</option>
        <option value="lowStock">Low Stock</option>
        <option value="outOfStock">Out of Stock</option>
      </select>
    </div>
  );
}

export default SearchAndFilter;

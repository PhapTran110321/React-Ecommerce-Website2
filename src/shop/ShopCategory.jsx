import React from "react";

const ShopCategory = ({
  filterItem,
  setItem,
  menuItems,
  setProduct,
  selectedCategory,
}) => {
  return (
    <>
      <div className="widget-header">
        <h5>All Categories</h5>
      </div>
      <div>
        <button
          className={`m-2 ${selectedCategory === "All" ? "bg-warning" : ""}`}
        >
          All
        </button>
        {menuItems.map((Val, id) => {
          return (
            <button
              className={`m-2 ${
                selectedCategory === "All" ? "bg-warning" : ""
              }`}
              onClick={() => filterItem(Val)}
              key={id}
            >
              {Val}
            </button>
          );
        })}
      </div>
    </>
  );
};

export default ShopCategory;

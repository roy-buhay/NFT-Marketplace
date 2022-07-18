import React from "react";

export interface IProps {
  category: string,
  active: string,
  setFilter(_category: string) : void,
}

export const Tag:React.FC<IProps> = ({category, setFilter, active}) => {
    const handleFilterChange = React.useCallback(
      () => setFilter(category === "all" ? "all" : category.toLowerCase()), []
    );
    return (
      <button
        onClick={() => handleFilterChange()}
        className={`${active.toLowerCase() === category.toLowerCase()
            ? "text-white"
            : "text-[#ffffff52]"
        } text-base font-light px-2 py-1 hover:border-white active:scale-95 capitalize`}
        >
        {category}
    </button>
    )
}

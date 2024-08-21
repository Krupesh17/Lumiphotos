import { MagnifyingGlass, X } from "@phosphor-icons/react";
import React, { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Controller, useForm } from "react-hook-form";
import { SearchValidation } from "../../../validations";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import SearchBarDropdownMenu from "./SearchBarDropdownMenu";

const SearchBar = ({
  height = "h-[35px]",
  dropDownPositionTop = "top-11",
  className = "",
}) => {
  const navigate = useNavigate();
  const { searchTerm } = useParams();
  const { pathname } = useLocation();

  const [searchBarDropdown, setSearchBarDropdown] = useState(false);
  const searchBarRef = useRef(null);

  const searchCategory = useSelector(
    (state) => state?.preference?.searchCategory
  );

  const {
    handleSubmit,
    control,
    formState: { isDirty },
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(SearchValidation),
    defaultValues: {
      search: "",
    },
  });

  const handleSearch = async (data) => {
    if (
      localStorage.getItem("recentSearches") &&
      localStorage.getItem("recentSearches").length > 0
    ) {
      let recentSearchesArray = localStorage
        .getItem("recentSearches")
        .split(",");

      if (recentSearchesArray.length >= 5) recentSearchesArray.pop();

      recentSearchesArray.unshift(data.search.trim().replace(/\s/g, "-"));

      localStorage.setItem("recentSearches", recentSearchesArray);
    } else {
      localStorage.setItem(
        "recentSearches",
        data.search.trim().replace(/\s/g, "-")
      );
    }

    setSearchBarDropdown(false);

    navigate(`/search/${searchCategory}/${data.search.replace(/\s/g, "-")}`);
    reset();
  };

  const handleFocus = () => {
    setSearchBarDropdown(true);
  };

  const handleBlur = (e) => {
    if (!searchBarRef.current.contains(e.relatedTarget)) {
      setSearchBarDropdown(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      setValue("search", [searchTerm.replace(/\-/g, " ")]);
    } else {
      setValue("search", "");
    }
  }, [searchTerm, pathname]);

  return (
    <div ref={searchBarRef} className={`relative basis-[800px] ${className}`}>
      <form
        onSubmit={handleSubmit(handleSearch)}
        className={`bg-foreground flex items-center gap-1 w-full border border-transparent rounded overflow-hidden px-1 focus-within:bg-background focus-within:border-border`}
      >
        <button
          type="submit"
          className="text-copy-lighter p-1 rounded focus-visible:text-copy hover:text-copy focus-visible:outline-box"
        >
          <MagnifyingGlass size={20} />
        </button>
        <Controller
          name="search"
          control={control}
          render={({ field }) => (
            <input
              type="text"
              className={`w-full ${height} bg-inherit text-copy`}
              placeholder="Search images"
              {...field}
              autoComplete="off"
              onFocus={handleFocus}
              onBlur={handleBlur}
            />
          )}
        />
        {isDirty && (
          <button
            type="button"
            className="text-copy-lighter p-1 rounded focus-visible:text-copy hover:text-copy focus-visible:outline-box"
            onClick={() => reset()}
          >
            <X size={20} />
          </button>
        )}
      </form>

      {searchBarDropdown && (
        <SearchBarDropdownMenu
          dropDownPositionTop={dropDownPositionTop}
          setSearchBarDropdown={setSearchBarDropdown}
        />
      )}
    </div>
  );
};

export default SearchBar;

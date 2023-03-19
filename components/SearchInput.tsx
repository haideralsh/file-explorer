import { useEffect, useRef, useState } from "react";
import { css } from '@emotion/css';
import { SearchIcon } from "../icons";

const classes = {
  search: css`
    flex-grow: 1;
    background: none;
    border: none;
    outline: none;
    font-size: 12px;
  `,
};

type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    function handleSlashPress(e: KeyboardEvent) {
      if (e.key !== "/" || e.ctrlKey || e.metaKey) return;

      let formInputExp = /^(?:input|textarea|select|button)$/i;
      if (formInputExp.test((e?.target as HTMLElement)?.tagName)) return;

      e.preventDefault();
      inputRef?.current?.focus();
    }

    document.addEventListener("keyup", handleSlashPress);

    return () => {
      document.removeEventListener("keyup", handleSlashPress);
    };
  }, []);

  return (
    <div
      style={{
        border: focused ? "1px solid #166CD7" : "1px solid #dce1e6",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        borderRadius: 6,
        padding: "6px 12px",
        margin: "0px 15px"
      }}
    >
      <div
        style={{
          flexGrow: 1,
          display: "flex",
          alignItems: "center",
          gap: 8,
        }}
      >
        <SearchIcon />
        <input
          onFocus={() => {
            setFocused(true);
          }}
          onBlur={() => {
            setFocused(false);
          }}
          placeholder="Search"
          className={classes.search}
          ref={inputRef}
          onChange={(e) => onSearch(e.target.value)}
        />
      </div>
      <span
        style={{
          fontSize: 12,
          color: "#747C84",
          backgroundColor: "rgba(220, 220, 230, 0.75)",
          padding: "2px 6px",
          borderRadius: 3,
          flexShrink: 0,
        }}
      >
        /
      </span>
    </div>
  );
};

export default SearchInput;

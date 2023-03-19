import { useEffect, useRef, useState } from "react";
import { css } from "@emotion/css";

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
        <svg
          width="15"
          height="15"
          viewBox="0 0 15 15"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          style={{
            flexShrink: 0,
          }}
        >
          <path
            d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
            fill="#6B7884"
            fillRule="evenodd"
            clipRule="evenodd"
          />
        </svg>
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

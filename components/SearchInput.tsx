import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { SearchIcon } from "../icons";

const SearchTextInput = styled.input`
  flex-grow: 1;
  background: none;
  border: none;
  outline: none;
  font-size: 12px;
`;

const ShortcutIndicator = styled.span`
  font-size: 12px;
  color: #747c84;
  background-color: rgba(220, 220, 230, 0.75);
  padding: 2px 6px;
  border-radius: 3px;
  flex-shrink: 0;
`;

const SearchInputWrapper = styled.div<{ focused: boolean }>`
  display: flex;
  border: ${(props) =>
    props.focused ? "1px solid #166CD7" : "1px solid #dce1e6"};
  align-items: center;
  justify-content: space-between;
  gap: 5px;
  border-radius: 5px;
  padding: 5px 10px;
  margin: 0px 15px;
  flex-grow: 1;
`;

type SearchInputProps = {
  onSearch: (query: string) => void;
};

const SearchInput: React.FC<SearchInputProps> = ({ onSearch }) => {
  const [focused, setFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  function focus() {
    setFocused(true);
    inputRef?.current?.focus();
  }

  useEffect(() => {
    function handleSlashPress(e: KeyboardEvent) {
      if (e.key !== "/" || e.ctrlKey || e.metaKey) return;

      let formInputExp = /^(?:input|textarea|select|button)$/i;
      if (formInputExp.test((e?.target as HTMLElement)?.tagName)) return;

      e.preventDefault();
      focus();
    }

    document.addEventListener("keyup", handleSlashPress);

    return () => {
      document.removeEventListener("keyup", handleSlashPress);
    };
  }, []);

  return (
    <SearchInputWrapper focused={focused} onClick={focus}>
      <SearchIcon />
      <SearchTextInput
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        placeholder="Search"
        ref={inputRef}
        onChange={(e) => onSearch(e.target.value)}
      />
      <ShortcutIndicator>/</ShortcutIndicator>
    </SearchInputWrapper>
  );
};

export default SearchInput;

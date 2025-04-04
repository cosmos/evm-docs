import React from 'react';
import SearchBar from '@theme-original/SearchBar';

/** It's a public API key, so it's safe to expose it here */
const COOKBOOK_PUBLIC_API_KEY = "a-b";

export default function SearchBarWrapper(props) {
  return (
    <>
      <SearchBar {...props} />
    </>
  );
}

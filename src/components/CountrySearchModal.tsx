"use client";

import Image from "next/image";
import React from "react";
import type { Country } from "@/data/countries";
import "@/styles/CountrySearchModal.css";
import { SearchIcon } from "./Svgs";

type Props = {
  query: string;
  onQueryChange: (v: string) => void;
  grouped: [string, Country[]][];
  selected: Country;
  onPick: (c: Country) => void;
};

const CountrySearchModal: React.FC<Props> = ({
  query,
  onQueryChange,
  grouped,
  selected,
  onPick,
}) => {
  return (
    <div
      className="country-popover"
      role="listbox"
      aria-activedescendant={`opt-${selected.code}`}
      tabIndex={-1}
    >
      <div className="search-row">
        <SearchIcon className="search-icon" />
        <input
          autoFocus
          placeholder="search country"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          className="input-country"
        />
      </div>

      <div className="country-list">
        {grouped.map(([letter, items]) => (
          <div className="group" key={letter}>
            <div className="group-label">{letter}</div>
            {items.map((c) => (
              <button
                key={c.code}
                id={`opt-${c.code}`}
                type="button"
                className={`row ${c.code === selected.code ? "active" : ""}`}
                onClick={() => onPick(c)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.flag} alt="" width={20} height={14} />
                <span className="name">{c.name}</span>
              </button>
            ))}
          </div>
        ))}
        {!grouped.length && <div className="empty">No matches</div>}
      </div>
    </div>
  );
};

export default CountrySearchModal;

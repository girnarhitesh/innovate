import React, { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import {
  getSearchSuggestions,
  searchNavbarContent,
} from "../../utils/navbarSearchIndex";
import "./NavbarSearch.css";

const NavbarSearch = ({ isMobile = false, onNavigate }) => {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => searchNavbarContent(query), [query]);
  const suggestions = useMemo(() => getSearchSuggestions(8), []);

  const flatItems = useMemo(() => {
    if (!query.trim()) {
      return suggestions;
    }

    return results.groups.flatMap((group) => group.items);
  }, [query, results.groups, suggestions]);

  const closeSearch = useCallback(() => {
    setIsOpen(false);
    setQuery("");
    setActiveIndex(-1);
  }, []);

  const openSearch = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(-1);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    const handlePointerDown = (event) => {
      if (!rootRef.current?.contains(event.target)) {
        closeSearch();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
      }
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, closeSearch]);

  const handleSelect = useCallback(
    (item) => {
      if (!item) {
        return;
      }

      if (typeof onNavigate === "function") {
        onNavigate();
      }

      if (item.type === "document") {
        window.open(item.path, "_blank", "noopener,noreferrer");
        closeSearch();
        return;
      }

      navigate(item.path);
      closeSearch();
    },
    [closeSearch, navigate, onNavigate],
  );

  const handleBrowseCategory = useCallback(
    (path) => {
      if (typeof onNavigate === "function") {
        onNavigate();
      }

      navigate(path);
      closeSearch();
    },
    [closeSearch, navigate, onNavigate],
  );

  const handleKeyDown = (event) => {
    if (!flatItems.length) {
      if (event.key === "Escape") {
        closeSearch();
      }
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((current) => (current + 1) % flatItems.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((current) =>
        current <= 0 ? flatItems.length - 1 : current - 1,
      );
      return;
    }

    if (event.key === "Enter" && activeIndex >= 0) {
      event.preventDefault();
      handleSelect(flatItems[activeIndex]);
    }
  };

  const showPanel = isOpen;
  const hasQuery = Boolean(query.trim());
  const panelItems = hasQuery ? results.groups : null;

  return (
    <div
      className={`NavbarSearch ${isOpen ? "is-open" : ""} ${isMobile ? "is-mobile" : "is-desktop"}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="NavbarSearch__toggle"
        onClick={() => (isOpen ? closeSearch() : openSearch())}
        aria-label={isOpen ? "Close search" : "Open search"}
        aria-expanded={isOpen}
      >
        {isOpen ? <CloseOutlined /> : <SearchOutlined />}
      </button>

      {showPanel ? (
        <div className="NavbarSearch__panel" role="dialog" aria-label="Site search">
          <div className="NavbarSearch__inputRow">
            <SearchOutlined className="NavbarSearch__inputIcon" />
            <input
              ref={inputRef}
              type="search"
              className="NavbarSearch__input"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search services, forms, policies..."
              aria-label="Search services and documents"
              autoComplete="off"
            />
            {query ? (
              <button
                type="button"
                className="NavbarSearch__clear"
                onClick={() => {
                  setQuery("");
                  setActiveIndex(-1);
                  inputRef.current?.focus();
                }}
                aria-label="Clear search"
              >
                Clear
              </button>
            ) : null}
          </div>

          <div className="NavbarSearch__results">
            {!hasQuery ? (
              <>
                <p className="NavbarSearch__sectionLabel">Suggestions</p>
                <ul className="NavbarSearch__list">
                  {suggestions.map((item, index) => (
                    <li key={item.id}>
                      <button
                        type="button"
                        className={`NavbarSearch__item ${activeIndex === index ? "is-active" : ""}`}
                        onClick={() => handleSelect(item)}
                        onMouseEnter={() => setActiveIndex(index)}
                      >
                        <span className="NavbarSearch__itemTitle">{item.title}</span>
                        <span className="NavbarSearch__itemMeta">{item.hint}</span>
                      </button>
                    </li>
                  ))}
                </ul>
                <div className="NavbarSearch__categories">
                  <button type="button" onClick={() => handleBrowseCategory("/services")}>
                    All Services
                  </button>
                  <button type="button" onClick={() => handleBrowseCategory("/compliances/forms")}>
                    Forms
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBrowseCategory("/compliances/policies")}
                  >
                    Policies
                  </button>
                  <button
                    type="button"
                    onClick={() => handleBrowseCategory("/compliances")}
                  >
                    Documents & Forms
                  </button>
                </div>
              </>
            ) : results.total === 0 ? (
              <div className="NavbarSearch__empty">
                <p>No matches for “{query.trim()}”.</p>
                <p>Try a service name, form, or policy title.</p>
              </div>
            ) : (
              panelItems.map((group) => (
                <div key={group.id} className="NavbarSearch__group">
                  <div className="NavbarSearch__groupHead">
                    <p className="NavbarSearch__sectionLabel">{group.label}</p>
                    <button
                      type="button"
                      className="NavbarSearch__browse"
                      onClick={() => handleBrowseCategory(group.browsePath)}
                    >
                      View all
                    </button>
                  </div>
                  <ul className="NavbarSearch__list">
                    {group.items.map((item) => {
                      const flatIndex = flatItems.findIndex(
                        (entry) => entry.id === item.id,
                      );

                      return (
                        <li key={item.id}>
                          <button
                            type="button"
                            className={`NavbarSearch__item ${activeIndex === flatIndex ? "is-active" : ""}`}
                            onClick={() => handleSelect(item)}
                            onMouseEnter={() => setActiveIndex(flatIndex)}
                          >
                            <span className="NavbarSearch__itemTitle">{item.title}</span>
                            <span className="NavbarSearch__itemMeta">{item.hint}</span>
                          </button>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              ))
            )}
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default NavbarSearch;

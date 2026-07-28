import React, { useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { SearchOutlined, CloseOutlined } from "@ant-design/icons";
import {
  getSearchSuggestions,
  searchNavbarContent,
} from "../../utils/navbarSearchIndex";
import { announceStatus } from "../../utils/announceStatus";
import "./NavbarSearch.css";

const NavbarSearch = ({ isMobile = false, onNavigate }) => {
  const navigate = useNavigate();
  const rootRef = useRef(null);
  const inputRef = useRef(null);
  const panelRef = useRef(null);
  const announceTimerRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(-1);
  const [panelStyle, setPanelStyle] = useState({
    position: "fixed",
    top: 72,
    right: 12,
    width: 360,
    zIndex: 11000,
  });
  const [statusText, setStatusText] = useState("");

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
    setStatusText("");
  }, []);

  const openSearch = useCallback(() => {
    setIsOpen(true);
    setActiveIndex(-1);
    setStatusText("Search opened. Type to find pages, services, and documents.");
    announceStatus("Search opened. Type to find pages, services, and documents.");
  }, []);

  const updatePanelPosition = useCallback(() => {
    const anchor = rootRef.current;

    if (!anchor) {
      return;
    }

    const rect = anchor.getBoundingClientRect();
    const gutter = 12;
    const width = isMobile
      ? Math.min(window.innerWidth - gutter * 2, 420)
      : Math.min(380, window.innerWidth - gutter * 2);

    let left = isMobile ? gutter : rect.right - width;
    left = Math.max(gutter, Math.min(left, window.innerWidth - width - gutter));

    const top = Math.min(
      Math.round(rect.bottom + 8),
      Math.max(8, window.innerHeight - 120),
    );

    setPanelStyle({
      position: "fixed",
      top,
      left: Math.round(left),
      width: Math.round(width),
      zIndex: 11000,
    });
  }, [isMobile]);

  useLayoutEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    updatePanelPosition();

    const focusTimer = window.setTimeout(() => {
      inputRef.current?.focus();
    }, 30);

    const handlePointerDown = (event) => {
      const target = event.target;
      const inRoot = rootRef.current?.contains(target);
      const inPanel = panelRef.current?.contains(target);

      if (!inRoot && !inPanel) {
        closeSearch();
      }
    };

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeSearch();
        rootRef.current?.querySelector(".NavbarSearch__toggle")?.focus();
      }
    };

    const handleReposition = () => {
      updatePanelPosition();
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    window.addEventListener("resize", handleReposition);
    window.addEventListener("scroll", handleReposition, true);

    return () => {
      window.clearTimeout(focusTimer);
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
      window.removeEventListener("resize", handleReposition);
      window.removeEventListener("scroll", handleReposition, true);
    };
  }, [isOpen, closeSearch, updatePanelPosition]);

  // Announce search result status without moving focus (WCAG 4.1.3)
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const trimmed = query.trim();

    if (announceTimerRef.current) {
      window.clearTimeout(announceTimerRef.current);
    }

    announceTimerRef.current = window.setTimeout(() => {
      let message = "";

      if (!trimmed) {
        message = `${suggestions.length} search suggestions available.`;
      } else if (results.total === 0) {
        message = `No matches for ${trimmed}.`;
      } else {
        message = `${results.total} result${results.total === 1 ? "" : "s"} for ${trimmed}.`;
      }

      setStatusText(message);
      announceStatus(message);
    }, 350);

    return () => {
      if (announceTimerRef.current) {
        window.clearTimeout(announceTimerRef.current);
      }
    };
  }, [isOpen, query, results.total, suggestions.length]);

  const handleSelect = useCallback(
    (item) => {
      if (!item) {
        return;
      }

      announceStatus(`Opening ${item.title}.`);

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
      announceStatus("Opening selected section.");

      if (typeof onNavigate === "function") {
        onNavigate();
      }

      navigate(path);
      closeSearch();
    },
    [closeSearch, navigate, onNavigate],
  );

  const handleKeyDown = (event) => {
    if (event.key === "Escape") {
      event.preventDefault();
      closeSearch();
      rootRef.current?.querySelector(".NavbarSearch__toggle")?.focus();
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      if (!flatItems.length) {
        return;
      }
      setActiveIndex((current) => (current + 1) % flatItems.length);
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      if (!flatItems.length) {
        return;
      }
      setActiveIndex((current) =>
        current <= 0 ? flatItems.length - 1 : current - 1,
      );
      return;
    }

    if (event.key === "Enter") {
      event.preventDefault();

      if (!flatItems.length) {
        const message = query.trim()
          ? `No matches for ${query.trim()}.`
          : "Enter a search term to find content.";
        setStatusText(message);
        announceStatus(message, { assertive: true });
        return;
      }

      const index = activeIndex >= 0 ? activeIndex : 0;
      handleSelect(flatItems[index]);
    }
  };

  const showPanel = isOpen;
  const hasQuery = Boolean(query.trim());
  const panelItems = hasQuery ? results.groups : null;

  const panel = showPanel
    ? createPortal(
        <div
          ref={panelRef}
          id="site-search-panel"
          className="NavbarSearch__panel"
          style={panelStyle}
          role="search"
          aria-label="Site search"
        >
          <div className="NavbarSearch__inputRow">
            <SearchOutlined className="NavbarSearch__inputIcon" aria-hidden="true" />
            <input
              ref={inputRef}
              id="site-search-input"
              type="search"
              className="NavbarSearch__input"
              value={query}
              onChange={(event) => {
                setQuery(event.target.value);
                setActiveIndex(-1);
              }}
              onKeyDown={handleKeyDown}
              placeholder="Search pages, services, forms..."
              title="Search"
              aria-label="Search"
              aria-controls="site-search-results"
              aria-describedby="site-search-status"
              aria-autocomplete="list"
              aria-expanded={isOpen}
              autoComplete="off"
              name="search"
            />
            {query ? (
              <button
                type="button"
                className="NavbarSearch__clear"
                onClick={() => {
                  setQuery("");
                  setActiveIndex(-1);
                  inputRef.current?.focus();
                  announceStatus("Search cleared.");
                }}
                aria-label="Clear search"
              >
                Clear
              </button>
            ) : null}
          </div>

          <div
            id="site-search-status"
            className="NavbarSearch__status"
            role="status"
            aria-live="polite"
            aria-atomic="true"
          >
            {statusText}
          </div>

          <div id="site-search-results" className="NavbarSearch__results">
            {!hasQuery ? (
              <>
                <p className="NavbarSearch__sectionLabel" id="search-suggestions-label">
                  Suggestions
                </p>
                <ul
                  className="NavbarSearch__list"
                  role="listbox"
                  aria-labelledby="search-suggestions-label"
                >
                  {suggestions.map((item, index) => (
                    <li key={item.id} role="presentation">
                      <button
                        type="button"
                        role="option"
                        aria-selected={activeIndex === index}
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
                  <button type="button" onClick={() => handleBrowseCategory("/sitemap")}>
                    Sitemap
                  </button>
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
                </div>
              </>
            ) : results.total === 0 ? (
              <div className="NavbarSearch__empty">
                <p>No matches for “{query.trim()}”.</p>
                <p>Try a page name, service, form, or policy title.</p>
                <button
                  type="button"
                  className="NavbarSearch__browse"
                  onClick={() => handleBrowseCategory("/sitemap")}
                >
                  Browse sitemap
                </button>
              </div>
            ) : (
              panelItems.map((group) => (
                <div key={group.id} className="NavbarSearch__group">
                  <div className="NavbarSearch__groupHead">
                    <p className="NavbarSearch__sectionLabel" id={`search-group-${group.id}`}>
                      {group.label}
                    </p>
                    <button
                      type="button"
                      className="NavbarSearch__browse"
                      onClick={() => handleBrowseCategory(group.browsePath)}
                    >
                      View all
                    </button>
                  </div>
                  <ul
                    className="NavbarSearch__list"
                    role="listbox"
                    aria-labelledby={`search-group-${group.id}`}
                  >
                    {group.items.map((item) => {
                      const flatIndex = flatItems.findIndex(
                        (entry) => entry.id === item.id,
                      );

                      return (
                        <li key={item.id} role="presentation">
                          <button
                            type="button"
                            role="option"
                            aria-selected={activeIndex === flatIndex}
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
        </div>,
        document.body,
      )
    : null;

  return (
    <div
      className={`NavbarSearch ${isOpen ? "is-open" : ""} ${isMobile ? "is-mobile" : "is-desktop"}`}
      ref={rootRef}
    >
      <button
        type="button"
        className="NavbarSearch__toggle"
        onClick={(event) => {
          event.stopPropagation();
          if (isOpen) {
            closeSearch();
            announceStatus("Search closed.");
          } else {
            openSearch();
          }
        }}
        aria-label={isOpen ? "Close Search" : "Search"}
        aria-expanded={isOpen}
        aria-controls={isOpen ? "site-search-panel" : undefined}
        title="Search"
      >
        {isOpen ? (
          <>
            <CloseOutlined aria-hidden="true" />
            <span className="NavbarSearch__toggleLabel">Close</span>
          </>
        ) : (
          <>
            <SearchOutlined aria-hidden="true" />
            <span className="NavbarSearch__toggleLabel">Search</span>
          </>
        )}
      </button>
      {panel}
    </div>
  );
};

export default NavbarSearch;

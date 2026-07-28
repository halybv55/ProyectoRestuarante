import { useCallback, useMemo, useState } from "react";

function normalizeSearchValue(value) {
  return String(value ?? "")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLocaleLowerCase("es");
}

function useClientTable({
  items,
  searchKeys = [],
  initialPageSize = 10,
  initialSortKey = "",
  initialSortDirection = "asc",
}) {
  const [query, setQueryState] = useState("");
  const [sortKey, setSortKey] = useState(initialSortKey);
  const [sortDirection, setSortDirection] = useState(initialSortDirection);
  const [pageState, setPageState] = useState(1);
  const [pageSize, setPageSizeState] = useState(initialPageSize);

  const sourceItems = useMemo(
    () => (Array.isArray(items) ? items : []),
    [items],
  );
  const collator = useMemo(
    () =>
      new Intl.Collator("es", {
        numeric: true,
        sensitivity: "base",
        usage: "sort",
      }),
    [],
  );

  const filteredItems = useMemo(() => {
    const normalizedQuery = normalizeSearchValue(query.trim());
    const filtered = normalizedQuery
      ? sourceItems.filter((item) =>
          searchKeys.some((key) =>
            normalizeSearchValue(item?.[key]).includes(normalizedQuery),
          ),
        )
      : sourceItems;

    if (!sortKey) {
      return [...filtered];
    }

    const direction = sortDirection === "desc" ? -1 : 1;

    return filtered
      .map((item, index) => ({ item, index }))
      .sort((left, right) => {
        const comparison = collator.compare(
          String(left.item?.[sortKey] ?? ""),
          String(right.item?.[sortKey] ?? ""),
        );

        return comparison === 0
          ? left.index - right.index
          : comparison * direction;
      })
      .map(({ item }) => item);
  }, [collator, query, searchKeys, sortDirection, sortKey, sourceItems]);

  const totalItems = sourceItems.length;
  const filteredTotal = filteredItems.length;
  const totalPages = Math.ceil(filteredTotal / pageSize);
  const page =
    totalPages === 0 ? 1 : Math.min(Math.max(pageState, 1), totalPages);
  const startIndex = filteredTotal === 0 ? 0 : (page - 1) * pageSize + 1;
  const endIndex =
    filteredTotal === 0 ? 0 : Math.min(page * pageSize, filteredTotal);
  const paginatedItems = filteredItems.slice(
    startIndex === 0 ? 0 : startIndex - 1,
    endIndex,
  );

  const setQuery = useCallback((nextQuery) => {
    setQueryState(nextQuery);
    setPageState(1);
  }, []);

  const setSort = useCallback((nextKey, nextDirection = "asc") => {
    setSortKey(nextKey);
    setSortDirection(nextDirection === "desc" ? "desc" : "asc");
    setPageState(1);
  }, []);

  const setPage = useCallback(
    (nextPage) => {
      const requestedPage =
        typeof nextPage === "function" ? nextPage(page) : nextPage;
      const upperLimit = Math.max(totalPages, 1);

      setPageState(
        Math.min(Math.max(Number(requestedPage) || 1, 1), upperLimit),
      );
    },
    [page, totalPages],
  );

  const setPageSize = useCallback((nextPageSize) => {
    const safePageSize = Math.max(Number(nextPageSize) || 1, 1);

    setPageSizeState(safePageSize);
    setPageState(1);
  }, []);

  return {
    query,
    setQuery,
    sortKey,
    sortDirection,
    setSort,
    page,
    setPage,
    pageSize,
    setPageSize,
    filteredItems,
    paginatedItems,
    totalItems,
    filteredTotal,
    totalPages,
    startIndex,
    endIndex,
  };
}

export default useClientTable;

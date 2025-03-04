import { Box, Button, Flex, HStack, Table, Text } from "@chakra-ui/react";
import { useMemo, useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./ui/pagination";
import PageSizeSelector from "./PageSizeSelector";
import {
  LuArrowDownNarrowWide,
  LuArrowUpNarrowWide,
  LuFilter,
} from "react-icons/lu";
import { FieldTypes } from "@/data/types";
import TableFilterDrawer, { TaskFilter } from "./TableFilterDrawer";
import { get } from "lodash";
import { Checkbox } from "./ui/checkbox";

export interface ColumnDef<T> {
  accessor?: string;
  title: string;
  render?: (item: T) => React.ReactNode;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
  filterType?: FieldTypes;
  filterOptions?: { label: string; value: string }[];
}

function paginate<T>(array: T[], pageNumber: number, pageSize: number): T[] {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
}

export default function DataTable<T>({
  items,
  columns,
  children,
  selection,
  setSelection,
}: {
  items: (T & { id?: number })[];
  columns: ColumnDef<T>[];
  children: React.ReactNode;
  selection: number[];
  setSelection: (data: number[]) => void;
}) {
  const [openFilter, setOpenFilter] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [filters, setFilters] = useState<TaskFilter>({});

  const hasSelection = selection.length > 0;
  const indeterminate = hasSelection && selection.length < items.length;

  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handle column sorting
  const handleSort = (column: string) => {
    if (sortColumn === column) {
      // Toggle sort direction if same column
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      // Set new sort column and default to ascending
      setSortColumn(column);
      setSortDirection("asc");
    }
  };

  // Memoized and processed data
  const processedData = useMemo(() => {
    let result = [...items];

    // TODO make filtering and soring agnostic to the type of data
    // Apply filters
    if (Object.keys(filters).length) {
      const { title, priority, status, customFields } = filters;

      if (title) {
        result = result.filter((item) =>
          String(item["title"]).toLowerCase().includes(title.toLowerCase())
        );
      }

      if (priority) {
        result = result.filter((item) => item["priority"] === priority);
      }

      if (status) {
        result = result.filter((item) => item["status"] === status);
      }

      // Apply custom field filters
      if (customFields) {
        Object.entries(customFields).forEach(([key, value]) => {
          if (value) {
            result = result.filter((item) => {
              const customFieldValue = item[key];
              return customFieldValue === value;
            });
          }
        });
      }
    }

    // Apply sorting
    if (sortColumn) {
      result.sort((a, b) => {
        const valueA = a[sortColumn as keyof T];
        const valueB = b[sortColumn as keyof T];

        if (valueA == null) return sortDirection === "asc" ? 1 : -1;
        if (valueB == null) return sortDirection === "asc" ? -1 : 1;

        if (typeof valueA === "string" && typeof valueB === "string") {
          return sortDirection === "asc"
            ? valueA.localeCompare(valueB)
            : valueB.localeCompare(valueA);
        }

        return sortDirection === "asc"
          ? Number(valueA) - Number(valueB)
          : Number(valueB) - Number(valueA);
      });
    }

    return result;
  }, [filters, items, sortColumn, sortDirection]);

  function changePageSize(val: number) {
    setPageSize(val);
    setCurrentPage(1);
  }

  return (
    <>
      <HStack justifyContent="flex-end" py="2">
        <Button
          onClick={() => {
            setOpenFilter(true);
          }}
          size="sm"
          variant="outline"
        >
          <LuFilter />
        </Button>
        {children}
      </HStack>

      <Box
        borderWidth="1px"
        borderColor="gray.200"
        rounded="md"
        style={{
          maxHeight: "calc(100% - 80px)",
          overflowY: "auto",
        }}
        w="100%"
      >
        <Table.Root size="md" variant="outline" overflow="scroll">
          <Table.ColumnGroup>
            <Table.Column htmlWidth="5%" />

            {columns.map((column) => (
              <Table.Column key={column.accessor} htmlWidth={column.width} />
            ))}
          </Table.ColumnGroup>
          <Table.Header
            style={{ top: "0", margin: "0", zIndex: "1", position: "sticky" }}
          >
            <Table.Row>
              <Table.ColumnHeader w="6">
                <Checkbox
                  top="1"
                  aria-label="Select all rows"
                  checked={
                    indeterminate ? "indeterminate" : selection.length > 0
                  }
                  onCheckedChange={(changes) => {
                    setSelection(
                      changes.checked
                        ? items
                            .map((item) => item.id)
                            .filter(
                              (id): id is number => id !== undefined
                            )
                        : []
                    );
                  }}
                />
              </Table.ColumnHeader>
              {columns.map((column) => {
                return (
                  <Table.ColumnHeader
                    key={column.accessor}
                    onClick={() => {
                      if (column.sortable && column.accessor)
                        handleSort(column.accessor);
                    }}
                    cursor={column.sortable ? "pointer" : "default"}
                  >
                    <HStack>
                      <Text>{column.title}</Text>
                      {column.sortable &&
                        sortColumn === column.accessor &&
                        (sortDirection === "asc" ? (
                          <LuArrowUpNarrowWide color="gray.500" />
                        ) : (
                          <LuArrowDownNarrowWide color="gray.500" />
                        ))}
                    </HStack>
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {paginate(processedData, currentPage, pageSize).map((item) => (
              <Table.Row
                key={item.id}
                data-selected={
                  item.id && selection.includes(item.id) ? "" : undefined
                }
              >
                <Table.Cell>
                  <Checkbox
                    top="1"
                    aria-label="Select row"
                    checked={!!(item.id && selection.includes(item.id))}
                    onCheckedChange={(changes) => {
                      setSelection(
                        changes.checked
                          ? [...selection, item.id].filter(
                              (id): id is number => id !== undefined
                            )
                          : selection.filter((id) => item.id && id !== item.id)
                      );
                    }}
                  />
                </Table.Cell>
                {columns.map((column) => {
                  return (
                    <Table.Cell
                      key={`${String(item.id)}-${column.accessor ?? ""}`}
                    >
                      {column.render
                        ? column.render(item)
                        : String(
                            column.accessor
                              ? get(item, column.accessor) ?? "(empty)"
                              : ""
                          )}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Flex mt="3" justifyContent="center">
        <PageSizeSelector value={pageSize} onChange={changePageSize} />
        <PaginationRoot
          page={currentPage}
          count={items.length}
          pageSize={pageSize}
          defaultPage={1}
          onPageChange={(details) => {
            setCurrentPage(details.page);
          }}
        >
          <HStack>
            <PaginationPrevTrigger />
            <Box hideBelow="md">
              <PaginationItems />
            </Box>
            <PaginationPageText hideFrom="md" />
            <PaginationNextTrigger />
          </HStack>
        </PaginationRoot>
      </Flex>

      <TableFilterDrawer
        openDrawer={openFilter}
        setOpenDrawer={setOpenFilter}
        onApplyFilters={setFilters}
      />
    </>
  );
}

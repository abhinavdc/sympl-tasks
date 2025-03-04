import { Box, Flex, HStack, Table, Text } from "@chakra-ui/react";
import { ReactNode, useMemo, useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./ui/pagination";
import PageSizeSelector from "./PageSizeSelector";
import { LuArrowDownNarrowWide, LuArrowUpNarrowWide } from "react-icons/lu";

type StringKeyOf<T> = Extract<keyof T, string>;

export interface ColumnDef<T> {
  accessor?: StringKeyOf<T>;
  title: string | ReactNode;
  render?: (item: T) => React.ReactNode;
  width?: string;
  sortable?: boolean;
  filterable?: boolean;
}

function paginate<T>(array: T[], pageNumber: number, pageSize: number): T[] {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
}

export default function DataTable<T>({
  items,
  columns,
}: {
  items: (T & { id?: string | number })[];
  columns: ColumnDef<T>[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  const [sortColumn, setSortColumn] = useState<StringKeyOf<T> | null>(null);
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  // Handle column sorting
  const handleSort = (column: StringKeyOf<T>) => {
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
    const result = [...items];

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
  }, [items, sortColumn, sortDirection]);

  function changePageSize(val: number) {
    setPageSize(val);
    setCurrentPage(1);
  }

  return (
    <>
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
            {columns.map((column) => (
              <Table.Column key={column.accessor} htmlWidth={column.width} />
            ))}
          </Table.ColumnGroup>
          <Table.Header
            style={{ top: "0", margin: "0", zIndex: "1", position: "sticky" }}
          >
            <Table.Row>
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
              <Table.Row key={item.id}>
                {columns.map((column) => {
                  return (
                    <Table.Cell
                      key={`${String(item.id)}-${column.accessor ?? ""}`}
                    >
                      {column.render
                        ? column.render(item)
                        : String(column.accessor ? item[column.accessor] : "")}
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
    </>
  );
}

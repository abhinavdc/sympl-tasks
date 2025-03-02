import { Box, Center, HStack, Table } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import {
  PaginationItems,
  PaginationNextTrigger,
  PaginationPageText,
  PaginationPrevTrigger,
  PaginationRoot,
} from "./ui/pagination";

type StringKeyOf<T> = Extract<keyof T, string>;

export interface ColumnDef<T> {
  accessor: StringKeyOf<T>;
  title: string | ReactNode;
  render?: (item: T) => React.ReactNode;
}

function paginate<T>(array: T[], pageNumber: number, pageSize: number): T[] {
  const startIndex = (pageNumber - 1) * pageSize;
  return array.slice(startIndex, startIndex + pageSize);
}

export default function DataTable<T>({
  items,
  columns,
}: {
  items: T[];
  columns: ColumnDef<T>[];
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);

  return (
    <>
      <Box
        borderWidth="1px"
        borderColor="gray.200"
        rounded="md"
        style={{
          maxHeight: "calc(100% - 60px)",
          overflowY: "auto",
        }}
        w="100%"
      >
        <Table.Root size="md" variant="outline" overflow="scroll">
          <Table.Header
            style={{ top: "0", margin: "0", zIndex: "1", position: "sticky" }}
          >
            <Table.Row>
              {columns.map((column, index) => {
                return (
                  <Table.ColumnHeader
                    key={`${column.accessor}-${String(index)}`}
                  >
                    {column.title}
                  </Table.ColumnHeader>
                );
              })}
            </Table.Row>
          </Table.Header>

          <Table.Body>
            {paginate(items, currentPage, pageSize).map((item, rowIndex) => (
              // eslint-disable-next-line react-x/no-array-index-key
              <Table.Row key={rowIndex}>
                {columns.map((column) => {
                  return (
                    <Table.Cell key={`${String(rowIndex)}-${column.accessor}`}>
                      {column.render
                        ? column.render(item)
                        : String(item[column.accessor] ?? "")}
                    </Table.Cell>
                  );
                })}
              </Table.Row>
            ))}
          </Table.Body>
        </Table.Root>
      </Box>

      <Center mt="3">
        <PaginationRoot
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
      </Center>
    </>
  );
}

import React, { useMemo } from "react";
import { useTable, useGlobalFilter, useFilters } from "react-table";

import { DefaultColumnFilter, GlobalFilter } from "./filters";

import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  TableCaption,
  Checkbox,
  Box,
  Input,
  Heading
} from "@chakra-ui/react";

const Taable = ({ columns, data }) => {
  const filterTypes = useMemo(
    () => ({
      //   // Add a new fuzzyTextFilterFn filter type.
      //   fuzzyText: fuzzyTextFilterFn,
      //   // Or, override the default text filter to use
      //   // "startWith"
      hasAny: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? filterValue.indexOf(rowValue) > -1
            : true;
        });
      },

      text: (rows, id, filterValue) => {
        return rows.filter(row => {
          const rowValue = row.values[id];
          return rowValue !== undefined
            ? String(rowValue)
                .toLowerCase()
                .startsWith(String(filterValue).toLowerCase())
            : true;
        });
      }
    }),
    []
  );
  const defaultColumn = useMemo(
    () => ({
      // Let's set up our default Filter UI
      Filter: DefaultColumnFilter
    }),
    []
  );

  const new_data = useMemo(() => data, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter,
    allColumns
  } = useTable(
    {
      columns,
      data: new_data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes,
      initialState: {
        hiddenColumns: columns.map(column => {
          if (column.show === false) return column.accessor || column.id;
        })
      }
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  return (
    <Box p={24}>
      <Heading size="md"> Columns</Heading>
      {allColumns.map(column =>
        <div key={column.id}>
          <label>
            <input type="checkbox" {...column.getToggleHiddenProps()} />{" "}
            {column.render("Header")}
          </label>
        </div>
      )}

      <Heading size="md">Filters</Heading>
        <Heading size="sm"> Global </Heading>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      {allColumns.map(column => {
        return (
          <div key={column.id}>
            {!column.disableFilters
              ? <div>
                  <Heading size="sm">
                    {column.render("Header")}
                  </Heading>
                  {column.render("Filter")}
                </div>
              : null}
          </div>
        );
      })}
      <Table className="" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, i) =>
            <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <Th key={i} {...column.getHeaderProps()}>
                  {column.render("Header")}
                </Th>
              )}
              <Th>View</Th>
            </Tr>
          )}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row);
            console.log(row);
            return (
              <Tr key={i} {...row.getRowProps()}>
                {row.cells.map(cell => {
                  return (
                    <Td key={i} {...cell.getCellProps()}>
                      {cell.render("Cell")}
                    </Td>
                  );
                })}
                <Td>Oi</Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Box>
  );
};

export default Taable;

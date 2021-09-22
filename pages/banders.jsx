import React, { useEffect, useMemo,useState } from "react";
import useSWR from "swr";
import {
  useTable,
  useGlobalFilter,
  useAsyncDebounce,
  useFilters
} from "react-table";

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
} from "@chakra-ui/react";

const fetcher = url => fetch(url).then(r => r.json());

function GlobalFilter({
  preGlobalFilteredRows,
  globalFilter,
  setGlobalFilter
}) {
  const count = preGlobalFilteredRows.length;
  const [value, setValue] = React.useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
    <span>
      Search:{" "}
      <input
        value={value || ""}
        onChange={e => {
          setValue(e.target.value);
          onChange(e.target.value);
        }}
        placeholder={`${count} records...`}
        style={{
          fontSize: "1.1rem",
          border: "0"
        }}
      />
    </span>
  );
}

function SelectColumnFilter({
  column: { filterValue, setFilter, preFilteredRows, id }
}) {

  const options = React.useMemo(
    () => {
      const options = new Set();
      preFilteredRows.forEach(row => {
        options.add(row.values[id]);
      });
      return [...options.values()];
    },
    [id, preFilteredRows]
  );

  const [selected, setSelected] = useState(options);

  const changeFunc = e => {
    e.target.value == "all"
      ? setSelected(undefined)
      : filterValue
        ? filterValue.indexOf(e.target.value) > -1
          ? setSelected(filterValue.filter(val => val !== e.target.value))
          : setSelected([...filterValue, e.target.value])
        : setSelected([e.target.value] || undefined);
  };

  useEffect(
    () => {
      selected.length?
      setFilter(selected):
      setSelected(options);
      ;
      
    },
    [selected]
  );

  // Calculate the options for filtering
  // using the preFilteredRows
  console.log(filterValue);
  // Render a multi-select box
  return (
    <div>
      {/* <option value="all">All</option> */}
      {options.map((option, i) =>
        <Checkbox size="sm" isChecked={selected.indexOf(option)>-1} onChange={(e)=>changeFunc(e)} key={i} value={option}>
          {option}
        </Checkbox>
      )}
      </div>
  );
}

function DefaultColumnFilter({
  column: { filterValue, preFilteredRows, setFilter }
}) {
  const count = preFilteredRows.length;

  return (
    <input
      value={filterValue || ""}
      onChange={e => {
        setFilter(e.target.value || undefined); // Set undefined to remove the filter entirely
      }}
      placeholder={`Search ${count} records...`}
    />
  );
}

const Taable = ({ data }) => {
  console.log(data);
  const columns = useMemo(
    () => [
      { Header: "First Name", accessor: "first_name", disableFilters: true },
      { Header: "Last Name", accessor: "last_name", disableFilters: true },
      {
        Header: "Nationality",
        accessor: "nationality",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      {
        Header: "Passerines",
        accessor: "max_passerine",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      {
        Header: "Raptors",
        accessor: "max_raptor",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      {
        Header: "Hummingbird",
        accessor: "max_hummingbird",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      {
        Header: "Waterfowl",
        accessor: "max_waterfowl",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      {
        Header: "Shorebird",
        accessor: "max_shorebird",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      {
        Header: "Race",
        accessor: "race",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      {
        Header: "Gender",
        accessor: "gender",
        filter: "hasAny",
        Filter: SelectColumnFilter
      },
      { Header: "Remarks", accessor: "remarks", disableFilters: true },
      { Header: "Email", accessor: "email", disableFilters: true },
      { Header: "Address", accessor: "address", disableFilters: true }
    ],
    []
  );
  const filterTypes = React.useMemo(
    () => ({
      //   // Add a new fuzzyTextFilterFn filter type.
      //   fuzzyText: fuzzyTextFilterFn,
      //   // Or, override the default text filter to use
      //   // "startWith"
      hasAny: (rows, id, filterValue) => {
        console.log(filterValue);
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
  const defaultColumn = React.useMemo(
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
    setGlobalFilter
  } = useTable(
    {
      columns,
      data: new_data,
      defaultColumn, // Be sure to pass the defaultColumn option
      filterTypes
    },
    useFilters, // useFilters!
    useGlobalFilter // useGlobalFilter!
  );

  return (
    <div>
      <GlobalFilter
        preGlobalFilteredRows={preGlobalFilteredRows}
        globalFilter={state.globalFilter}
        setGlobalFilter={setGlobalFilter}
      />
      <Table className="" {...getTableProps()}>
        <Thead>
          {headerGroups.map((headerGroup, i) =>
            <Tr key={i} {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column =>
                <Th key={i} {...column.getHeaderProps()}>
                  {column.render("Header")}
                  <div>
                    {column.canFilter ? column.render("Filter") : null}
                  </div>
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
    </div>
  );
};

export default function Banders(props) {
  const { error, data } = useSWR("/api/banders", fetcher);

  useEffect(
    () => {
      console.log(data);
      return () => {};
    },
    [data]
  );

  return (
    <div>
      {data ? <Taable data={data} /> : "loading"}
    </div>
  );
}

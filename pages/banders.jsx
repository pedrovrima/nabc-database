import React, { useEffect, useMemo,useState } from "react";
import useSWR from "swr";
import Taable from "../components/table"
import { SelectColumnFilter } from "../components/filters";
import { Container, Heading, Box } from "@chakra-ui/layout";
const fetcher = url => fetch(url).then(r => r.json());


const banderColumns =  [
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
      Filter: SelectColumnFilter,
      show:false
    },
    {
      Header: "Gender",
      accessor: "gender",
      filter: "hasAny",
      Filter: SelectColumnFilter, show:false
    },
    { Header: "Remarks", accessor: "remarks", disableFilters: true, show:false },
    { Header: "Email", accessor: "email", disableFilters: true, show:false },
    { Header: "Address", accessor: "address", disableFilters: true, show:false }
  ]



export default function Banders(props) {
  const { error, data } = useSWR("/api/banders", fetcher);

  const columns=useMemo(
    () =>banderColumns,[])

  useEffect(
    () => {
      console.log(data);
      return () => {};
    },
    [data]
  );

  return (
    <Box >
      <Heading>Banders</Heading>

      {data ? <Taable columns={columns} data={data} /> : "loading"}
    </Box>
  );
}

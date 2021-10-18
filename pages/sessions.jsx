import React, { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Taable from "../components/table";
import { SelectColumnFilter } from "../components/filters";
import { Container, Heading, Box, Flex, Text, Grid } from "@chakra-ui/layout";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Lorem,
  Button,
  Table,
  Tr,
  Td,
  useDisclosure
} from "@chakra-ui/react";
const fetcher = url => fetch(url).then(r => r.json());

const poster = async (url, param) => {
  console.log(param);
  const data = await fetch(url, {
    method: "post",
    body: JSON.stringify({ id: param })
  }).then(r => r.json());
  return data;
};

const createDate = pre_date => {
  const date = new Date(pre_date);
  console.log(date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getYear()}`;
};

const banderColumns = [
  { Header: "Id", accessor: "id", disableFilters: true, show: false },
  {
    Header: "Organization",
    accessor: "organization",
    disableFilters: true,
    show: true
  },

  { Header: "City", accessor: "city", disableFilters: true },
  { Header: "State", accessor: "state", disableFilters: true },
  {
    Header: "Country",
    accessor: "country",
    disableFilters: true
  },
  {
    Header: "Date",
    accessor: row => createDate(row.date),
    disableFilters: true
  },
  {
    Header: "Finalized",
    accessor: "finalized",
    disableFilters: true
  }
];

export default function Sessions(props) {
  const { mutate } = useSWRConfig();
  const { error, data } = useSWR("/api/sessions", fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState();
  const columns = useMemo(() => banderColumns, []);
  // const bander = useSWR(["/api/bander_id",id], poster);

  const openFun = id => {
    setId(id);
    onOpen();
  };

  return (
    <Box p="24" mt="8">
      <Heading>Sessions</Heading>
      {data
        ? <Taable columns={columns} data={data} clickFunction={openFun} />
        : "loading"}
      <BModal isOpen={isOpen} onClose={onClose} id={id} />
    </Box>
  );
}

function BModal({ isOpen, onClose, id }) {
  const idData = { id: id };
  const { error, data } = useSWR(["/api/session_id", id], poster);
  console.log(id);

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {data
          ? <div>
              <ModalHeader>
                {data.organization + " " + createDate(data.date)}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mb="2">
                  <Heading size="sm">Chair</Heading>
                  <p>
                    {data.chair.first_name + " " + data.chair.last_name}
                  </p>
                </Box>

                <Box mb="2">
                  <Heading size="sm">Results</Heading>

                  <Table>
                    {data.evaluations.map((evalu, i) =>
                      <Tr key={i}>
                        <Td >
                          {evalu.bander.first_name +
                            " " +
                            evalu.bander.last_name}
                        </Td>
                        <Td >
                          {evalu.level }
                        </Td>
                        <Td >
                          {evalu.final_result }
                        </Td>
                      </Tr>
                    )}
                  </Table>
                </Box>
              </ModalBody>
            </div>
          : "loading"}
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

+1 - 352 - 215 - 5935;

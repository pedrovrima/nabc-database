import React, { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Taable from "../components/table";
import { SelectColumnFilter } from "../components/filters";
import { Container, Heading, Box, Flex } from "@chakra-ui/layout";
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

const banderColumns = [
  { Header: "Id", accessor: "id", disableFilters: true, show: false },

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
    show: false
  },
  {
    Header: "Gender",
    accessor: "gender",
    filter: "hasAny",
    Filter: SelectColumnFilter,
    show: false
  },
  { Header: "Remarks", accessor: "remarks", disableFilters: true, show: false },
  { Header: "Email", accessor: "email", disableFilters: true, show: false },
  { Header: "Address", accessor: "address", disableFilters: true, show: false }
];

export default function Banders(props) {
  const { mutate } = useSWRConfig();
  const { error, data } = useSWR("/api/banders", fetcher);
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
      <Heading>Banders</Heading>
      {data
        ? <Taable columns={columns} data={data} clickFunction={openFun} />
        : "loading"}
      <BModal isOpen={isOpen} onClose={onClose} id={id} />
    </Box>
  );
}

function BModal({ isOpen, onClose, id }) {
  const idData = { id: id };
  const { error, data } = useSWR(["/api/bander_id", id], poster);
  console.log(id);
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {data
          ? <div>
              <ModalHeader>
                {data.first_name + " " + data.last_name}
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <p>
                  <strong>Email:</strong> {data.email}
                </p>
                <p>
                  <strong> Race:</strong> {data.race}
                </p>
                <p>
                  <strong> Gender:</strong> {data.gender}
                </p>

                <Box mt="8" mb="8">
                  <Heading size="md"> Maximum level </Heading>
                  <Flex wrap="wrap" align="start" >
                    <Box p="1">
                      {" "}<Heading size="xs">Passerine </Heading>{" "}
                      <p>{data.max_passerine || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}<Heading size="xs">Hummingbird </Heading>{" "}
                      <p>{data.max_humminbird || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}<Heading size="xs">Raptor</Heading>{" "}
                      <p> {data.max_raptor || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}<Heading size="xs">Waterfowl </Heading>{" "}
                      <p>{data.max_waterfowl || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}<Heading size="xs">Shorebird </Heading>{" "}
                      <p>{data.max_shorebird || "None"}</p>
                    </Box>
                  </Flex>
                </Box>

                <Heading size="sm">
                  Sessions being Evaluated:{" "}
                  {data.evaluations_participated.length}
                </Heading>

                <Heading size="sm">
                  Sessions Evaluated: {data.sessions_evaluated.length}
                </Heading>

                <Heading size="sm">
                  Sessions Chaired: {data.session_chaired.length}
                </Heading>

                {/* <Lorem count={2} /> */}
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

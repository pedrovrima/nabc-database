import React, { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Taable from "../components/table";
import { SelectColumnFilter } from "../components/filters";
import {
  Container,
  Heading,
  Box,
  Flex,
  List,
  ListItem,
} from "@chakra-ui/layout";
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
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Table,
  Tr,
  Td,
} from "@chakra-ui/react";
import CreateBander from "./new_bander";

const fetcher = (url) => fetch(url).then((r) => r.json());

const createDate = (pre_date) => {
  const date = new Date(pre_date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const poster = async (url, param) => {
  const data = await fetch(url, {
    method: "post",
    body: JSON.stringify({ id: param }),
  }).then((r) => r.json());
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
    Filter: SelectColumnFilter,
  },
  {
    Header: "Passerines",
    accessor: "max_passerines",
    filter: "hasAny",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Raptors",
    accessor: "max_raptor",
    filter: "hasAny",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Hummingbird",
    accessor: "max_hummingbirds",
    filter: "hasAny",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Waterfowl",
    accessor: "max_waterfowl",
    filter: "hasAny",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Shorebird",
    accessor: "max_shorebirds",
    filter: "hasAny",
    Filter: SelectColumnFilter,
  },
  {
    Header: "Race",
    accessor: "race",
    filter: "hasAny",
    Filter: SelectColumnFilter,
    show: false,
  },
  {
    Header: "Gender",
    accessor: "gender",
    filter: "hasAny",
    Filter: SelectColumnFilter,
    show: false,
  },
  { Header: "Remarks", accessor: "remarks", disableFilters: true, show: false },
  { Header: "Email", accessor: "email", disableFilters: true, show: false },
  { Header: "Address", accessor: "address", disableFilters: true, show: false },
];

export default function Banders(props) {
  const { error, data, mutate } = useSWR("/api/banders", fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState();
  const [tableData, setTableData] = useState();
  const columns = useMemo(() => banderColumns, []);
  // const bander = useSWR(["/api/bander_id",id], poster);

  const openFun = (id) => {
    setId(id);
    onOpen();
  };

  return (
    <Box p="24" mt="8">
      <Heading>Banders</Heading>
      {data ? (
        <Taable columns={columns} data={data} clickFunction={openFun} />
      ) : (
        "loading"
      )}
      <BModal
        setId={setId}
        mutate={mutate}
        isOpen={isOpen}
        onClose={onClose}
        id={id}
      />
      <Button onClick={() => mutate()}>Mutate</Button>
    </Box>
  );
}

function BModal({ mutate, setId, isOpen, onClose, id }) {
  const idData = { id: id };
  const [editMode, setEditMode] = useState(false);
  const { error, data } = useSWR(["/api/bander_id", id], poster);

  return (
    <Modal
      isOpen={isOpen}
      size="3xl"
      onClose={() => {
        onClose(), setEditMode(false), setId(null), mutate();
      }}
    >
      <ModalOverlay />
      <ModalContent>
        {data ? (
          !editMode ? (
            <div>
              <ModalHeader>
                <Flex justify="space-between" align="center">
                  {data.first_name + " " + data.last_name}{" "}
                  <Button onClick={() => setEditMode(true)}>Edit</Button>
                </Flex>
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

                <p>
                  <strong> Nationality:</strong> {data.nationality}
                </p>

                <Box mt="8" mb="8">
                  <Heading size="md"> Maximum level </Heading>
                  <Flex wrap="wrap" align="start">
                    <Box p="1">
                      {" "}
                      <Heading size="xs">Passerine </Heading>{" "}
                      <p>{data.max_passerines || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}
                      <Heading size="xs">Hummingbird </Heading>{" "}
                      <p>{data.max_humminbird || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}
                      <Heading size="xs">Raptor</Heading>{" "}
                      <p> {data.max_raptor || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}
                      <Heading size="xs">Waterfowl </Heading>{" "}
                      <p>{data.max_waterfowl || "None"}</p>
                    </Box>
                    <Box p="1">
                      {" "}
                      <Heading size="xs">Shorebird </Heading>{" "}
                      <p>{data.max_shorebirds || "None"}</p>
                    </Box>
                  </Flex>
                </Box>
                <Accordion allowMultiple allowToggle>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Heading size="sm">
                          Sessions being Evaluated:{" "}
                          {data.evaluations_participated.length}
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      {data.evaluations_participated.map((evaluation, i) => {
                        return (
                          <Box p="3" bg={i % 2 == 0 ? "lightgray" : ""} key={i}>
                            <List>
                              <ListItem>
                                <strong>Taxa:</strong> {evaluation.taxa}
                              </ListItem>
                              <ListItem>
                                <strong>Level:</strong> {evaluation.level}
                              </ListItem>
                              <ListItem>
                                <strong>Written Exam Score:</strong>{" "}
                                {evaluation.written_score}
                              </ListItem>

                              <ListItem>
                                <strong>Result:</strong>{" "}
                                {evaluation.final_result}
                              </ListItem>

                              <ListItem>
                                <strong>Notes:</strong>{" "}
                                {evaluation.comments || "None"}
                              </ListItem>
                            </List>
                          </Box>
                        );
                      })}
                    </AccordionPanel>
                  </AccordionItem>

                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Heading size="sm">
                          Sessions Evaluated: {data.sessions_evaluated.length}
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Table>
                        {data.sessions_evaluated.map((evalu, i) => (
                          <Tr mb="2" p="1" key={i}>
                            <Td p="1">
                              {evalu.evaluation.bander.first_name +
                                " " +
                                evalu.evaluation.bander.last_name}
                            </Td>
                            <Td p="1">{evalu.evaluation.taxa}</Td>

                            <Td p="1">{evalu.evaluation.level}</Td>
                            <Td p="1">{evalu.evaluation.final_result}</Td>
                          </Tr>
                        ))}
                      </Table>
                    </AccordionPanel>
                  </AccordionItem>
                  <AccordionItem>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <Heading size="sm">
                          Sessions Chaired: {data.session_chaired.length}
                        </Heading>
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                    <AccordionPanel>
                      <Table>
                        {data.session_chaired.map((sess, i) => (
                          <Tr mb="2" p="1" key={i}>
                            <Td p="1">{sess.organization}</Td>
                            <Td p="1">{createDate(sess.date)}</Td>
                          </Tr>
                        ))}
                      </Table>
                    </AccordionPanel>
                  </AccordionItem>
                </Accordion>
                {/* <Lorem count={2} /> */}
              </ModalBody>
            </div>
          ) : (
            <CreateBander modal pre_data={data}></CreateBander>
          )
        ) : (
          "loading"
        )}
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={() => {
              onClose(), setEditMode(false), setId(null), mutate();
            }}
          >
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

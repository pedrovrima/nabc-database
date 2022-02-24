import React, { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Taable from "../components/table";
import NewSession from "./new_session";
import { SelectColumnFilter } from "../components/filters";
import {
  Container,
  Heading,
  Box,
  Flex,
  Text,
  Grid,
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
  Table,
  Tr,
  Td,
  useDisclosure,
} from "@chakra-ui/react";
const fetcher = (url) => fetch(url).then((r) => r.json());

const poster = async (url, param) => {
  const data = await fetch(url, {
    method: "post",
    body: JSON.stringify({ id: param }),
  }).then((r) => r.json());
  return data;
};

const createDate = (pre_date) => {
  const date = new Date(pre_date);
  return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
};

const banderColumns = [
  { Header: "Id", accessor: "id", disableFilters: true, show: false },
  {
    Header: "Organization",
    accessor: "organization",
    disableFilters: true,
    show: true,
  },

  { Header: "City", accessor: "city", disableFilters: true },
  { Header: "State", accessor: "state", disableFilters: true },
  {
    Header: "Country",
    accessor: "country",
    disableFilters: true,
  },
  {
    Header: "Date",
    accessor: (row) => createDate(row.date),
    disableFilters: true,
  },
  {
    Header: "Finalized",
    accessor: (row) => (row.finalized ? "Yes" : "No"),
    disableFilters: true,
  },
];

export default function Sessions(props) {
  const { mutate } = useSWRConfig();
  const { error, data } = useSWR("/api/sessions", fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState();
  const columns = useMemo(() => banderColumns, []);
  // const bander = useSWR(["/api/bander_id",id], poster);

  const openFun = (id) => {
    setId(id);
    onOpen();
  };

  return (
    <Box p="24" mt="8">
      <Heading>Sessions</Heading>
      {data ? (
        <Taable columns={columns} data={data} clickFunction={openFun} />
      ) : (
        "loading"
      )}
      <BModal isOpen={isOpen} onClose={onClose} id={id} />
    </Box>
  );
}

function BModal({ isOpen, onClose, id }) {
  const [trainers, setTrainers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const idData = { id: id };
  const { error, data } = useSWR(["/api/session_id", id], poster);

  useEffect(() => {
    if (data) {
      const unique_trainers = data.evaluations.reduce((cont, evalu) => {
        const evaluators = evalu.evaluators.map(
          (evaluator) =>
            evaluator.bander.first_name + " " + evaluator.bander.last_name
        );

        return [...new Set([...cont, ...evaluators])];
      }, []);
      setTrainers(unique_trainers);
    }
  }, [data]);

  return (
    <Modal size={"lg"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {data ? (
          !editMode ? (
            <div>
              <ModalHeader>
                <Flex justify="space-between" align="center">
                  {data.organization + " " + createDate(data.date)}
                  <Button onClick={() => setEditMode(true)}>Edit</Button>
                </Flex>
              </ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Box mb="4">
                  <Heading size="sm">Chair</Heading>
                  <p>{data.chair.first_name + " " + data.chair.last_name}</p>
                </Box>

                <Box mb="4">
                  <Heading mb="1" size="sm">
                    Trainers
                  </Heading>
                  <List>
                    {trainers.map((trainer, i) => (
                      <ListItem key={i}>{trainer}</ListItem>
                    ))}
                  </List>
                </Box>

                <Box mb="2">
                  <Heading mb="1" size="sm">
                    Results
                  </Heading>

                  <Table>
                    {data.evaluations.map((evalu, i) => (
                      <Tr mb="2" p="1" key={i}>
                        <Td p="1">
                          {evalu.bander.first_name +
                            " " +
                            evalu.bander.last_name}
                        </Td>{" "}
                        <Td p="1">{evalu.taxa}</Td>
                        <Td p="1">{evalu.level}</Td>
                        <Td p="1">{evalu.final_result}</Td>
                      </Tr>
                    ))}
                  </Table>
                </Box>
              </ModalBody>
            </div>
          ) : (
            <>
              <NewSession
                pre_data={{
                  ...data,
                  date: createDefaultDate(data.date),
                  evaluations: { create: toArray(data.evaluations) },
                }}
                modal
              ></NewSession>
            </>
          )
        ) : (
          "loading"
        )}
        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

const toArray = (obj) => {
  console.log("here");
  console.log(Object.keys(obj).map((ob) => evaluationFixer(obj[ob])));
  return Object.keys(obj).map((ob) => evaluationFixer(obj[ob]));
};

const toRemove = ["evaluatorId", "banderId", "sessionId"];

const createDefaultDate = (date) => {
  const form_date = new Date(date);
  const dateString = (`${form_date.getFullYear()}-${(form_date.getMonth() + 1)>9?form_date.getMonth() + 1:`0${form_date.getMonth() + 1}`}-${
    form_date.getDate()
  }`)
  console.log(dateString);

  return dateString;
};

const evaluationFixer = (evalu) => {
  console.log(evalu);
  return Object.keys(evalu).reduce((ct, key) => {
    if (toRemove.includes(key)) {
      return ct;
    }
    if (key === "evaluators") {
      const ids = evalu.evaluators.map((evaluat) => {
        return { banderId: evaluat.banderId, id: evaluat.id };
      });
      return { ...ct, [key]: { create: ids } };
    }

    if (key === "evaluators") {
      const ids = evalu.evaluators.map((evaluat) => {
        return { banderId: evaluat.banderId, id: evaluat.id };
      });
      return { ...ct, [key]: { create: ids } };
    }

    if (key === "trapping_methods") {
      const traps = evalu.trapping_methods.map((evaluat) => {
        return { trap: evaluat.trap, id: evaluat.id };
      });
      return { ...ct, [key]: { create: traps } };
    }

    if (key === "id") {
      return { ...ct, old_id: evalu.id };
    }

    if (key === "bander") {
      return { ...ct, [key]: { connect: { id: evalu.bander.id } } };
    } else {
      return { ...ct, [key]: evalu[key] };
    }
  }, {});
};

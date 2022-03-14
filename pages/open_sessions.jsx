import React, { useEffect, useMemo, useState } from "react";
import useSWR, { useSWRConfig } from "swr";
import Taable from "../components/table";
import NewSession from "./new_session";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import Header from "../components/header";
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
  Spinner,
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
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Textarea,
  Select,
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
  const { error, data } = useSWR("/api/open_sessions", fetcher);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [id, setId] = useState();
  const columns = useMemo(() => banderColumns, []);
  // const bander = useSWR(["/api/bander_id",id], poster);

  const openFun = (id) => {
    setId(id);
    onOpen();
  };

  return (<>
  <Header></Header>
    <Box p="24" mt="8">
      <Heading>Sessions</Heading>
      {data ? (
        <Taable columns={columns} data={data} clickFunction={openFun} />
      ) : (
<Spinner
  thickness='4px'
  speed='0.65s'
  emptyColor='gray.200'
  color='blue.500'
  size='xl'
/>      )}
      <BModal isOpen={isOpen} onClose={onClose} id={id} />
    </Box>
    </>
  );
}

function BModal({ isOpen, onClose, id }) {
  const {
    control,
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({});

  const { fields, append, remove } = useFieldArray({
    control,
    name: "",
  });

  const [trainers, setTrainers] = useState([]);
  const [editMode, setEditMode] = useState(false);

  const idData = { id: id };
  const { error, data } = useSWR(["/api/session_id", id], poster);

  function onSubmit(values) {
    return new Promise(async (resolve) => {
      const finalData = data.evaluations.map((datum, i) => {
        return Object.keys(datum).reduce((ct, key) => {
          if (Object.keys(values["0"]).includes(key)) {
            console.log(values[i][key]);
            return { ...ct, [key]: values[i][key] };
          } else {
            return { ...ct, [key]: data.evaluations[i][key] };
          }
        }, {});
      });
      const status = await fetch("/api/finalize_session", {
        method: "post",
        body: JSON.stringify({ data: finalData, session_id: data.id }),
      });
      resolve();
    });
  }

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
    <Modal size={"6xl"} isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        {data ? (
          !editMode ? (
            <Box p={8}>
              <ModalHeader>
                <Flex justify="space-between" align="center">
                  <Heading size="xl">
                    {" "}
                    {data.organization + " " + createDate(data.date)}
                  </Heading>
                  <Button onClick={() => setEditMode(true)}>Edit</Button>
                </Flex>
              </ModalHeader>
              <ModalCloseButton />
              <form onSubmit={handleSubmit(onSubmit)}>
                <ModalBody>
                  <Box mb="8">
                    <Heading size="md">Chair</Heading>
                    <Text fontSize="lg">
                      {data.chair.first_name + " " + data.chair.last_name}
                    </Text>
                  </Box>

                  <Box mb="8">
                    <Heading mb="1" size="md">
                      Trainers
                    </Heading>
                    <List>
                      {trainers.map((trainer, i) => (
                        <ListItem fontSize="lg" key={i}>
                          {trainer}
                        </ListItem>
                      ))}
                    </List>
                  </Box>

                  <Box mb="8">
                    <Heading mb="1" size="lg">
                      Results
                    </Heading>
                    <Table>
                      {data.evaluations.map((evalu, index) => {
                        return (
                          <>
                            <Tr mb="2" p="1" key={index}>
                              <Td p="1">
                                <Text fontSize="lg">
                                  {evalu.bander.first_name +
                                    " " +
                                    evalu.bander.last_name}
                                </Text>
                              </Td>{" "}
                              <Td p="1">{evalu.taxa}</Td>
                              <Td p="1">{evalu.level}</Td>
                            </Tr>

                            <Flex>
                              <FormControl p={6}>
                                <FormLabel mb={0}>Written Exam Score</FormLabel>
                                <Input
                                  defaultValue={new Number(evalu.written_score)}
                                  placeholder="0-100"
                                  {...register(`${index}.written_score`, {
                                    valueAsNumber: true,
                                    max: 100,
                                    min: 0,
                                  })}
                                />

                                <FormErrorMessage></FormErrorMessage>
                              </FormControl>

                              <FormControl p={6}>
                                <FormLabel mb={0}>Notes</FormLabel>
                                <Textarea
                                  defaultValue={evalu.notes}
                                  {...register(`${index}.notes`, {})}
                                />
                                <FormErrorMessage></FormErrorMessage>
                              </FormControl>

                              <FormControl
                                isInvalid={errors[`${index}`]?.final_result}
                                p={6}
                              >
                                <FormLabel mb={0}>Result</FormLabel>
                                <Select
                                  defaultValue={evalu.final_result}
                                  placeholder={"Select one"}
                                  {...register(`${index}.final_result`, {
                                    validate: (value) => {
                                      console.log(errors);
                                      return value !== "TBD" || "Cannot be TBD";
                                    },
                                  })}
                                >
                                  {final_result.map((tx, i) => (
                                    <option key={i} value={tx}>
                                      {tx}
                                    </option>
                                  ))}
                                </Select>
                                <FormErrorMessage>
                                  {errors[`${index}`]?.final_result?.message}
                                </FormErrorMessage>
                              </FormControl>
                            </Flex>
                          </>
                        );
                      })}
                    </Table>
                  </Box>
                  <Flex align={"center"}>
                    <Button
                      w={"50%"}
                      colorScheme="teal"
                      loadingText="Sending"
                      isLoading={isSubmitting}
                      type="submit"
                    >
                      Submit
                    </Button>
                  </Flex>
                </ModalBody>
              </form>
            </Box>
          ) : (
            <>
              <NewSession
                pre_data={{
                  ...data,
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

const evaluationFixer = (evalu) => {
  return Object.keys(evalu).reduce((ct, key) => {
    console.log(ct);
    if (toRemove.includes(key)) {
      return ct;
    }
    if (key === "evaluators") {
      const ids = evalu.evaluators.map((evaluat) => {
        return { banderId: evaluat.banderId };
      });
      return { ...ct, [key]: { create: ids } };
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

const final_result = ["TBD", "Approved", "Rejected", "Assistant"];

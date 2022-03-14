import { Box, Container, Flex, Heading } from "@chakra-ui/layout";
import { useFieldArray } from "react-hook-form";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
  Checkbox,
  CheckboxGroup,
  Textarea
} from "@chakra-ui/react";

export default function EvaluationForm(props) {
  const { banders, trainers, register, control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "evaluations.create",
  });
  return (
    <Box border="0.5px solid #F7FAFC" p={2}>
      <Heading size="medium">Evaluations</Heading>

      {fields.map((field, index) => {
        return (
          <Box
            mb="8"
            p="4"
            key={field.id}
            borderTop={index > 0 ? "1px solid #CBD5E0" : ""}
          >
            <Flex justify="space-between" align="center">
              <Heading mb="4" size="md">
                Evaluation {index + 1}
              </Heading>
              <Button size="sm" colorScheme="red" onClick={() => remove(index)}>
                Delete
              </Button>
            </Flex>
            <FormControl mb={6} isRequired>
              <FormLabel mb={0}>Bander</FormLabel>
              <Select
                placeholder={"Select one"}
                {...register(`evaluations.create.${index}.bander.connect.id`, {
                  required: "Required",
                  valueAsNumber: true,
                })}
              >
                {banders.map((dt, i) => (
                  <option key={i} value={dt.id}>
                    {dt.first_name + " " + dt.last_name}
                  </option>
                ))}
              </Select>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={6} isRequired>
              <FormLabel mb={0}>Taxa</FormLabel>
              <Select
                placeholder={"Select one"}
                {...register(`evaluations.create.${index}.taxa`, {
                  required: "Required",
                })}
              >
                {taxa.map((tx, i) => (
                  <option key={i} value={tx}>
                    {tx}
                  </option>
                ))}
              </Select>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={6} isRequired>
              <FormLabel mb={0}>Level</FormLabel>
              <Select
                placeholder={"Select one"}
                {...register(`evaluations.create.${index}.level`, {
                  required: "Required",
                })}
              >
                {level.map((tx, i) => (
                  <option key={i} value={tx}>
                    {tx}
                  </option>
                ))}
              </Select>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            <FormControl mb={6}>
              <FormLabel mb={0}>Paid</FormLabel>
              <Checkbox {...register(`evaluations.create.${index}.paid`, {})} />

              <FormErrorMessage></FormErrorMessage>
            </FormControl>


            <FormLabel size="sm">Trapping Methods</FormLabel>
            <Traps
              control={control}
              evalIndex={index}
              register={register}
            ></Traps>

            <FormLabel size="sm">Evaluators</FormLabel>
            <Trainers
              control={control}
              trainers={trainers}
              evalIndex={index}
              register={register}
            ></Trainers>

            <FormControl mb={6}>
              <FormLabel mb={0}>Written Exam Sconre</FormLabel>
              <Input
                placeholder="0-100"
                {...register(`evaluations.create.${index}.written_score`, {
                  valueAsNumber: true,
                  max: 100,
                  min: 0,
                })}
              />

              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={0}>Notes</FormLabel>
              <Textarea
                {...register(`evaluations.create.${index}.notes`, {})}
              />
              <FormErrorMessage></FormErrorMessage>
            </FormControl>

            <FormControl mb={6}>
              <FormLabel mb={0}>Result</FormLabel>
              <Select
              defaultValue={"TBD"}
                placeholder={"Select one"}
                {...register(`evaluations.create.${index}.final_result`, {})}
              >
                {final_result.map((tx, i) => (
                  <option key={i} value={tx}>
                    {tx}
                  </option>
                ))}
              </Select>
              <FormErrorMessage></FormErrorMessage>
            </FormControl>
          </Box>
        );
      })}

      <Button colorScheme="green" onClick={() => append({})}>
        Add Evaluation
      </Button>
    </Box>
  );
}

const Trainers = (props) => {
  const { trainers, control, evalIndex, register } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `evaluations.create.${+evalIndex}.evaluators.create`,
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <>
            <Flex>
              <FormControl mb={6}>
                <Select
                                  placeholder={"Select one"}
                  {...register(
                    `evaluations.create.${+evalIndex}.evaluators.create.${index}.banderId`,
                    {
                      required: "Required",
                      valueAsNumber: true,
                    }
                  )}
                >
                  {trainers.map((dt, i) => (
                    <option key={i} value={dt.id}>
                      {dt.first_name + " " + dt.last_name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <Button colorScheme="red" ml="2" onClick={() => remove(index)}>
                Remove
              </Button>
            </Flex>
          </>
        );
      })}
      <Button colorScheme="green" onClick={() => append({ [`banderId`]: 1 })}>
        Add Evaluator
      </Button>
    </>
  );
};

const Traps = (props) => {

  const {  control, evalIndex, register } = props;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `evaluations.create.${+evalIndex}.trapping_methods.create`,
  });
const traps = ["Mistnet","Trap"]
  return (
    <>
      {fields.map((field, index) => {
        return (
          <>
            <Flex>
              <FormControl mb={6}>
                <Select
                  placeholder={"Select one"}
                  {...register(
                    `evaluations.create.${+evalIndex}.trapping_methods.create.${index}.trap`,
                    {
                      required: "Required",
                    }
                  )}
                >
                  {traps.map((dt, i) => (
                    <option key={i} value={dt}>
                      {dt}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage></FormErrorMessage>
              </FormControl>
              <Button colorScheme="red" ml="2" onClick={() => remove(index)}>
                Remove
              </Button>
            </Flex>
          </>
        );
      })}
      <Button colorScheme="green" onClick={() => append({ [`trap`]: "Mistnet" })}>
        Add Trapping Method
      </Button>
    </>
  );
};



const taxa = [
  "Passerines",
  "Shorebirds",
  "Waterfowl",
  "Hummingbirds",
  "Raptors",
];
const level = ["Assistant", "Bander", "Trainer"];

const final_result = ["TBD","Approved", "Rejected", "Assistant"];


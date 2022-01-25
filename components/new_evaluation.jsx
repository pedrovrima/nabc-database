import { Box, Container, Heading } from "@chakra-ui/layout";
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
} from "@chakra-ui/react";

export default function EvaluationForm(props) {
  const { banders, trainers, register, control } = props;

  const { fields, append, remove } = useFieldArray({
    control,
    name: "evaluations",
  });
  return (
    <>
      <Heading size="medium">Evaluations</Heading>
      {fields.map((field, index) => {
        return (
          <Box
            p="8"
            bg={index % 2 ? "lightgray" : "white"}
            border="1px solid gray"
            key={field.id}
          >
            <FormControl mb={6} isRequired>
              <FormLabel mb={0}>Bander</FormLabel>
              <Select
                placeholder={"Select one"}
                {...register(`evaluations.${index}.banderId`, {
                  required: "Required",
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
                {...register(`evaluations.${index}.taxa`, {
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
                {...register(`evaluations.${index}.level`, {
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
              <Checkbox {...register(`evaluations.${index}.paid`, {})} />

              <FormErrorMessage></FormErrorMessage>
            </FormControl>
            Trainer
            <Trainers
              control={control}
              trainers={trainers}
              evalIndex={index}
              register={register}
            ></Trainers>
          </Box>
        );
      })}
      <button onClick={() => append({ banderId: 1 })}>Add Session</button>
    </>
  );
}

const Trainers = (props) => {
  const { trainers, control, evalIndex, register } = props;

  const { fields, append, remove } = useFieldArray({
    control,
  });

  return (
    <>
      {fields.map((field, index) => {
        return (
          <>
            <FormControl mb={6} >
              <Select
                placeholder={"Select one"}
                {...register(
                  `evaluations.${evalIndex}.evaluators.${index}.trainerId`,
                  {
                    required: "Required",
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
          </>
        );
      })}
      <button onClick={() => append({[`evaluations.${evalIndex}.evaluators.${index}.trainerId`]:1})}>Trainer</button>
    </>
  );
};

const taxa = [
  "Passerine",
  "Shorebirds",
  "Waterfowl",
  "Hummingbirds",
  "Raptors",
];
const level = ["Assistant", "Bander", "Trainer"];

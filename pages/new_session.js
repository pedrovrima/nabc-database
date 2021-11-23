import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
  Container
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";
import useSWR from "swr";
const fetcher = (url) => fetch(url).then((r) => r.json());

export default function CreateSession(props) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting }
  } = useForm();

  const { data } = useSWR("/api/get_trainers", fetcher);
  function onSubmit(values) {
    console.log(values);
    return new Promise(async (resolve) => {
      await fetch("/api/create_bander", {
        method: "post",
        body: JSON.stringify({ data: values })
      });
      resolve();
    });
  }

  return (
    <>
      {data ? (
        <Box mx={64}>
          <Container>
            <Heading mb={16}>Add new bander</Heading>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Flex>
                <FormControl isRequired mb={6} mr={12} isInvalid={errors.city}>
                  <FormLabel mb={0}>City</FormLabel>
                  <Input
                    {...register("city", {
                      required: "Required"
                    })}
                    placeholder="Arcata"
                  ></Input>
                  <FormErrorMessage>
                    {errors.city && errors.city.message}
                  </FormErrorMessage>
                </FormControl>
                <FormControl isRequired mb={6} isInvalid={errors.state}>
                  <FormLabel mb={0}>State</FormLabel>
                  <Input
                    {...register("state", {
                      required: "Required"
                    })}
                    placeholder="California"
                  ></Input>
                  <FormErrorMessage>
                    {errors.state && errors.state.message}
                  </FormErrorMessage>
                </FormControl>
              </Flex>
              <FormControl mb={6} isRequired isInvalid={errors.country}>
                <FormLabel mb={0}>Country</FormLabel>
                <Select
                  placeholder={"Select one"}
                  {...register("country", { required: "Required" })}
                >
                  {countryList.map((cnt, i) => (
                    <option key={i} value={cnt}>
                      {cnt}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.country && errors.country.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl
                isRequired
                mb={6}
                mr={12}
                isInvalid={errors.organization}
              >
                <FormLabel mb={0}>Organization</FormLabel>
                <Input
                  {...register("organization", {
                    required: "Required"
                  })}
                  placeholder="HBBO"
                ></Input>
                <FormErrorMessage>
                  {errors.organization && errors.organization.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl isRequired mb={6} mr={12} isInvalid={errors.date}>
                <FormLabel mb={0}>Date</FormLabel>
                <Input
                  {...register("date", {
                    required: "Required"
                  })}
                  type="date"
                ></Input>
                <FormErrorMessage>
                  {errors.date && errors.date.message}
                </FormErrorMessage>
              </FormControl>
              <FormControl mb={6} isRequired isInvalid={errors.chairId}>
                <FormLabel mb={0}>Session Chair</FormLabel>
                <Select
                  placeholder={"Select one"}
                  {...register("chairId", { required: "Required" })}
                >
                  {data.map((dt, i) => (
                    <option key={i} value={dt.id}>
                      {dt.first_name + " " + dt.last_name}
                    </option>
                  ))}
                </Select>
                <FormErrorMessage>
                  {errors.chairId && errors.chairId.message}
                </FormErrorMessage>
              </FormControl>
              <Button
                mt={4}
                colorScheme="teal"
                loadingText="Sending"
                isLoading={isSubmitting}
                type="submit"
              >
                Submit
              </Button>{" "}
            </form>
          </Container>
        </Box>
      ) : (
        ""
      )}
    </>
  );
}

const countryList = [
  "Afghanistan",
  "Albania",
  "Algeria",
  "American Samoa",
  "Andorra",
  "Angola",
  "Anguilla",
  "Antarctica",
  "Antigua and Barbuda",
  "Argentina",
  "Armenia",
  "Aruba",
  "Australia",
  "Austria",
  "Azerbaijan",
  "Bahamas",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands",
  "Central African Republic",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos",
  "Colombia",
  "Comoros",
  "Congo",
  "Congo",
  "Cook Islands",
  "Costa Rica",
  "Croatia",
  "Cuba",
  "Curaçao",
  "Cyprus",
  "Czechia",
  "Côte d'Ivoire",
  "Denmark",
  "Djibouti",
  "Dominica",
  "Dominican Republic",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands",
  "Faroe Islands",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories",
  "Gabon",
  "Gambia",
  "Georgia",
  "Germany",
  "Ghana",
  "Gibraltar",
  "Greece",
  "Greenland",
  "Grenada",
  "Guadeloupe",
  "Guam",
  "Guatemala",
  "Guernsey",
  "Guinea",
  "Guinea-Bissau",
  "Guyana",
  "Haiti",
  "Heard Island and McDonald Islands",
  "Holy See",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran",
  "Iraq",
  "Ireland",
  "Isle of Man",
  "Israel",
  "Italy",
  "Jamaica",
  "Japan",
  "Jersey",
  "Jordan",
  "Kazakhstan",
  "Kenya",
  "Kiribati",
  "Korea",
  "Korea",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic",
  "Latvia",
  "Lebanon",
  "Lesotho",
  "Liberia",
  "Libya",
  "Liechtenstein",
  "Lithuania",
  "Luxembourg",
  "Macao",
  "Madagascar",
  "Malawi",
  "Malaysia",
  "Maldives",
  "Mali",
  "Malta",
  "Marshall Islands",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia",
  "Moldova",
  "Monaco",
  "Mongolia",
  "Montenegro",
  "Montserrat",
  "Morocco",
  "Mozambique",
  "Myanmar",
  "Namibia",
  "Nauru",
  "Nepal",
  "Netherlands",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin",
  "Saint Pierre and Miquelon",
  "Saint Vincent and the Grenadines",
  "Samoa",
  "San Marino",
  "Sao Tome and Principe",
  "Saudi Arabia",
  "Senegal",
  "Serbia",
  "Seychelles",
  "Sierra Leone",
  "Singapore",
  "Sint Maarten",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan",
  "Suriname",
  "Svalbard and Jan Mayen",
  "Sweden",
  "Switzerland",
  "Syrian Arab Republic",
  "Taiwan",
  "Tajikistan",
  "Tanzania, United Republic of",
  "Thailand",
  "Timor-Leste",
  "Togo",
  "Tokelau",
  "Tonga",
  "Trinidad and Tobago",
  "Tunisia",
  "Turkey",
  "Turkmenistan",
  "Turks and Caicos Islands",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates",
  "United Kingdom of Great Britain and Northern Ireland",
  "United States Minor Outlying Islands",
  "United States of America",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela",
  "Viet Nam",
  "Virgin Islands",
  "Virgin Islands",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands"
];

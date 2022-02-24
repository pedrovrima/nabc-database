import { Box, Flex, Heading } from "@chakra-ui/layout";
import {
  FormControl,
  FormLabel,
  FormErrorMessage,
  FormHelperText,
  Select,
  Input,
  Button,
  Container,
} from "@chakra-ui/react";
import { useForm, Controller } from "react-hook-form";

export default function CreateBander(props) {
  const { pre_data, modal } = props;
  const def_data = { ...pre_data };
  delete def_data.session_chaired;
  delete def_data.evaluations_participated;
  delete def_data.sessions_evaluated;

  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({ defaultValues: def_data });

  function onSubmit(values) {
    return new Promise(async (resolve) => {
      await fetch("/api/create_bander", {
        method: "post",
        body: JSON.stringify({ id: pre_data.id, data: values }),
      });
      resolve();
    });
  }

  return (
    <Box mx={modal ? 12 : 64}>
      <Container>
        <Heading size="lg" mt={16} mb={8}>
          Create New Bander
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Flex>
            <FormControl
              isRequired
              mb={6}
              mr={12}
              isInvalid={errors.first_name}
            >
              <FormLabel mb={0}>First Name</FormLabel>
              <Input
                {...register("first_name", {
                  required: "Required",
                })}
                placeholder="David"
              ></Input>
              <FormErrorMessage>
                {errors.first_name && errors.first_name.message}
              </FormErrorMessage>
            </FormControl>
            <FormControl isRequired mb={6} isInvalid={errors.last_name}>
              <FormLabel mb={0}>Last Name</FormLabel>
              <Input
                {...register("last_name", {
                  required: "Required",
                })}
                placeholder="Attenborough"
              ></Input>
              <FormErrorMessage>
                {errors.last_name && errors.last_name.message}
              </FormErrorMessage>
            </FormControl>
          </Flex>
          <FormControl isRequired mb={6} isInvalid={errors.email}>
            <FormLabel mb={0}>Email</FormLabel>
            <Input
              {...register("email", {
                required: "Required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Not a valid email",
                },
              })}
              placeholder="david@nabanding.org"
            ></Input>
            <FormErrorMessage>
              {errors.email && errors.email.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isRequired isInvalid={errors.nationality}>
            <FormLabel mb={0}>Nationality</FormLabel>
            <Select
              placeholder={"Select one"}
              {...register("nationality", { required: "Required" })}
            >
              {countryList.map((cnt, i) => (
                <option key={i} value={cnt}>
                  {cnt}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.nationality && errors.nationality.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={errors.address}>
            <FormLabel mb={0}>Address</FormLabel>
            <Input
              {...register("address", {})}
              placeholder="Bird's of the Paradise lane"
            ></Input>
            <FormErrorMessage>
              {errors.address && errors.address.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={errors.gender}>
            <FormLabel mb={0}>Gender</FormLabel>
            <Input {...register("gender", {})} placeholder=""></Input>
            <FormErrorMessage>
              {errors.gender && errors.gender.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={errors.race}>
            <FormLabel mb={0}>Race</FormLabel>
            <Input {...register("race", {})} placeholder=""></Input>
            <FormErrorMessage>
              {errors.race && errors.race.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={errors.max_passerines}>
            <FormLabel mb={0}>Maximum Passerines Level</FormLabel>
            <Select {...register("max_passerines", {})} placeholder="None">
              {level.map((tx, i) => (
                <option key={i} value={tx}>
                  {tx}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.max_passerines && errors.max_passerines.message}
            </FormErrorMessage>
          </FormControl>
          <FormControl mb={6} isInvalid={errors.max_hummingbirds}>
            <FormLabel mb={0}>Maximum Hummingbirds Level</FormLabel>
            <Select {...register("max_hummingbirds", {})} placeholder="None">
              {level.map((tx, i) => (
                <option key={i} value={tx}>
                  {tx}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.max_hummingbirds && errors.max_hummingbirds.message}
            </FormErrorMessage>
          </FormControl>


          <FormControl mb={6} isInvalid={errors.max_shorebirds}>
            <FormLabel mb={0}>Maximum Shorebirds Level</FormLabel>
            <Select {...register("max_shorebirds", {})} placeholder="None">
              {level.map((tx, i) => (
                <option key={i} value={tx}>
                  {tx}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.max_shorebirds && errors.max_shorebirds.message}
            </FormErrorMessage>
          </FormControl>


          <FormControl mb={6} isInvalid={errors.max_waterfowl}>
            <FormLabel mb={0}>Maximum Waterfowl Level</FormLabel>
            <Select {...register("max_waterfowl", {})} placeholder="None">
              {level.map((tx, i) => (
                <option key={i} value={tx}>
                  {tx}
                </option>
              ))}
            </Select>
            <FormErrorMessage>
              {errors.max_waterfowl && errors.max_waterfowl.message}
            </FormErrorMessage>
          </FormControl>
          <Button
            width="100%"
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
  "Bahamas (the)",
  "Bahrain",
  "Bangladesh",
  "Barbados",
  "Belarus",
  "Belgium",
  "Belize",
  "Benin",
  "Bermuda",
  "Bhutan",
  "Bolivia (Plurinational State of)",
  "Bonaire, Sint Eustatius and Saba",
  "Bosnia and Herzegovina",
  "Botswana",
  "Bouvet Island",
  "Brazil",
  "British Indian Ocean Territory (the)",
  "Brunei Darussalam",
  "Bulgaria",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cambodia",
  "Cameroon",
  "Canada",
  "Cayman Islands (the)",
  "Central African Republic (the)",
  "Chad",
  "Chile",
  "China",
  "Christmas Island",
  "Cocos (Keeling) Islands (the)",
  "Colombia",
  "Comoros (the)",
  "Congo (the Democratic Republic of the)",
  "Congo (the)",
  "Cook Islands (the)",
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
  "Dominican Republic (the)",
  "Ecuador",
  "Egypt",
  "El Salvador",
  "Equatorial Guinea",
  "Eritrea",
  "Estonia",
  "Eswatini",
  "Ethiopia",
  "Falkland Islands (the) [Malvinas]",
  "Faroe Islands (the)",
  "Fiji",
  "Finland",
  "France",
  "French Guiana",
  "French Polynesia",
  "French Southern Territories (the)",
  "Gabon",
  "Gambia (the)",
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
  "Holy See (the)",
  "Honduras",
  "Hong Kong",
  "Hungary",
  "Iceland",
  "India",
  "Indonesia",
  "Iran (Islamic Republic of)",
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
  "Korea (the Democratic People's Republic of)",
  "Korea (the Republic of)",
  "Kuwait",
  "Kyrgyzstan",
  "Lao People's Democratic Republic (the)",
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
  "Marshall Islands (the)",
  "Martinique",
  "Mauritania",
  "Mauritius",
  "Mayotte",
  "Mexico",
  "Micronesia (Federated States of)",
  "Moldova (the Republic of)",
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
  "Netherlands (the)",
  "New Caledonia",
  "New Zealand",
  "Nicaragua",
  "Niger (the)",
  "Nigeria",
  "Niue",
  "Norfolk Island",
  "Northern Mariana Islands (the)",
  "Norway",
  "Oman",
  "Pakistan",
  "Palau",
  "Palestine, State of",
  "Panama",
  "Papua New Guinea",
  "Paraguay",
  "Peru",
  "Philippines (the)",
  "Pitcairn",
  "Poland",
  "Portugal",
  "Puerto Rico",
  "Qatar",
  "Republic of North Macedonia",
  "Romania",
  "Russian Federation (the)",
  "Rwanda",
  "Réunion",
  "Saint Barthélemy",
  "Saint Helena, Ascension and Tristan da Cunha",
  "Saint Kitts and Nevis",
  "Saint Lucia",
  "Saint Martin (French part)",
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
  "Sint Maarten (Dutch part)",
  "Slovakia",
  "Slovenia",
  "Solomon Islands",
  "Somalia",
  "South Africa",
  "South Georgia and the South Sandwich Islands",
  "South Sudan",
  "Spain",
  "Sri Lanka",
  "Sudan (the)",
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
  "Turks and Caicos Islands (the)",
  "Tuvalu",
  "Uganda",
  "Ukraine",
  "United Arab Emirates (the)",
  "United Kingdom of Great Britain and Northern Ireland (the)",
  "United States Minor Outlying Islands (the)",
  "United States of America (the)",
  "Uruguay",
  "Uzbekistan",
  "Vanuatu",
  "Venezuela (Bolivarian Republic of)",
  "Viet Nam",
  "Virgin Islands (British)",
  "Virgin Islands (U.S.)",
  "Wallis and Futuna",
  "Western Sahara",
  "Yemen",
  "Zambia",
  "Zimbabwe",
  "Åland Islands",
];

const level = ["None","Assistant", "Bander", "Trainer"];

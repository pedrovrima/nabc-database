import { Button } from "@chakra-ui/button";
import { Flex, Box,Heading } from "@chakra-ui/layout";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import "tailwindcss/tailwind.css";
import styles from "../styles/Home.module.css";
// export async function getStaticProps(context) {
//   const banders = await getBanders()
//   return {
//     props: {banders}, // will be passed to the page component as props
//   }
// }

export default function Home(props) {
  return (
    <Flex align="center" justify="center" className={styles.container}>
      <Image src="/cropped-NABC_logo-removebg.png" width="240" height="223" />
      <Heading mt="8" mb="12" align="center" w={"100%"} size="2xl"> NABC Database </Heading>

    <Box width="25%">

      <Link passHref  href="/banders">
        <Button mb="2" colorScheme="blue" w={"100%"} >Banders</Button>
      </Link>
      <Link passHref href="/sessions">
        <Button colorScheme="blue" w={"100%"} mb="2"> Evaluations sessions</Button>
      </Link>
      <Link passHref href="/new_bander">
        <Button colorScheme="blue" w={"100%"} mb="2"> Add Bander</Button>
      </Link>
      <Link passHref href="/new_session">
        <Button colorScheme="blue" w={"100%"} mb="2"> Add Evaluation Sessions</Button>
      </Link>
      <Link passHref href="/open_sessions">
        <Button colorScheme="blue" w={"100%"} mb="2"> Finalize session</Button>
      </Link>
      </Box>

    </Flex>
  );
}

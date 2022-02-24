import { Button } from "@chakra-ui/button";
import { Box, Heading } from "@chakra-ui/layout";
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
    <Box className={styles.container}>
      <Heading mb="12" size="lg"> NABC Database </Heading>
      <Link passHref  href="/banders">
        <Button mb="4" >Banders</Button>
      </Link>
      <Link passHref href="/sessions">
        <Button mb="4"> Evaluation Sessions</Button>
      </Link>
      <Link passHref href="/new_bander">
        <Button mb="4"> Add Bander</Button>
      </Link>
      <Link passHref href="/new_session">
        <Button mb="4"> Add Evaluation Sessions</Button>
      </Link>
    </Box>
  );
}

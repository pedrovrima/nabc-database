import React from "react";
import {
  Box,
  Stack,
  Heading,
  Flex,
  Text,
  Button,
  useDisclosure,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import Link from "next/link";
import { Link as Linku } from "@chakra-ui/react";
// Note: This code could be better,
// so I'd recommend you to understand how I solved and you could write yours better :)
// Good luck! 🍀

// Update: Check these awesome headers from Choc UI 👇
// https://choc-ui.tech/docs/elements/headers
export default function Header(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const handleToggle = () => (isOpen ? onClose() : onOpen());

  return (
    <Flex
      as="nav"
      align="center"
      justify="space-between"
      wrap="wrap"
      padding={6}
      bg="blue.500"
      color="white"
      {...props}
    >
      <Flex align="center" mr={5}>
        <Link passHref href="/">
          <Heading cursor="pointer" as="h1" size="lg" letterSpacing={"tighter"}>
            NABC DB{" "}
          </Heading>
        </Link>
      </Flex>
      <Box>
        <Link passHref href="/banders">
          <Linku fontSize="lg" mr="4">Banders</Linku>
        </Link>
        <Link passHref href="/sessions">
          <Linku fontSize="lg" mr="4">Sessions</Linku>
        </Link>
        <Link passHref href="/new_bander">
          <Linku fontSize="lg" mr="4">Add bander</Linku>
        </Link>
        <Link passHref href="/new_session">
          <Linku fontSize="lg" mr="4">Add session</Linku>
        </Link>
        <Link passHref href="/open_sessions">
          <Linku fontSize="lg" mr="4">Open sessions</Linku>
        </Link>
      </Box>
    </Flex>
  );
}

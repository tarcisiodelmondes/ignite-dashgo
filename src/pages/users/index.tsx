import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table,
  Th,
  Thead,
  Tr,
  Td,
  Tbody,
  Checkbox,
  Text,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { SideBar } from "../../components/SideBar";

export default function UsersList() {
  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <SideBar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" align="center">
            <Heading fontSize="lg" fontWeight="normal">
              Usuários
            </Heading>

            <Button
              as="a"
              size="sm"
              fontSize="sm"
              colorScheme="pink"
              leftIcon={<Icon as={RiAddLine} fontSize="20" />}
              cursor="pointer"
            >
              Criar novo
            </Button>
          </Flex>

          <Table colorScheme="whiteAlpha">
            <Thead>
              <Tr px="6" color="gray.300" w="8">
                <Th>
                  <Checkbox colorScheme="pink" />
                </Th>
                <Th>Usuários</Th>
                <Th>Data de cadastro</Th>
                <Th w="8"></Th>
              </Tr>
            </Thead>

            <Tbody>
              <Tr>
                <Td>
                  <Checkbox colorScheme="pink" />
                </Td>
                <Td>
                  <Text>Tarcisio Delmondes</Text>
                  <Text>tarcisiodelmondes@gmail.com</Text>
                </Td>
                <Td>05 de agosto, 2021</Td>
                <Td>
                  <Button
                    as="a"
                    size="sm"
                    fontSize="sm"
                    colorScheme="teal"
                    leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                    cursor="pointer"
                  >
                    Editar
                  </Button>
                </Td>
              </Tr>
            </Tbody>
          </Table>

          <Pagination />
        </Box>
      </Flex>
    </Box>
  );
}

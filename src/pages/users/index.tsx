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
  useBreakpointValue,
  Spinner,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import Link from "next/link";
import { useQuery } from "react-query";
import { api } from "../../services/api";
import { useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";

export default function UsersList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isFetching } = useUsers(currentPage);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Box>
      <Header />

      <Flex w="100%" my="6" maxW={1480} mx="auto" px="6">
        <Sidebar />
        <Box flex="1" borderRadius={8} bg="gray.800" p="8">
          <Flex mb="8" justifyContent="space-between" align="center">
            <Heading fontSize="lg" fontWeight="normal">
              Usuários
              {!isLoading && isFetching && (
                <Spinner size="sm" color="gray.500" ml="4" />
              )}
            </Heading>

            <Link href="/users/create" passHref>
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
            </Link>
          </Flex>

          {isLoading ? (
            <Flex justify="center">
              <Spinner />
            </Flex>
          ) : error ? (
            <Flex justify="center">
              <Text>Falha ao obter os dados dos usuários.</Text>
            </Flex>
          ) : (
            <>
              <Table colorScheme="whiteAlpha">
                <Thead>
                  <Tr>
                    <Th px={["4", "4", "6"]} color="gray.300" w="8">
                      <Checkbox colorScheme="pink" />
                    </Th>
                    <Th>Usuários</Th>
                    {isWideVersion && <Th>Data de cadastro</Th>}
                    <Th w="8"></Th>
                  </Tr>
                </Thead>

                <Tbody>
                  {data.users.map((user) => (
                    <Tr key={user.id}>
                      <Td px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Td>
                      <Td>
                        <Text>{user.name}</Text>
                        <Text>{user.email}</Text>
                      </Td>
                      {isWideVersion && <Td>{user.createdAt}</Td>}
                      <Td>
                        {isWideVersion && (
                          <Button
                            as="a"
                            size="sm"
                            fontSize="sm"
                            colorScheme="teal"
                            leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            cursor="pointer"
                          >
                            {isWideVersion ? "Editar" : ""}
                          </Button>
                        )}
                      </Td>
                    </Tr>
                  ))}
                </Tbody>
              </Table>

              <Pagination
                onPageChange={setCurrentPage}
                totalCountOfRegisters={data.totalCount}
                currentPage={currentPage}
                registersPerPage={10}
              />
            </>
          )}
        </Box>
      </Flex>
    </Box>
  );
}

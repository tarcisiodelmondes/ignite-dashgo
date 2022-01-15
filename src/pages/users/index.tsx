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
  Link as ChakraLink,
} from "@chakra-ui/react";
import { RiAddLine, RiPencilLine } from "react-icons/ri";
import { Header } from "../../components/Header";
import { Pagination } from "../../components/Pagination";
import { Sidebar } from "../../components/Sidebar";
import Link from "next/link";
import { getUsers, useUsers } from "../../services/hooks/useUsers";
import { useState } from "react";
import { queryClient } from "../../services/queryClient";
import { api } from "../../services/api";
import { GetServerSideProps } from "next";

export default function UsersList(props) {
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, error, isFetching } = useUsers(currentPage, props);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(
      ["user", userId],
      async () => {
        const { data } = await api.get(`users/${userId}`);

        return data;
      },
      { staleTime: 1000 * 60 * 10 }
    );
  }

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
                        <Text>
                          <ChakraLink
                            onMouseEnter={() => handlePrefetchUser(user.id)}
                            color="pink.500"
                          >
                            {user.name}
                          </ChakraLink>
                        </Text>
                        <Text>{user.email}</Text>
                      </Td>
                      {isWideVersion && <Td>{user.created_at}</Td>}
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

export const getServerSide: GetServerSideProps = async () => {
  const users = await getUsers(1);

  return {
    props: { ...users },
  };
};

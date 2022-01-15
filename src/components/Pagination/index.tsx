import { Stack, Box, Text } from "@chakra-ui/react";
import { PaginationItems } from "./PaginationItems";

interface PaginationProps {
  totalCountOfRegisters: number;
  registersPerPage?: number;
  currentPage?: number;
  onPageChange: (number: number) => void;
}

const siblingsCount = 1;

function generatePagesArray(from: number, to: number) {
  return [...new Array(to - from)]
    .map((_, index) => from + index + 1)
    .filter((page) => page > 0);
}

export function Pagination({
  onPageChange,
  totalCountOfRegisters,
  currentPage = 1,
  registersPerPage = 10,
}: PaginationProps) {
  const lastPage = Math.ceil(totalCountOfRegisters / registersPerPage);

  const previousPage =
    currentPage > 1
      ? generatePagesArray(currentPage - 1 - siblingsCount, currentPage - 1)
      : [];

  const nextPages =
    currentPage < lastPage
      ? generatePagesArray(
          currentPage,
          Math.min(currentPage + siblingsCount, lastPage)
        )
      : [];
  return (
    <Stack
      direction={["column", "row"]}
      mt="8"
      justifyContent="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>{registersPerPage}</strong> de{" "}
        <strong>{totalCountOfRegisters}</strong>
      </Box>
      <Stack direction="row" spacing="2">
        {currentPage > 1 + siblingsCount && (
          <>
            <PaginationItems onPageChange={onPageChange} number={1} />
            {currentPage > 2 + siblingsCount && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
          </>
        )}

        {previousPage.length > 0 &&
          previousPage.map((page) => (
            <PaginationItems
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        <PaginationItems
          onPageChange={onPageChange}
          isCurrent
          number={currentPage}
        />

        {nextPages.length > 0 &&
          nextPages.map((page) => (
            <PaginationItems
              onPageChange={onPageChange}
              key={page}
              number={page}
            />
          ))}

        {currentPage + siblingsCount < lastPage && (
          <>
            {currentPage + 1 + siblingsCount < lastPage && (
              <Text color="gray.300" w="8" textAlign="center">
                ...
              </Text>
            )}
            <PaginationItems onPageChange={onPageChange} number={lastPage} />
          </>
        )}
      </Stack>
    </Stack>
  );
}

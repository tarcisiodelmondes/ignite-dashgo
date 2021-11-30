import { Stack, Box } from "@chakra-ui/react";
import { PaginationItems } from "./PaginationItems";

export function Pagination() {
  return (
    <Stack
      direction="row"
      mt="8"
      justifyContent="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong> - <strong>10</strong> de <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <PaginationItems isCurrent number={1} />
        <PaginationItems number={2} />
        <PaginationItems number={3} />
        <PaginationItems number={4} />
      </Stack>
    </Stack>
  );
}

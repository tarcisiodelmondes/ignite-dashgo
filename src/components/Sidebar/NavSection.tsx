import { Box, Text, Stack } from "@chakra-ui/react";
import { FunctionComponent, ReactNode } from "react";
import { IconType } from "react-icons";
import { NavLink } from "./NavLink";

interface NavSectionProps {
  title: string;
  children: ReactNode;
}

export function NavSection({ title, children }: NavSectionProps) {
  return (
    <Box>
      <Text fontWeight="bold" color="gray.400" fontSize="small">
        {title}
      </Text>

      <Stack spacing="4" mt="8" align="stretch">
        {children}
      </Stack>
    </Box>
  );
}

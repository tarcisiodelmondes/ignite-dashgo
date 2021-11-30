import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

export function Profile() {
  return (
    <Flex align="center">
      <Box mr="4" textAlign="right">
        <Text>Tarcisio Delmondes</Text>

        <Text color="gray.300" fontSize="small">
          tarcisiodelmondes@gmail.com
        </Text>
      </Box>

      <Avatar
        name="Tarcisio Delmondes"
        src="https://github.com/tarcisiodelmondes.png"
        size="md"
      />
    </Flex>
  );
}

import { Box, Flex, Text, Avatar } from "@chakra-ui/react";

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData ? (
        <Box mr="4" textAlign="right">
          <Text>Tarcisio Delmondes</Text>

          <Text color="gray.300" fontSize="small">
            tarcisiodelmondes@gmail.com
          </Text>
        </Box>
      ) : null}

      <Avatar
        name="Tarcisio Delmondes"
        src="https://github.com/tarcisiodelmondes.png"
        size="md"
      />
    </Flex>
  );
}

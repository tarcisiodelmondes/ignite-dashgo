import { Flex, useBreakpointValue, Icon, IconButton } from "@chakra-ui/react";
import { Logo } from "./Logo";
import { Notification } from "./Notification";
import { Profile } from "./Profile";
import { SearchBox } from "./SearchBox";
import { useSidebarDrawer } from "../../context/SidebarDrawerContext";
import { RiMenuLine } from "react-icons/ri";

export function Header() {
  const { disclosure } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true,
  });

  return (
    <Flex
      as="header"
      w="100%"
      maxW={1480}
      h="20"
      mx="auto"
      mt="4"
      align="center"
      px="6"
    >
      {!isWideVersion ? (
        <IconButton
          aria-label="Open navigation"
          mr="2"
          variant="unstyled"
          display="flex"
          alignItems="center"
          justifyContent="center"
          fontSize="24"
          icon={<Icon as={RiMenuLine} />}
          onClick={disclosure.onOpen}
        />
      ) : null}

      <Logo />

      {isWideVersion ? <SearchBox /> : null}

      <Flex align="center" ml="auto">
        <Notification />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}

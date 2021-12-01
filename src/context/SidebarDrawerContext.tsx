import { useDisclosure, UseDisclosureReturn } from "@chakra-ui/hooks";
import { useRouter } from "next/dist/client/router";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";

interface SidebarDrawerContextProps {
  disclosure: UseDisclosureReturn;
}

interface SidebarDrawerContextProviderProps {
  children: ReactNode;
}

const SidebarDrawerContext = createContext({} as SidebarDrawerContextProps);

function SidebarDrawerContextProvider({
  children,
}: SidebarDrawerContextProviderProps) {
  const disclosure = useDisclosure();
  const router = useRouter();

  useEffect(() => {
    disclosure.onClose();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath]);

  return (
    <SidebarDrawerContext.Provider value={{ disclosure }}>
      {children}
    </SidebarDrawerContext.Provider>
  );
}

const useSidebarDrawer = () => useContext(SidebarDrawerContext);

export { SidebarDrawerContextProvider, useSidebarDrawer };

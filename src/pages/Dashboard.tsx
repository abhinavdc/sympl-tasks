import HeroImage from "@/components/HeroImage";
import TaskTable from "@/components/TaskTable";
import { useColorModeValue } from "@/components/ui/color-mode";
import { Container, Flex } from "@chakra-ui/react";

export default function Dashboard() {
  const bg = useColorModeValue("gray.50", "blackAlpha.50");

  return (
    <Flex w="100vw" h="100vh" flexDir="column" bg={bg}>
      <HeroImage />
      <Container maxHeight="calc(100vh - 160px)" maxW="4xl" p="30px" boxSizing="border-box">
        <TaskTable />
      </Container>
    </Flex>
  );
}

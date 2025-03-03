import { Box, Center, Heading } from "@chakra-ui/react";
import { ColorModeButton, useColorModeValue } from "./ui/color-mode";

export default function HeroImage() {
    const gradientFrom = useColorModeValue("red.200", "red.700");
const gradientTo = useColorModeValue("blue.200", "blue.700");
  return (
    <Box
      position="relative"
      h="160px"
      bgGradient="to-r"
      gradientFrom={gradientFrom}
      gradientTo={gradientTo}

    >
      <Center h="100%">
        <Heading as="h1" fontSize={{ md: "6xl", sm: "4xl", base: "3xl" }}>
          Sympl Tasks
        </Heading>
      </Center>
      <ColorModeButton position="absolute" bottom="10px" right="10px" />
    </Box>
  );
}

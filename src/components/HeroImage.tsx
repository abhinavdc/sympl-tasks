import { Box, Center, Heading } from "@chakra-ui/react";
import { ColorModeButton } from "./ui/color-mode";

export default function HeroImage() {
  return (
    <Box
      position="relative"
      h="160px"
      bgGradient="to-r"
      gradientFrom="red.200"
      gradientTo="blue.200"
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

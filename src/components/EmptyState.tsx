import { VStack, EmptyState, Image } from "@chakra-ui/react";

export default function EmptyStateCta({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <EmptyState.Root size="lg">
        <EmptyState.Content>
          <Image src="https://cdn-icons-png.flaticon.com/512/1466/1466784.png" alt="Empty Sad Folder" height="200px"/>
          <VStack textAlign="center">
            <EmptyState.Title>Your todo list is empty</EmptyState.Title>
            <EmptyState.Description>
                {children}
            </EmptyState.Description>
          </VStack>
        </EmptyState.Content>
      </EmptyState.Root>
    </>
  );
}

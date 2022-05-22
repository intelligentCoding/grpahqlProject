import { Box } from "@chakra-ui/core";
interface PageWrapperProps {}
export const PageWrapper: React.FC<PageWrapperProps> = ({ children }) => {
  return (
    <Box maxW="600px" w="100%" mt={15} mx="auto">
      {children}
    </Box>
  );
}
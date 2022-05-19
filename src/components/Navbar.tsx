import { Box, Flex, Link } from "@chakra-ui/core"
import NextLink from "next/link";
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    return (
        <Flex p={4} bg="#652B19">
            <Box ml={"auto"}>
                <NextLink href="/login">
                    <Link color='#FEEBC8' mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color='#FEEBC8' mr={2}>Register</Link>
                </NextLink>
            </Box>
        </Flex>

)
}
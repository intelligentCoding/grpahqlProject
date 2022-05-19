import { Box, Flex, Link } from "@chakra-ui/core"
import NextLink from "next/link";
import { useFindUserQuery } from '../generated/graphql';
interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [{data, fetching}] = useFindUserQuery();
    let navBody = null;

    if(fetching) {
    } else if(!data?.findUser){
        navBody = (
            <>
                <NextLink href="/login">
                    <Link color='#FEEBC8' mr={2}>Login</Link>
                </NextLink>
                <NextLink href="/register">
                    <Link color='#FEEBC8' mr={2}>Register</Link>
                </NextLink>
            </>
        )
    } else {
        navBody = <Box color="#FEEBC8">Welcome to Donations.ca {data.findUser.username}</Box>
    }

    return (
        <Flex p={4} bg="#652B19">
            <Box ml={"auto"}>
                {navBody}
            </Box>
        </Flex>

)
}
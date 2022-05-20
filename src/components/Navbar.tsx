import { Box, Button, Flex, Link } from "@chakra-ui/core"
import NextLink from "next/link";
import { useUserQuery, useLogoutMutation } from '../generated/graphql';
import router, { useRouter } from 'next/router'

interface NavBarProps {

}

export const NavBar: React.FC<NavBarProps> = ({}) => {
    const [ {fetching: logoutFetching}, logout] = useLogoutMutation();
    const [{data, fetching}] = useUserQuery();
    let navBody = null;

    if(fetching) {
    } else if(!data?.user){
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
        navBody = (
            <Flex>
                <Box color="#FEEBC8">Welcome to Donations.ca {data.user.username}</Box>
                <Box w='70px' />
                <Button 
                    isLoading={logoutFetching} 
                    onClick={() => {
                    logout();
                    router.push('/login');
                    }} 
                    variant="link"
                    color='#FEEBC8'
                >logout</Button>
            </Flex>
        )
    }

    return (
        <Flex p={4} bg="#652B19">
            <Box ml={"auto"}>
                {navBody}
            </Box>
        </Flex>

)
}
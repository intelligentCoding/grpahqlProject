import { NavBar } from "../components/Navbar"
import { useDeleteDonationMutation, useDonationsQuery, useUserQuery } from "../generated/graphql";
import NextLink from "next/link";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box, Flex, Spinner, Link, Heading, IconButton
} from "@chakra-ui/core";
import router from "next/router";
// import DonationRow from "../components/DonationRow";
const Index = () => {
  const [{data, fetching}] = useDonationsQuery();
  const [{fetching: logoutFetching}, deleteDonation] = useDeleteDonationMutation();
  const [{data: userData, fetching: userFetching}] = useUserQuery();

  const getColor = (donatorId: number) => {
      if(donatorId === userData?.user?.id){
        return "blue";
      } else {
        return "orange"
      }
  }
  return (
  <>
    <NavBar/>
    {!data && fetching ? (
      <Spinner />
    ) : (
      data!.donations.map((d, index) => (
      <>
     <Box bg={userData?.user?.id == d.donatorId ? "#A569BD" : "#3362FF"} alignItems="center" m={2} w="100%" p={4} color="white">
      <StatGroup>
      <Stat>
        <StatLabel>Donated Amount</StatLabel>
        <StatNumber>{d.donation}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Donated Tip</StatLabel>
        <StatNumber>{d.tip}</StatNumber>
      </Stat>

      <Stat>
        <StatLabel>Donation Date</StatLabel>
        <StatNumber>{new Date(Number(d.createdAt)).toISOString().split('T')[0]}</StatNumber>
      </Stat>
      <Stat>
        <StatLabel>Donated By</StatLabel>
        <StatNumber>{d.donatorId}</StatNumber>
      </Stat>
      <Box flex={1}>
        <NextLink href="/donations/[id]" as={`/donations/${d.id}`}>
          <Link>
            <Heading fontSize="xl">Details</Heading>
          </Link>
        </NextLink>
      </Box>
      <Box flex={1}>
        {userData?.user?.id == d.donatorId && (
          <>
          <IconButton
            variantColor="orange"
            icon="edit"
            aria-label="Delete Donation"
            onClick={ () => {
              router.push(`/donations/edit/${d.id}`);
            }}
          />
          <IconButton
            variantColor="red"
            icon="delete"
            aria-label="Delete Donation"
            onClick={ async () => {
              await deleteDonation({
                id: d.id
              });
              router.push("/");
            }}
          />
          </>
        )}
      </Box>
      </StatGroup>
    </Box>
      </>
    ))
    )} 
  </>
  )
}

export default Index

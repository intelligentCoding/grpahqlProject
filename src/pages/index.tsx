import { NavBar } from "../components/Navbar"
import { useDonationsQuery } from "../generated/graphql";
import NextLink from "next/link";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box, Flex, Spinner, Link, Heading
} from "@chakra-ui/core";
// import DonationRow from "../components/DonationRow";
const Index = () => {
  const [{data, fetching}] = useDonationsQuery();

  return (
  <>
    <NavBar/>
    {!data && fetching ? (
      <Spinner />
    ) : (
      data!.donations.map((d, index) => (
      <>
     <Box bg="tomato" alignItems="center" m={2} w="100%" p={4} color="white">
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
      </StatGroup>
    </Box>
      </>
    ))
    )} 
  </>
  )
}

export default Index

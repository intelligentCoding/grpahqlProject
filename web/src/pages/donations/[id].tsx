import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDonationByIdQuery, useUserQuery } from "../../generated/graphql";
import {
  Stat,
  StatLabel,
  StatNumber,
  StatGroup,
  Box,
  Flex,
  Spinner,
} from "@chakra-ui/core";
import { NavBar } from "../../components/Navbar";
const convertDate = (timestamp: number) => {
  var d = new Date(timestamp), // Convert the passed timestamp to milliseconds
    yyyy = d.getFullYear(),
    mm = ("0" + (d.getMonth() + 1)).slice(-2), // Months are zero based. Add leading 0.
    dd = ("0" + d.getDate()).slice(-2), // Add leading 0.
    hh = d.getHours(),
    h = hh,
    min = ("0" + d.getMinutes()).slice(-2), // Add leading 0.
    ampm = "AM",
    time;

  if (hh > 12) {
    h = hh - 12;
    ampm = "PM";
  } else if (hh === 12) {
    h = 12;
    ampm = "PM";
  } else if (hh == 0) {
    h = 12;
  }

  // ie: 2014-03-24, 3:00 PM
  time = yyyy + "-" + mm + "-" + dd + ", " + h + ":" + min + " " + ampm;
  return time;
};
const Donation = ({}) => {
  const router = useRouter();
  const [{ data: userData, fetching: userFetching }] = useUserQuery();
  useEffect(() => {
    if (userData?.user === null) {
      router.push("/login");
    }
  }, [userFetching, userData, router]);
  const intId =
    typeof router.query.id === "string" ? parseInt(router.query.id) : -1;
  const [{ data, fetching }] = useDonationByIdQuery({
    pause: intId === -1, //pass the query if id is -1
    variables: {
      id: intId,
    },
  });
  return (
    <>
      <NavBar />
      {!data && fetching ? (
        <Spinner />
      ) : (
        <>
          <Box
            bg="tomato"
            alignItems="center"
            m={2}
            w="100%"
            p={4}
            color="white"
          >
            <StatGroup>
              <Stat>
                <StatLabel>Donated Amount</StatLabel>
                <StatNumber>{data?.donationById!.donation}</StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Donated Tip</StatLabel>
                <StatNumber>{data?.donationById!.tip}</StatNumber>
              </Stat>

              <Stat>
                <StatLabel>Donation Date</StatLabel>
                <StatNumber>
                  {convertDate(Number(data?.donationById!.createdAt))}
                </StatNumber>
              </Stat>
              <Stat>
                <StatLabel>Donated By</StatLabel>
                <StatNumber>{data?.donationById!.donator.username}</StatNumber>
              </Stat>
            </StatGroup>
          </Box>
        </>
      )}
    </>
  );
};

export default Donation;


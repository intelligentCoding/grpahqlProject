import { Box, Button, Spinner } from "@chakra-ui/core";
import { Form, Formik } from "formik";
import { useRouter } from "next/router";
import React from "react";
import { CustomInput } from "../../../components/Input";
import { PageWrapper } from "../../../components/PageWrapper";

import {useDonationByIdQuery,  useUpdateDonationMutation} from "../../../generated/graphql";


const EditDonation = ({}) => {
  const router = useRouter();
//   const intId = useGetIntId();
  const intId = typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;
  const [{data, fetching}] = useDonationByIdQuery({
      pause: intId === - 1, //pass the query if id is -1
      variables: {
          id: intId
      }
  })
  const [{fetching: updateFetching}, updateDonation] = useUpdateDonationMutation();
  if (fetching) {
    return (
        <Spinner />
    );
  }

  if (!data?.donationById) {
    return (
        <Box>Unable to fetch donation</Box>
    );
  }

  return (
    <PageWrapper>
      <Formik
        initialValues={{tip: Number(data.donationById.tip), donation: Number(data.donationById.donation) }}
        onSubmit={async (values) => {
            console.log(values)
          await updateDonation({ id: intId, ...values});
          router.back();
        }}
      >
        {({ isSubmitting }) => (
          <Form>
            <CustomInput type="number" name="tip" placeholder="tip" label="tip" />
            <CustomInput type="number" name="donation" placeholder="donation" label="donation" />

            <Button
              mt={4}
              type="submit"
              isLoading={isSubmitting}
              variantColor="teal"
            >
              Update Donation
            </Button>
          </Form>
        )}
      </Formik>
    </PageWrapper>
  );
};

export default EditDonation;
import React, { useState } from 'react';
import { Formik, Form } from "formik";
import { Alert, AlertDescription, AlertIcon, AlertTitle, Box, Button, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/core';
import { PageWrapper } from "../components/PageWrapper"
import { CustomInput } from '../components/Input';
import { useMutation } from 'urql';
import { useCreateDonationMutation, useRegisterMutation } from '../generated/graphql';
import { errorMap } from '../utils';
import {useRouter} from 'next/router';
import { NavBar } from '../components/Navbar';
interface createDonationProps {
}

const CreateDonation: React.FC<createDonationProps> = ({}) => {
    const [donationError, setDonationError]= useState("");
    const router = useRouter();
    const [, createDonation] = useCreateDonationMutation()
    return (
        <div>
            <NavBar/>
            <PageWrapper>
                <Formik initialValues={{tip: 0, donation: 0}} onSubmit={ async (values, {setErrors}) => {
                    console.log(values)
                    const {error} = await createDonation(values);
                    console.log(error?.message)
                    if(error?.message){
                        setDonationError(error.message);
                    }
                    // router.push('/');
                }}>
                    {({isSubmitting}) => (
                        <Form>
                            <FormControl>
                                <CustomInput name="tip" placeholder="Please enter tip" label="tip"/>
                                <CustomInput name="donation" type="donation" placeholder="Please enter donation" label="donation"/>
                                <Box mt={6}>
                                    <Button isLoading={isSubmitting} type='submit' variantColor='orange'>Donate Now</Button>
                                </Box>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
                {donationError && (
                    <Alert status='error'>
                    <AlertIcon />
                    <AlertTitle>{donationError}</AlertTitle>
                    </Alert>
                )}
            </PageWrapper>
        </div>
    );
}
//in next.js have to export default component
export default CreateDonation;
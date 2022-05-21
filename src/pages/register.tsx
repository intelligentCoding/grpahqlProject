import React from 'react';
import { Formik, Form } from "formik";
import { Box, Button, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/core';
import { PageWrapper } from "../components/PageWrapper"
import { CustomInput } from '../components/Input';
import { useMutation } from 'urql';
import { useRegisterMutation } from '../generated/graphql';
import { errorMap } from '../utils';
import {useRouter} from 'next/router';
import { NavBar } from '../components/Navbar';
interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
    const router = useRouter();
    const [, register] = useRegisterMutation()
    return (
        <>
            <NavBar/>
            <PageWrapper>
                <Formik initialValues={{firstName: "", lastName: "", username: "", password: ""}} onSubmit={ async (values, {setErrors}) => {
                    console.log(values);
                    const response = await register(values);
                    if(response.data?.register?.errors) {
                        setErrors(errorMap(response.data.register.errors));
                    } else if(response.data?.register.user) {
                        router.push('/');
                    }
                }}>
                    {({isSubmitting}) => (
                        <Form>
                            <FormControl>
                                <FormLabel htmlFor='username'>userName</FormLabel>
                                <CustomInput name="username" placeholder="Please enter user name" label="username"/>
                                <CustomInput name="password" type="password" placeholder="Please enter password" label="password"/>
                                <CustomInput name="firstName" type="firstName" placeholder="Please enter firstName" label="firstName"/>
                                <CustomInput name="lastName" type="lastName" placeholder="Please enter lastName" label="lastName"/>
                                <Box mt={6}>
                                    <Button isLoading={isSubmitting} type='submit' variantColor='orange'>Register Now</Button>
                                </Box>
                            </FormControl>
                        </Form>
                    )}
                </Formik>
            </PageWrapper>
        </>
    );
}
//in next.js have to export default component
export default Register;
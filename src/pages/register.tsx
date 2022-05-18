import React from 'react';
import { Formik, Form } from "formik";
import { Box, Button, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/core';
import { PageWrapper } from "../components/PageWrapper"
import { CustomInput } from '../components/Input';
interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
    return (
        <PageWrapper>
            <Formik initialValues={{userN: "", pass: ""}} onSubmit={(values) => {
                console.log(values);
            }}>
                {({isSubmitting}) => (
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor='username'>userName</FormLabel>
                            <CustomInput name="username" placeholder="Please enter user name" label="username"/>
                            <CustomInput name="password" type="password" placeholder="Please enter password" label="password"/>
                            <Box mt={6}>
                                <Button isLoading={isSubmitting} type='submit' variantColor='orange'>Register Now</Button>
                            </Box>
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </PageWrapper>
    );
}
//in next.js have to export default component
export default Register;
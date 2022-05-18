import React from 'react';
import { Formik, Form } from "formik";
import { Box, Button, FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/core';
import { PageWrapper } from "../components/PageWrapper"
import { CustomInput } from '../components/Input';
import { useMutation } from 'urql';
interface registerProps {

}

const MUTATION_REGISTER = `mutation Register($username: String!, $password:String!){
    register(options: {username: $username, password: $password}) {
      errors {
        message
      }
      user {
        createdAt
        id
        updatedAt
        username
      }
    }
  }`;

export const Register: React.FC<registerProps> = ({}) => {
    const [, register] = useMutation(MUTATION_REGISTER)
    return (
        <PageWrapper>
            <Formik initialValues={{username: "", password: ""}} onSubmit={ async (values) => {
                const response = await register(values);
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
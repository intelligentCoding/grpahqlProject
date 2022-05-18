import React from 'react';
import { Formik, Form } from "formik";
import { FormControl, FormErrorMessage, FormLabel, Input } from '@chakra-ui/core';
import { PageWrapper } from "../components/PageWrapper"
interface registerProps {

}

export const Register: React.FC<registerProps> = ({}) => {
    return (
        <PageWrapper>
            <Formik initialValues={{userN: "", pass: ""}} onSubmit={(values) => {
                console.log(values);
            }}>
                {(values, handleChange) => (
                    <Form>
                        <FormControl>
                            <FormLabel htmlFor='userN'>userName</FormLabel>
                            <Input 
                                value={values.userN}
                                onChange={handleChange}
                                id="userN"
                                placeholder='Enter User Name'
                            />
                            {/* <FormErrorMessage>{form.errors.name}</FormErrorMessage> */}
                        </FormControl>
                    </Form>
                )}
            </Formik>
        </PageWrapper>
    );
}
//in next.js have to export default component
export default Register;
import React from "react";
import { Formik, Form } from "formik";
import { Box, Button, FormControl, FormLabel } from "@chakra-ui/core";
import { PageWrapper } from "../components/PageWrapper";
import { CustomInput } from "../components/Input";
import { useLoginMutation } from "../generated/graphql";
import { errorMap } from "../utils";
import { useRouter } from "next/router";
import { NavBar } from "../components/Navbar";
interface registerProps {}

export const Login: React.FC<registerProps> = ({}) => {
  const router = useRouter();
  const [, login] = useLoginMutation();
  return (
    <>
      <NavBar />
      <PageWrapper>
        <Formik
          initialValues={{ username: "", password: "" }}
          onSubmit={async (values, { setErrors }) => {
            const response = await login(values);
            if (response.data?.login?.errors) {
              setErrors(errorMap(response.data.login.errors));
            } else if (response.data?.login.user) {
              router.push("/");
            }
          }}
        >
          {({ isSubmitting }) => (
            <Form>
              <FormControl>
                <FormLabel htmlFor="username">Please Login</FormLabel>
                <CustomInput
                  name="username"
                  placeholder="Please enter user name"
                  label="username"
                />
                <CustomInput
                  name="password"
                  type="password"
                  placeholder="Please enter password"
                  label="password"
                />
                <Box mt={6}>
                  <Button
                    isLoading={isSubmitting}
                    type="submit"
                    variantColor="orange"
                  >
                    Login Now
                  </Button>
                </Box>
              </FormControl>
            </Form>
          )}
        </Formik>
      </PageWrapper>
    </>
  );
};
//in next.js have to export default component
export default Login;

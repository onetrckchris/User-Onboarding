import React from 'react';
import { withFormik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import styled from 'styled-components';

const StyledForm = styled(Form)`
    display: flex;
    flex-direction: column;
    max-width: 250px;
    margin: auto;
    padding-top: 100px;
`;

const StyledInput = styled(Field)`
    padding: 10px;
    font-size: 0.9rem;
`; 

const StyledButton = styled.button`
    font-size: 1rem;
    padding: 10px;
    border: 1px solid black;
`;

const ErrorMessage = styled.p`
    font-size: 0.8rem;
    color: red;
`;

const OnboardingForm = ({ errors, touched }) => {
    return (
        <StyledForm>
            <StyledInput type="name" name="name" placeholder="Name" />
            <ErrorMessage>{touched.name && errors.name}</ErrorMessage>
            <StyledInput type="email" name="email" placeholder="Email" />
            <ErrorMessage>{touched.email && errors.email}</ErrorMessage>
            <StyledInput type="password" name="password" placeholder="Password" />
            <ErrorMessage>{touched.password && errors.password}</ErrorMessage>
            <label>Do you accept the Terms of Service?</label>
            <StyledInput type="checkbox" name="termsOfService" placeholder="Password" />
            <ErrorMessage>{touched.termsOfService && errors.termsOfService}</ErrorMessage>
            <StyledButton type="submit">Submit!</StyledButton>
        </StyledForm>
    )
}

const FormikOnboardingForm = withFormik({
    mapPropsToValues: ({name, email, password, termsOfService}) => {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            termsOfService: termsOfService || false,
        };
    },

    handleSubmit: (values, formikBag) => {
        formikBag.resetForm();
        const url = "https://reqres.in/api/users";
        axios.post(url, values)
            .then(response => {
                window.alert(
                    `${response.data.name} is da bomb.
                    His email is ${response.data.email}. Hit him up.
                    ...His password is ${response.data.password}... Don't tell anyone.
                    Did he agree to the Terms of Services? ${response.data.termsOfService ? 'Yes.' : 'Nope.'}`)
                console.log(response);
            })
            .catch(error => console.log(error))
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .required(),
        email: Yup.string()
            .required()
            .email("That's not an email, idiot"),
        password: Yup.string()
            .required()
            .min(8),
        termsOfService: Yup.boolean()
    })
})(OnboardingForm);

export default FormikOnboardingForm;
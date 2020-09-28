import React, { useState } from "react";
import { useMutation } from "@apollo/react-hooks";
import { useForm } from "react-hook-form";
import { useHistory, Link } from "react-router-dom";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";
import { REGISTER_USER } from "../../utils/queries";
import {
  RegisterFormContainer,
  StyledButton,
  RegisterHeading,
  Label,
  Input,
  BirthdayInput,
  NameContainer,
  FullNameContainer,
  LastNameContainer,
  EmailContainer,
  PasswordContainer,
  BirthdayContainer,
  GenderContainer,
  GenderLabel,
  GenderInputContainer,
  FemaleContainer,
  ErrorMessageContainer,
  ErrorMessageHeading,
  LoginContainer,
  LoginLink,
  Gender,
} from "./RegisterForm.styles";
import { ReactComponent as ErrorIcon } from "../../assets/icons/alert-circle.svg";
import firebase from '../firebase';
const RegisterForm = () => {
  const { register, handleSubmit, getValues, errors } = useForm();
  const [graphQLError, setGraphQLError] = useState(undefined);

  const [firstname, setFirstname] = useState('');
  const [lastname, setLirstname] = useState('');
	const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [gender, setGender] = useState('');
  const [birthday, setBirthday] = useState('');


  const history = useHistory();

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    onCompleted: (result) => {
      const { token, username } = result.register;
      localStorage.setItem("token", token);
      history.push(`/${username}`);
    },
    variables: {
      firstName: getValues("firstName"),
      lastName: getValues("lastName"),
      email: getValues("email"),
      password: getValues("password"),
      gender: getValues("gender"),
      birthday: getValues("birthday"),
    },
    onError: (error) => setGraphQLError(error.graphQLErrors[0]),
  });

  

  return (
    <RegisterFormContainer>
      <RegisterHeading>Sign Up to Fakebooker</RegisterHeading>
      <form
        onSubmit={handleSubmit(onSubmitRegister)}
        style={{ padding: "3px" }}
      >
        <FullNameContainer>
          <NameContainer>
            <Label>First name</Label>
            <Input
              name="firstName"
              ref={register({
                required: "First name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "First name is not valid",
                },
              })}
              value={firstname} onChange={e => setFirstname(e.target.value)}
            />
            {errors.firstName && (
              <ErrorMessageContainer>
                <ErrorIcon width={20} height={20} fill="#d93025" />
                <ErrorMessageHeading>
                  {errors.firstName.message}
                </ErrorMessageHeading>
              </ErrorMessageContainer>
            )}
          </NameContainer>
          <LastNameContainer>
            <Label>Last name</Label>
            <Input
              name="lastName"
              ref={register({
                required: "Last name is required",
                pattern: {
                  value: /^[a-zA-Z]+$/,
                  message: "Last name is not valid",
                },
              })}
              value={lastname} onChange={e => setLirstname(e.target.value)}

            />
            {errors.lastName && (
              <ErrorMessageContainer>
                <ErrorIcon width={20} height={20} fill="#d93025" />
                <ErrorMessageHeading>
                  {errors.lastName.message}
                </ErrorMessageHeading>
              </ErrorMessageContainer>
            )}
          </LastNameContainer>
        </FullNameContainer>
        <EmailContainer>
          <Label>Email</Label>
          <Input
            name="email"
            ref={register({
              required: "Email is required",
              pattern: {
                value: /^\w+@\w+\.\w+$/,
                message: "Email is not valid",
              },
            })}
            value={email} onChange={e => setEmail(e.target.value)} 
          />
          {errors.email && (
            <ErrorMessageContainer>
              <ErrorIcon width={20} height={20} fill="#d93025" />
              <ErrorMessageHeading>{errors.email.message}</ErrorMessageHeading>
            </ErrorMessageContainer>
          )}
          {graphQLError && (
            <ErrorMessageContainer>
              <ErrorIcon width={20} height={20} fill="#d93025" />
              <ErrorMessageHeading>{graphQLError.message}</ErrorMessageHeading>
            </ErrorMessageContainer>
          )}
        </EmailContainer>
        <PasswordContainer>
          <Label>Password</Label>
          <Input
            name="password"
            type="password"
            ref={register({
              required: "Password is required",
            })}
            value={password} onChange={e => setPassword(e.target.value)} 
          />
          {errors.password && (
            <ErrorMessageContainer>
              <ErrorIcon width={20} height={20} fill="#d93025" />
              <ErrorMessageHeading>
                {errors.password.message}
              </ErrorMessageHeading>
            </ErrorMessageContainer>
          )}
        </PasswordContainer>
        <BirthdayContainer>
          <Label>Birthday</Label>
          <BirthdayInput
            name="birthday"
            type="date"
            placeholder="Birthday"
            ref={register({
              required: "Birthday is required",
            })}
            value={birthday} onChange={e => setBirthday(e.target.value)} 
          />
          {errors.birthday && (
            <ErrorMessageContainer>
              <ErrorIcon width={20} height={20} fill="#d93025" />
              <ErrorMessageHeading>
                {errors.birthday.message}
              </ErrorMessageHeading>
            </ErrorMessageContainer>
          )}
        </BirthdayContainer>
        <Label>Gender</Label>
        <GenderContainer>
          <div style={{ display: "flex" }}>
            <FemaleContainer>
              <Gender
                name="gender"
                value="Female"
                type="radio"
                ref={register({
                  required: "Gender is required",
                })}
                value={gender} onChange={e => setGender(e.target.value)} 
              />
              <GenderLabel htmlFor="female">Female</GenderLabel>
            </FemaleContainer>
            <GenderInputContainer>
              <Gender
                value="Male"
                name="gender"
                type="radio"
                ref={register({
                  required: "Gender is required",
                })}
              />
              <GenderLabel htmlFor="male">Male</GenderLabel>
            </GenderInputContainer>
          </div>
          {errors.gender && (
            <ErrorMessageContainer>
              <ErrorIcon width={20} height={20} fill="#d93025" />
              <ErrorMessageHeading>{errors.gender.message}</ErrorMessageHeading>
            </ErrorMessageContainer>
          )}
        </GenderContainer>
        <StyledButton htmlType="submit" disabled={loading}>
          Create Account
          {loading && (
            <Loader
              type="TailSpin"
              color="#fff"
              style={{
                position: "absolute",
                right: "16px",
                top: "12px",
              }}
              height={20}
              width={20}
            />
          )}
        </StyledButton>
      </form>
      <LoginContainer>
        Already a member?
        <Link to="/login">
          <LoginLink>Sign In</LoginLink>
        </Link>
      </LoginContainer>
    </RegisterFormContainer>
  );

  async function onSubmitRegister() {
		try {
			await firebase.register(firstname,lastname, email.trim(), password , birthday,gender)
		
		} catch(error) {
			alert(error.message)
		}
	}

};

export default RegisterForm;

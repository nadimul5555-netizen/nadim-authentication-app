"use client";
import React, { useState } from 'react';
import {
  Button,
  Description,
  FieldError,
  FieldGroup,
  Fieldset,
  Form,
  Input,
  InputGroup,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { signIn, signUp } from '../../../lib/auth-client';
import { Eye, EyeSlash } from '@gravity-ui/icons';

const SignUp = () => {
    const [isVisible, setIsVisible] = useState(false);
   const onSubmit =async (e) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = {};
    // Convert FormData to plain object
    formData.forEach((value, key) => {
      data[key] = value.toString();
    });
  const { data:resData, error } =await signUp.email({
    name: data.name,
    email: data.email,
    password: data.password,
    callbackURL: "/",
});
console.log('after sign-up',resData,error)


}

const handleGoogleSignUp= async()=>{
 const resData = await signIn.social({
  provider: 'google',
 })
 
};

  return (
    <Form className="w-full max-w-96 container mx-auto " onSubmit={onSubmit}>
      <Fieldset>
        <Fieldset.Legend>Profile Settings</Fieldset.Legend>
        <Description>Update your profile information.</Description>
        <FieldGroup>
          <TextField
            isRequired
            name="name"
            validate={(value) => {
              if (value.length < 3) {
                return "Name must be at least 3 characters";
              }
              return null;
            }}
          >
            <Label>Name</Label>
            <Input placeholder="John Doe" />
            <FieldError />
          </TextField>
          <TextField isRequired name="email" type="email">
            <Label>Email</Label>
            <Input placeholder="john@example.com" />
            <FieldError />
          </TextField>
          <TextField className="w-full max-w-[280px]" name="password">
      <Label>Password</Label>
      
      <InputGroup>
        <InputGroup.Input
          className="w-full max-w-[280px]"
          type={isVisible ? "text" : "password"}
          
        />
        <InputGroup.Suffix className="pe-0">
          <Button
            isIconOnly
            aria-label={isVisible ? "Hide password" : "Show password"}
            size="sm"
            variant="ghost"
            onPress={() => setIsVisible(!isVisible)}
          >
            {isVisible ? <Eye className="size-4" /> : <EyeSlash className="size-4" />}
          </Button>
        </InputGroup.Suffix>
      </InputGroup>
    </TextField>
        </FieldGroup>
        <Fieldset.Actions>
          <Button type="submit">
            
            Save changes
          </Button>
          <Button type="reset" variant="secondary">
            Cancel
          </Button>
        </Fieldset.Actions>
        <p>Or</p>
        <Button onClick={handleGoogleSignUp}>Sign Up with Google</Button>
      </Fieldset>
    </Form>
  );
};

export default SignUp;
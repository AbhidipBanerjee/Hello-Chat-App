import {
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showpassword, setShowpassword] = useState(false);
  const handleClickPassword = () => setShowpassword(!showpassword);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const submit = async () => {
    setLoading(true);
    if (!email || !password) {
      toast({
        title: "NOT FILLED",
        description: "please fill all the fields",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      toast({
        title: "Login successfull",
        description: "",
        status: "success",
        duration: 9000,
        isClosable: true,
      });
      localStorage.setItem("user_info", JSON.stringify(data));
      setLoading(false);
      history("/chats");
    } catch (error) {
      toast({
        title: "WRONG EMAIL OR PASSWORD",
        description: error.response.data.message,
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
    }
  };

  return (
    <VStack>
      <FormControl id="email" isRequired>
        <FormLabel>email</FormLabel>
        <Input
          type="email"
          value={email}
          placeholder="Enter email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <FormHelperText>Ex: abcd@gmail.com</FormHelperText>
      </FormControl>

      <FormControl isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            value={password}
            type={showpassword ? "text" : "password"}
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.5rem"
              size="xs"
              onClick={handleClickPassword}
              colorScheme="blue"
            >
              {showpassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <Button
        colorScheme="blue"
        variant="solid"
        width={"100%"}
        onClick={submit}
        isLoading={loading}
      >
        Log in
      </Button>

      <Button
        colorScheme="red"
        variant="solid"
        width={"100%"}
        onClick={() => {
          setEmail("abcd@example.com");
          setPassword("12345");
        }}
      >
        Guest User
      </Button>
    </VStack>
  );
};

export default Login;

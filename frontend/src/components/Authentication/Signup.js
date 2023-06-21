import {
  FormControl,
  FormHelperText,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useToast } from "@chakra-ui/react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");
  const [pic, setPic] = useState();
  const [showpassword, setShowpassword] = useState(false);
  const handleClickPassword = () => setShowpassword(!showpassword);
  const [showconfirmpassword, setShowConfirmpassword] = useState(false);
  const handleClickConfirmPassword = () =>
    setShowConfirmpassword(!showconfirmpassword);
  const [loading, setLoading] = useState(false);
  const toast = useToast();
  const history = useNavigate();

  const postDetails = (pics) => {
    setLoading(true);
    if (pics === undefined) {
      toast({
        title: "No image!!",
        description: "please select an image",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      return;
    }
    if (pics.type === "image/jpeg" || pics.type === "image/png") {
      const data = new FormData();
      data.append("file", pics);
      data.append("upload_preset", "hello-chat-app");
      data.append("cloud_name", "abhidip");
      fetch("https://api.cloudinary.com/v1_1/abhidip/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          console.log(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      toast({
        title: "No image!!",
        description: "please select an image",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });
      setLoading(false);
      return;
    }
  };

  const submitSignUp = async () => {
    setLoading(true);
    if (!name || !email || !password || !confirmpassword) {
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
    if (password !== confirmpassword) {
      toast({
        title: "PASSWORD NOT MATCHED",
        description: "please make sure both the password matches",
        status: "warning",
        duration: 9000,
        isClosable: true,
      });

      return;
    }

    try {
      const config = {
        headers: {
          "Content-type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      toast({
        title: "Registration successfull",
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
        title: "Error occured",
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
      <FormControl id="name" isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          type={"text"}
          placeholder="Enter name"
          onChange={(e) => setName(e.target.value)}
        />
      </FormControl>

      <FormControl id="email" isRequired>
        <FormLabel>email</FormLabel>
        <Input
          type="email"
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

      <FormControl isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup size="md">
          <Input
            pr="4.5rem"
            type={showconfirmpassword ? "text" : "password"}
            placeholder="Retype password"
            onChange={(e) => setConfirmpassword(e.target.value)}
          />
          <InputRightElement width="4.5rem">
            <Button
              h="1.5rem"
              size="xs"
              onClick={handleClickConfirmPassword}
              colorScheme="blue"
            >
              {showconfirmpassword ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>

      <FormControl>
        <FormLabel>Upload profile picture</FormLabel>
        <Input
          type={"file"}
          accept="image/*"
          onChange={(e) => postDetails(e.target.files[0])}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        variant="solid"
        width={"100%"}
        onClick={submitSignUp}
        isLoading={loading}
      >
        Sign up
      </Button>
    </VStack>
  );
};

export default Signup;

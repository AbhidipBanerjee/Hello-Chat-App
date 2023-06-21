import React, { useEffect } from "react";
import { Container, Box, Text } from "@chakra-ui/react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user_info"));

    if (user) navigate("/chats");
  }, [navigate]);

  return (
    <Container maxW={"2xl"} centerContent>
      <Box
        d="flex"
        justifyContent="center"
        padding="4"
        p={3}
        bg={"white"}
        w="90%"
        m="40px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Text fontSize="4xl" align={"center"}>
          HELLO
        </Text>
      </Box>

      <Box
        d="flex"
        justifyContent="center"
        padding="4"
        p={3}
        bg={"white"}
        w="90%"
        m="15px 0 15px 0"
        borderRadius="lg"
        borderWidth="1px"
      >
        <Tabs variant="soft-rounded" colorScheme={"blue"}>
          <TabList>
            <Tab width="50%">Log in</Tab>
            <Tab width="50%">Sign up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login> </Login>
            </TabPanel>
            <TabPanel>
              <Signup> </Signup>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
};

export default Homepage;

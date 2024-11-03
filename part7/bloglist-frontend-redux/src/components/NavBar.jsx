import { Link } from "react-router-dom";
import { Button, Link as ChakraLink, Em } from "@chakra-ui/react";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../reducers/userReducer";
import { Box, Flex, HStack } from "@chakra-ui/react";

const NavBar = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);

  const logout = () => {
    window.localStorage.removeItem("loggedUser");
    dispatch(setUser(null));
  };

  return (
    <Box colorPalette={"purple"}>
      <Flex
        h={16}
        alignItems={"center"}
        justifyContent={"space-between"}
        m={"0.5"}
      >
        <HStack spacing={8} alignItems={"center"}>
          <HStack as={"nav"} spacing={4} display={{ md: "flex" }}>
            <ChakraLink asChild>
              <Link to="/">blogs</Link>
            </ChakraLink>
            <ChakraLink asChild>
              <Link to="/users">users</Link>
            </ChakraLink>
          </HStack>
        </HStack>
        <Flex alignItems={"center"}>
          {user ? (
            <HStack>
              <Em>{user.name} logged in</Em>
              <Button onClick={logout}>logout</Button>
            </HStack>
          ) : (
            <Button asChild>
              <Link to="/login">login</Link>
            </Button>
          )}
        </Flex>
      </Flex>
    </Box>
  );
};

export default NavBar;

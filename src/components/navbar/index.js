import {
  Flex,
  Heading,
  HStack,
  Button,
  Box,
  MenuButton,
  Menu,
  MenuGroup,
  MenuDivider,
  MenuList,
  MenuItem,
  Center,
  Text,
} from "@chakra-ui/react"
import React, { useState } from "react"
import { useEffect } from "react"
import {
  MdShoppingCart,
  MdMenu,
  MdMenuBook,
  MdPerson,
  MdLogout,
  MdLogin,
} from "react-icons/md"
import { useHistory, useLocation } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"

const navData = [
  {
    label: "Home",
    url: "/",
  },
  {
    label: "Shop",
    url: "/shop",
  },
  {
    label: "About",
    url: "/about",
  },
]

function Navbar(props) {
  const { currentUser, signInWithGoogle, logout } = useAuth()
  const history = useHistory()
  const location = useLocation()

  const [isAdmin, setIsAdmin] = useState(false)

  const loginUser = () => {
    signInWithGoogle()
      .then((result) => {})
      .catch((error) => {
        console.log("error", error)
      })
  }

  const logoutUser = () => {
    logout()
      .then(() => {
        history.push("/")
      })
      .catch((error) => {
        console.log("error", error)
      })
  }

  useEffect(() => {
    if (currentUser?.email !== process.env.REACT_APP_ADMIN_EMAIL)
      setIsAdmin(false)
    else setIsAdmin(true)
  }, [currentUser])

  return (
    <div style={{ position: "sticky", top: "0", zIndex: "100" }}>
      <Flex
        mb={5}
        bg="primary"
        color="font.secondary"
        padding="1.5em 3em 1.5em 3em"
        justifyContent="space-between"
      >
        <Box>
          <Heading as="h1" fontSize={{ base: "2xl", md: "4xl" }}>
            BOHEMIAN{" "}
          </Heading>
          <Heading
            as="h5"
            fontSize={{ base: "sm", md: "xl" }}
            // textAlign="right"
          >
            A house of Dreams
          </Heading>
        </Box>

        <HStack as="nav" spacing="1" display={{ base: "none", md: "block" }}>
          {navData.map((item, i) => (
            <Button
              variant="navButton"
              key={i}
              borderBottom={
                location.pathname === item.url ? "1px solid white" : ""
              }
              // color="font.selected"
              onClick={() => {
                if (location.pathname !== item.url) history.push(item.url)
              }}
            >
              {" "}
              {item.label}{" "}
            </Button>
          ))}
        </HStack>

        <Menu>
          <MenuButton
            transition="all 0.2s"
            mb={5}
            mr={5}
            ml="auto"
            display={{ base: "block", md: "none" }}
          >
            <Center>
              <MdMenu />
            </Center>
          </MenuButton>
          <MenuList color="font.primary">
            {navData.map((item, i) => (
              <MenuItem
                key={i}
                onClick={() => {
                  history.push(item.url)
                }}
              >
                {" "}
                {item.label}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
        <Menu>
          <MenuButton transition="all 0.2s" mb={5}>
            <Center>
              <MdPerson />
            </Center>
            <Text color="font.secondary" fontWeight={600}>
              Profile
            </Text>
          </MenuButton>
          <MenuList color="font.primary">
            {currentUser ? (
              <>
                <MenuGroup title={`Hi ${currentUser?.displayName}`}></MenuGroup>
                <MenuDivider />
                <MenuItem
                  onClick={() => {
                    history.push("/profile/cart")
                  }}
                  icon={<MdShoppingCart />}
                >
                  Cart
                </MenuItem>
                {/* <MenuItem
                  onClick={() => {
                    history.push("/profile/address");
                  }}
                >
                  {" "}
                  My Address
                </MenuItem> */}
                <MenuItem
                  onClick={() => {
                    history.push("/profile/orders")
                  }}
                  icon={<MdMenuBook />}
                >
                  Orders
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    history.push("/profile/myprofile")
                  }}
                  icon={<MdPerson />}
                >
                  Profile
                </MenuItem>
                {isAdmin && (
                  <MenuItem
                    onClick={() => {
                      history.push("/profile/admin")
                    }}
                    icon={<MdPerson />}
                  >
                    Admin
                  </MenuItem>
                )}

                <MenuItem onClick={logoutUser} icon={<MdLogout />}>
                  Logout
                </MenuItem>
              </>
            ) : (
              <>
                <MenuItem onClick={loginUser} icon={<MdLogin />}>
                  Login with Google
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    loginUser()
                  }}
                  icon={<MdShoppingCart />}
                >
                  Cart
                </MenuItem>
              </>
            )}
          </MenuList>
        </Menu>
      </Flex>
    </div>
  )
}

export default Navbar

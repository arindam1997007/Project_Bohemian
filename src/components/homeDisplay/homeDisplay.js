import React, { useEffect, useState } from "react"
import {
  Box,
  Center,
  Divider,
  Flex,
  Heading,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react"
import HomeImage from "./homeImage"
import ItemDisplay from "./../itemDisplay/index"
import { useHistory } from "react-router-dom"
import { PRODUCT_COLLECTION } from "../../utils/DB_CONST"
import { getHomepageProduct } from "../../firebase/productFirebase"
import { useCartStore } from "./../../store/cart"

function HomeDisplay(props) {
  // const modalSize = useBreakpointValue({ base: "sm", md: "4xl" });
  const history = useHistory()
  const { isOpen, onOpen, onClose } = useDisclosure()

  const addToHomepageItems = useCartStore((state) => state.addToHomepageItems)
  const homepageItems = useCartStore((state) => state.homepageItems)

  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    if (homepageItems.length === 0) {
      getProducts()
    }
  }, [homepageItems.length])

  const getProducts = async () => {
    const items = await getHomepageProduct(PRODUCT_COLLECTION)
    addToHomepageItems(items)
  }

  const openItemModal = (item) => {
    // console.log("selected", item);
    setSelectedItem(item)
    onOpen()
  }

  return (
    <>
      {selectedItem && isOpen ? (
        <ItemDisplay
          selectedItem={selectedItem}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}
      <div style={{ position: "relative" }}>
        <Image
          objectFit="cover"
          objectPosition={{ base: "", md: "100% 25%" }}
          height="50vh"
          width="100vw"
          src="https://firebasestorage.googleapis.com/v0/b/infatuation-c13ec.appspot.com/o/home_cover.jpg?alt=media&token=32175963-aeb4-4a78-8dc8-b88b5c9a4e64"
          alt="Cover Image"
        />
        <Center
          onClick={() => history.push("shop")}
          style={{
            position: "absolute",
            top: "calc(50% - 24px)",
            left: "0",
            width: "100%",
            cursor: "pointer",
          }}
          _hover={{
            color: "font.secondary",
          }}
        >
          <Heading
            fontSize={{ base: "xl", md: "3xl" }}
            style={{
              // border: "2px solid white",
              padding: "15px",
              backgroundColor: "rgba(52, 52, 52, 0.8)",
            }}
          >
            BROWSE COLLECTIONS
          </Heading>
        </Center>
      </div>
      <Center style={{ flexDirection: "column" }}>
        <Box>
          <Heading fontSize="3xl" m={[4, 8]}>
            YEAR ROUND
          </Heading>
        </Box>
        <Divider
          colorScheme="font.secondary"
          style={{
            border: "1px solid black",
            borderRadius: "50%",
            width: "50vw",
          }}
        />
        <Text
          fontSize="lg"
          color="font.primary"
          m={5}
          style={{
            color: "font.secondary",
          }}
        >
          MUST HAVE ITEMS
        </Text>
      </Center>{" "}
      <Center mb="15px">
        <Flex
          w={{ base: "80vw", md: "60vw" }}
          alignItems="center"
          justifyContent="space-between"
          flexDirection={{ base: "column", md: "row" }}
        >
          {homepageItems.map((item, index) => (
            <HomeImage item={item} onOpen={openItemModal} key={index} />
          ))}
        </Flex>
      </Center>
    </>
  )
}

export default HomeDisplay

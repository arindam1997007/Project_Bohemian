import {
  AccordionIcon,
  AccordionButton,
  Grid,
  Flex,
  GridItem,
  Heading,
  Text,
  Input,
  Button,
  AccordionItem,
  AccordionPanel,
  Accordion,
  Box,
  Select,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalBody,
  ModalFooter,
  useToast,
  Spinner,
  Center,
} from "@chakra-ui/react"
import React, { useRef, useEffect, useState, useReducer } from "react"
import { motion } from "framer-motion"
import itemCSS from "./itemDisplay.module.css"
import { getProductDetails } from "../../firebase/productFirebase"
import { PRODUCT_DETAILS_SUB_COLLECTION } from "./../../utils/DB_CONST"
import { BiRupee } from "react-icons/bi"
import { useCartStore } from "./../../store/cart"
import { useAuth } from "./../../context/AuthContext"

function reducerQuantity(state, action) {
  const { payload } = action
  switch (action.type) {
    case "increment":
      if (state.count < payload?.max) return { count: state.count + 1 }
      break
    case "decrement":
      if (state.count > 1) return { count: state.count - 1 }
      break
    default:
      break
  }
  return state
}

function ItemDisplay({ selectedItem, isOpen, onClose }) {
  const addToCartStore = useCartStore((state) => state.addToCart)

  const { currentUser, signInWithGoogle } = useAuth()

  const carouselRef = useRef(null)

  const [leftWidth, setLeftWidth] = useState(0)
  const [images, setImages] = useState(null)
  const [size, setSize] = useState(selectedItem.size[0])
  const [color, setColor] = useState(selectedItem.color[0])

  const [loadingImage, setLoadingImage] = useState(true)

  const [quantity, dispatchQuantity] = useReducer(reducerQuantity, {
    count: 1,
  })

  const toast = useToast()

  useEffect(() => {
    getItemDetails()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // useEffect(() => {
  //   if (images)
  //     setLeftWidth(
  //       carouselRef.current.scrollWidth - carouselRef.current.offsetWidth
  //     )
  // }, [images])

  const getItemDetails = async () => {
    const details = await getProductDetails(
      PRODUCT_DETAILS_SUB_COLLECTION(selectedItem.id)
    )
    setImages(details?.imageUrls)
    setLoadingImage(true)
  }

  const addItemCart = () => {
    if (currentUser) {
      if (selectedItem) {
        const item = {
          id: selectedItem.id,
          name: selectedItem.name,
          price: selectedItem.price,
          gender: selectedItem.gender,
          quantity: quantity.count,
          image: selectedItem.thumbnail,
          size,
          color,
        }
        addToCartStore(item)
        toast({
          title: "Added To Cart",
          status: "info",
          duration: 500,
          isClosable: true,
          position: "top",
        })
        onClose()
      }
    } else {
      signInWithGoogle()
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose} scrollBehavior="inside">
      <ModalOverlay />
      <ModalContent maxWidth={{ base: "80vw", md: "70vw" }} maxH="80vh">
        <ModalBody mt={1}>
          <Grid templateColumns={{ base: "1fr", md: "3fr 2fr" }} gap={4}>
            <GridItem overflow="hidden">
              {images ? (
                <motion.div
                  ref={carouselRef}
                  className={itemCSS.carousel}
                  whileTap={{ cursor: "grabbing" }}
                >
                  <motion.div
                    drag="x"
                    dragConstraints={{ right: 0, left: -leftWidth }}
                    className={itemCSS.inner_carousel}
                  >
                    {images.map((image, index) => {
                      return (
                        <motion.div className={itemCSS.item} key={index}>
                          <img src={image} loading="lazy" alt=""></img>
                        </motion.div>
                      )
                    })}
                  </motion.div>
                </motion.div>
              ) : loadingImage ? (
                <Center h="100%">
                  <Spinner size="lg" />
                </Center>
              ) : null}
            </GridItem>
            <GridItem padding="1rem">
              <Heading size="lg" m={2}>
                {selectedItem.name} <BiRupee style={{ display: "inline" }} />
                {selectedItem.price}
              </Heading>
              <Flex m={2} alignItems="center">
                <Input value={quantity.count} readOnly />
                <Button
                  onClick={() =>
                    dispatchQuantity({ type: "increment", payload: { max: 5 } })
                  }
                  m={1}
                >
                  +
                </Button>
                <Button
                  onClick={() => dispatchQuantity({ type: "decrement" })}
                  m={1}
                >
                  -
                </Button>
              </Flex>
              <Flex m={2} alignItems="center">
                <Text mr={3}>Size</Text>
                <Select
                  value={size}
                  w="10em"
                  onChange={(e) => setSize(e.target.value)}
                >
                  {selectedItem.size.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    )
                  })}
                </Select>
                <Text mr={3} ml={3}>
                  Color
                </Text>
                <Select
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                >
                  {selectedItem.color.map((item) => {
                    return (
                      <option value={item} key={item}>
                        {item}
                      </option>
                    )
                  })}
                </Select>
              </Flex>
              <Accordion allowMultiple mt={5}>
                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text>PRODUCT INFO</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    {selectedItem.description}
                  </AccordionPanel>
                </AccordionItem>

                <AccordionItem>
                  <AccordionButton>
                    <Box flex="1" textAlign="left">
                      <Text>RETURN AND REFUND POLICY</Text>
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                  <AccordionPanel pb={4}>
                    Please keep in mind that online purchases must be returned
                    via mail and cannot be returned in our physical stores. The
                    return must be sent to us within 30 days from the date you
                    received your parcel. Items such as swimwear, underwear,
                    pierced earrings, cosmetics and face masks cannot be
                    exchanged & refunded due to hygiene reasons.
                  </AccordionPanel>
                </AccordionItem>
              </Accordion>
              {/* </Text> */}
            </GridItem>
          </Grid>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
          <Button variant="ghost" onClick={addItemCart}>
            Add To Cart
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default ItemDisplay

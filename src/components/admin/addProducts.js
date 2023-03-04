import {
  FormControl,
  FormLabel,
  NumberInputField,
  FormErrorMessage,
  Input,
  Flex,
  Box,
  RadioGroup,
  Radio,
  Button,
  HStack,
  NumberInput,
  Select,
  CheckboxGroup,
  Checkbox,
  List,
  ListItem,
  ListIcon,
  useToast,
} from "@chakra-ui/react"
import { useState } from "react"
import {
  FILTER_CATEGORIES,
  FILTER_COLOR_TYPES,
  FILTER_GENDER,
  FILTER_SIZE,
} from "../const/filterValues"
import { MdCheckCircle } from "react-icons/md"
import { serverTimestamp } from "firebase/firestore"
import { resizeImageFile } from "./../../utils/imageUtil"
import {
  addProductFirebase,
  addProductImage,
} from "../../firebase/productFirebase"
import {
  PRODUCT_COLLECTION,
  PRODUCT_DETAILS_SUB_COLLECTION,
} from "../../utils/DB_CONST"
import { useAuth } from "../../context/AuthContext"

const AddProducts = () => {
  const { currentUser } = useAuth()

  const [images, setImages] = useState([])
  const [thumbnail, setThumbnail] = useState()
  const [size, setSize] = useState([])
  const [color, setColor] = useState([])
  const [loading, setLoading] = useState(false)

  const [textData, setTextData] = useState({
    productName: "",
    price: "",
    description: "",
    gender: "",
    category: FILTER_CATEGORIES[0].value,
  })

  const toast = useToast()

  const handleTextData = (name, value) => {
    setTextData({ ...textData, [name]: value })
  }

  const handleImage = (e) => {
    const file = e.target.files[0]
    // file.name = new Date().getTime() + "_" + file.name;
    if (images.length === 0) {
      resizeImageFile({
        file,
        maxWidth: 400,
        maxHeight: 400,
        compressFormat: "JPEG",
        quality: 90,
        rotation: 0,
      }).then((res) => {
        setThumbnail(res)
      })
    }
    resizeImageFile({
      file,
      maxWidth: 500,
      maxHeight: 500,
      compressFormat: "JPEG",
      quality: 90,
      rotation: 0,
    }).then((res) => {
      setImages([...images, res])
    })
  }

  const createProductObject = ({ thumbnailUrl = "" }) => {
    return {
      name: textData.productName,
      price: textData.price,
      description: textData.description,
      gender: textData.gender,
      category: textData.category,
      thumbnail: thumbnailUrl,
      timeStamp: serverTimestamp(),
      size,
      color,
    }
  }

  const createProductDetailsObject = ({ imageUrls }) => {
    return {
      imageUrls,
    }
  }

  const resetForm = () => {
    setImages([])
    setThumbnail()
    // setSize([])
    // setColor([])
    setTextData({
      productName: "",
      price: "",
      description: "",
      gender: "",
      category: FILTER_CATEGORIES[0].value,
    })
  }

  const handleSubmitError = (err) => {
    resetForm()
    setLoading(false)
    toast({
      title: err.message,
      status: "error",
      duration: 1500,
      isClosable: true,
      position: "top",
    })
  }

  const handleAddProduct = async (e) => {
    e.preventDefault()
    if (size.length === 0 || color.length === 0) return
    if (!currentUser) return

    setLoading(true)
    toast({
      title: "Uploading...",
      status: "info",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
    addProductImage(thumbnail)
      .then((thumbnailUrl) => {
        // thumbnailUrl = res;

        const productValue = createProductObject({ thumbnailUrl })
        addProductFirebase(PRODUCT_COLLECTION, currentUser, productValue)
          .then((id) => {
            // const imageUrls = [];
            const imageUploadPromise = []
            images.forEach((image) => {
              imageUploadPromise.push(addProductImage(image))
            })
            Promise.allSettled(imageUploadPromise)
              .then((uploadImages) => {
                const imageUrls = uploadImages.map((item) => item.value)
                const productDetailsValue = createProductDetailsObject({
                  imageUrls,
                })
                addProductFirebase(
                  PRODUCT_DETAILS_SUB_COLLECTION(id),
                  currentUser,
                  productDetailsValue
                )
                  .then(() => {
                    toast({
                      title: "Uploaded!",
                      status: "success",
                      duration: 1000,
                      isClosable: true,
                      position: "top",
                    })
                    setLoading(false)
                    resetForm()
                  })
                  .catch((err) => {
                    handleSubmitError(err)
                  })
              })
              .catch((err) => {
                handleSubmitError(err)
              })
          })
          .catch((err) => {
            handleSubmitError(err)
          })
      })
      .catch((err) => {
        handleSubmitError(err)
      })
  }

  return (
    <>
      <form onSubmit={handleAddProduct}>
        <FormControl isRequired>
          <Flex>
            <Box mb={3} mr={5}>
              <FormLabel htmlFor="prouct-name">Product name</FormLabel>
              <Input
                id="prouct-name"
                placeholder="Product name"
                name="productName"
                value={textData.productName}
                onChange={(e) => handleTextData(e.target.name, e.target.value)}
                // borderColor="rgb(from var(--chakra-colors-font-selected) r g b / 0.3)"
                color="primary"
              />
            </Box>
            <Box mb={3} mr={5}>
              <FormLabel htmlFor="product-price">Product Price</FormLabel>
              <NumberInput
                id="product-price"
                min={0}
                // name="price"
                value={textData.price}
                onChange={(e) => handleTextData("price", e)}
                color="primary"
              >
                <NumberInputField />
              </NumberInput>
            </Box>
          </Flex>
          <FormLabel htmlFor="product-description">
            Product Description
          </FormLabel>
          <Input
            id="product-description"
            placeholder="Product Description"
            mb={3}
            name="description"
            value={textData.description}
            color="primary"
            onChange={(e) => handleTextData(e.target.name, e.target.value)}
          />
          <HStack spacing="24px" mb={3}>
            <FormLabel as="legend">GENDER: </FormLabel>
            <RadioGroup
              value={textData.gender}
              onChange={(e) => handleTextData("gender", e)}
            >
              {FILTER_GENDER.map((item) => {
                return (
                  <Radio
                    key={item.value}
                    value={item.value}
                    mr={2}
                    borderColor="font.primary"
                  >
                    {item.label}
                  </Radio>
                )
              })}
            </RadioGroup>
          </HStack>
          <HStack spacing="24px" mb={3}>
            <FormLabel as="legend">CATEGORY: </FormLabel>
            <Select
              w="30vw"
              value={textData.category}
              onChange={(e) => handleTextData(e.target.name, e.target.value)}
              name="category"
            >
              {FILTER_CATEGORIES.map((item) => {
                return (
                  <option key={item.value} value={item.value} mr={2}>
                    {item.label}
                  </option>
                )
              })}
            </Select>
          </HStack>
        </FormControl>
        <FormControl isRequired isInvalid={size.length === 0}>
          <HStack spacing="24px" mb={3} flexWrap="wrap">
            <FormLabel as="legend">SIZE: </FormLabel>
            <CheckboxGroup w="30%" onChange={(e) => setSize([...e])}>
              {FILTER_SIZE.map((item) => {
                return (
                  <Checkbox
                    key={item.value}
                    value={item.value}
                    mr={2}
                    // sx={{
                    //   "[data-checked]": {
                    //     borderColor: "font.primary",
                    //     // background: "font.primary",
                    //   },
                    //   "chakra-checkbox__control [data-checked]": {
                    //     background: "font.primary",
                    //   },
                    // }}
                    borderColor="font.primary"
                  >
                    {item.label}
                  </Checkbox>
                )
              })}
            </CheckboxGroup>
          </HStack>
          <FormErrorMessage color="error" mb={3}>
            Size is required.
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired isInvalid={color.length === 0}>
          <HStack spacing="24px" mb={3} flexWrap="wrap">
            <FormLabel as="legend">COLOR: </FormLabel>
            <CheckboxGroup w="30%" onChange={(e) => setColor([...e])}>
              {FILTER_COLOR_TYPES.map((item) => {
                return (
                  <Checkbox
                    key={item.value}
                    value={item.value}
                    mr={2}
                    borderColor="font.primary"
                  >
                    {item.label}
                  </Checkbox>
                )
              })}
            </CheckboxGroup>
          </HStack>
          <FormErrorMessage color="error" mb={3}>
            Color is required.
          </FormErrorMessage>
        </FormControl>
        <FormControl isRequired>
          <FormLabel
            htmlFor="product-image"
            border="1px solid"
            p={2}
            cursor="pointer"
            w="fit-content"
            display="inline-block"
          >
            Upload Image
          </FormLabel>
          <Input
            display="inline-block"
            opacity={0}
            w={0}
            id="product-image"
            type="file"
            p={2}
            accept=".png, .jpg, .jpeg, .svg, .webp"
            onChange={handleImage}
            mb={3}
          />
        </FormControl>
        {images ? (
          <List spacing={3}>
            {images.map((image, index) => {
              return (
                <ListItem key={index}>
                  <ListIcon as={MdCheckCircle} color="green.500" />
                  {image.name}
                </ListItem>
              )
            })}
          </List>
        ) : (
          ""
        )}

        <Button
          variant="primary"
          mt={5}
          ml="30vw"
          type="submit"
          disabled={loading}
        >
          Upload Product
        </Button>
      </form>
    </>
  )
}

export default AddProducts

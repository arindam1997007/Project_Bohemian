import {
  Image,
  Input,
  Text,
  Table,
  Tbody,
  Tr,
  Td,
  NumberInput,
  NumberInputField,
  Button,
  FormControl,
  FormErrorMessage,
  useToast,
  Spinner,
} from "@chakra-ui/react"
import { useAuth } from "../../context/AuthContext"
import CustProfCSS from "./customerProfile.module.css"
import { useFormik } from "formik"
import { setDoc, doc, serverTimestamp } from "firebase/firestore"
import { db } from "../../firebase"
import { useEffect, useState } from "react"
import { USER_COLLECTION } from "./../../utils/DB_CONST"
import { fetchUserData } from "../../firebase/userFirebase"

const CustomerProfile = ({}) => {
  const { currentUser } = useAuth()
  const [initialForm, setInitialForm] = useState({
    phoneNumber: "",
    address: "",
    city: "",
    pincode: "",
    state: "",
  })

  // console.log(currentUser)

  const [loading, setLoading] = useState(true)

  const toast = useToast()

  useEffect(() => {
    if (currentUser) userData()
  }, [])

  const userData = async () => {
    try {
      const { timeStamp, ...data } = await fetchUserData(
        USER_COLLECTION,
        currentUser.uid
      )
      setInitialForm({ ...data })
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  const formik = useFormik({
    initialValues: initialForm,
    enableReinitialize: true,
    onSubmit: async (values) => {
      try {
        await setDoc(doc(db, USER_COLLECTION, currentUser.uid), {
          ...values,
          timeStamp: serverTimestamp(),
        }).then((res) => {
          toast({
            title: "Updated!",
            status: "success",
            duration: 1000,
            isClosable: true,
            position: "top",
          })
        })
      } catch (err) {
        console.log(err)
      }
    },

    validate: (values, props) => {
      const errors = {}
      if (values.phoneNumber.length != 10) {
        errors.phoneNumber = "Phone Number should be 10 digits"
      }
      if (!values.address) {
        errors.address = "Address Required"
      }
      if (!values.city) {
        errors.city = "City Required"
      }
      if (values.pincode.length != 6) {
        errors.pincode = "Pincode should be 6 digits"
      }
      if (!values.state) {
        errors.state = "State Required"
      }
      return errors
    },
  })

  return (
    <>
      <form onSubmit={formik.handleSubmit}>
        <Table
          width="50vw"
          variant="unstyled"
          className={CustProfCSS.profile_table}
        >
          <Tbody>
            {loading ? (
              <Tr>
                <Td colSpan={2} textAlign="center">
                  <Spinner color="primary" size="lg" />
                </Td>
              </Tr>
            ) : (
              <>
                <Tr>
                  <Td colSpan={2}>
                    <Image
                      borderRadius="50%"
                      maxWidth="8rem"
                      maxHeight="8rem"
                      width="100%"
                      objectFit="cover"
                      src={currentUser?.photoURL}
                      mb={5}
                      mx="auto"
                      referrerPolicy="no-referrer"
                    />
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="right">
                    <Text>Name</Text>
                  </Td>
                  <Td>
                    <Text color="font.primary">{currentUser?.displayName}</Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="right">
                    <Text>Email</Text>
                  </Td>
                  <Td>
                    <Text color="font.primary">{currentUser?.email}</Text>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="right">
                    <Text>Phone Number*</Text>
                  </Td>
                  <Td>
                    <FormControl
                      isInvalid={
                        formik.errors.phoneNumber && formik.touched.phoneNumber
                      }
                    >
                      <NumberInput
                        value={formik.values.phoneNumber}
                        onChange={(e) => {
                          formik.setFieldValue("phoneNumber", e)
                        }}
                        name="phoneNumber"
                        id="phoneNumber"
                        onBlur={formik.handleBlur}
                        min={0}
                        max={9999999999}
                      >
                        <NumberInputField />
                      </NumberInput>
                      <FormErrorMessage>
                        {formik.errors.phoneNumber}
                      </FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="right">
                    <Text>Address*</Text>
                  </Td>
                  <Td>
                    <FormControl
                      isInvalid={
                        formik.errors.address && formik.touched.address
                      }
                    >
                      <Input
                        name="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>
                        {formik.errors.address}
                      </FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="right">
                    <Text>City*</Text>
                  </Td>
                  <Td textAlign="right">
                    <FormControl
                      isInvalid={formik.errors.city && formik.touched.city}
                    >
                      <Input
                        name="city"
                        value={formik.values.city}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>{formik.errors.city}</FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="right">
                    <Text>Pin Code*</Text>
                  </Td>
                  <Td textAlign="right">
                    <FormControl
                      isInvalid={
                        formik.errors.pincode && formik.touched.pincode
                      }
                    >
                      <NumberInput
                        value={formik.values.pincode}
                        onChange={(e) => {
                          formik.setFieldValue("pincode", e)
                        }}
                        name="pincode"
                        id="pincode"
                        onBlur={formik.handleBlur}
                        min={0}
                        max={999999}
                      >
                        <NumberInputField />
                      </NumberInput>
                      <FormErrorMessage>
                        {formik.errors.pincode}
                      </FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="right">
                    <Text>State*</Text>
                  </Td>
                  <Td textAlign="right">
                    <FormControl
                      isInvalid={formik.errors.state && formik.touched.state}
                    >
                      <Input
                        name="state"
                        value={formik.values.state}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                      />
                      <FormErrorMessage>{formik.errors.state}</FormErrorMessage>
                    </FormControl>
                  </Td>
                </Tr>
                <Tr>
                  <Td textAlign="center" colSpan={2}>
                    <Button w="10em" variant="primary" type="submit">
                      Save
                    </Button>
                  </Td>
                </Tr>
              </>
            )}
          </Tbody>
        </Table>
      </form>
    </>
  )
}

export default CustomerProfile

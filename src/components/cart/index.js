import { Box, Divider, Flex, Heading, Button, useToast } from "@chakra-ui/react"
import CartProduct from "./cartProduct"
import { useCartStore } from "./../../store/cart"
import { useState, useEffect } from "react"
import { fetchUserData } from "../../firebase/userFirebase"
import { USER_COLLECTION } from "../../utils/DB_CONST"
import { useAuth } from "../../context/AuthContext"
import { useHistory } from "react-router-dom"
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { createPaymentCartCheckout } from "../services/cartCheckout"

const CARD_ELEMENT_OPTIONS = {
  hidePostalCode: true,
  style: {
    base: {
      color: "#4c6b73",
      fontSmoothing: "antialiased",
      fontWeight: "bold",
      fontSize: "1em",
      "::placeholder": {
        color: "#A97155",
      },
    },
    invalid: {
      color: "red",
      iconColor: "#fa755a",
      fontWeight: "normal",
    },
  },
}

const Cart = () => {
  const cartItems = useCartStore((state) => state.cartItems)
  const removeItem = useCartStore((state) => state.removeFromCart)
  const emptyCart = useCartStore((state) => state.emptyCart)

  const { currentUser } = useAuth()
  const history = useHistory()

  const stripe = useStripe()
  const elements = useElements()

  const toast = useToast()

  const [total, setTotal] = useState(0)
  const [processing, setProcessing] = useState(false)

  useEffect(() => {
    let tot = 0
    cartItems.forEach((item) => (tot += item.quantity * item.price))
    setTotal(tot)
  }, [cartItems])

  const handlePaymentError = (err) => {
    setProcessing(false)
    toast({
      title: err.message,
      status: "error",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }

  const handlePaymentSuccess = () => {
    emptyCart()
    setProcessing(false)
    toast({
      title: "Payment Successful!",
      status: "success",
      duration: 2000,
      isClosable: true,
      position: "top",
    })
  }

  const handleCheckout = async () => {
    try {
      const data = await fetchUserData(USER_COLLECTION, currentUser?.uid)
      if (
        data.address &&
        data.city &&
        data.phoneNumber &&
        data.pincode &&
        data.state
      ) {
        setProcessing(true)
        const cardElement = elements.getElement(CardElement)
        const payload = {
          cartItems,
          userId: currentUser.uid,
        }
        createPaymentCartCheckout(payload)
          .then((res) => {
            const clientSecret = res.data.clientSecret
            stripe
              .createPaymentMethod({
                type: "card",
                card: cardElement,
                billing_details: {
                  name: currentUser?.displayName,
                },
              })
              .then(({ paymentMethod }) => {
                stripe
                  .confirmCardPayment(clientSecret, {
                    payment_method: paymentMethod.id,
                  })
                  .then((response) => {
                    handlePaymentSuccess()
                  })
                  .catch((err) => {
                    handlePaymentError(err)
                  })
              })
              .catch((err) => {
                handlePaymentError(err)
              })
          })
          .catch((err) => {
            handlePaymentError(err)
          })
      } else {
        history.push("/profile/myprofile")
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleCardElementChange = () => {}

  return (
    <Box ml={10} w={{ base: "80vw", md: "fit-content" }}>
      {cartItems.length === 0 ? (
        <Heading>Cart is empty</Heading>
      ) : (
        <Flex flexDirection={{ base: "column", md: "row" }}>
          <Box mr={10}>
            <Heading>My Cart</Heading>
            <Divider
              width={{ base: "50vw", md: "35em" }}
              my={5}
              borderColor="black"
              opacity={0.5}
            />
            <Flex flexDirection="column">
              {cartItems.map((item) => (
                <CartProduct
                  product={item}
                  key={Math.random() * new Date().getTime()}
                  removeItem={removeItem}
                />
              ))}
            </Flex>
          </Box>
          <Box>
            <Heading>Order Summary</Heading>
            <Divider
              width={{ base: "50vw", md: "20em" }}
              my={5}
              borderColor="black"
              opacity={0.5}
            />
            <Box>
              <table
                width="100%"
                style={{ borderCollapse: "separate", borderSpacing: "0.5em" }}
              >
                <tbody>
                  <tr>
                    <td>SubTotal </td>
                    <td style={{ textAlign: "right" }}>&#8377; {total}</td>
                  </tr>
                  <tr>
                    <td>Shipping </td>
                    <td style={{ textAlign: "right" }}>FREE</td>
                  </tr>
                </tbody>
              </table>
            </Box>
            <Divider
              width={{ base: "50vw", md: "20em" }}
              my={5}
              borderColor="black"
              opacity={0.5}
            />
            <Flex>
              <Heading flex="2">Total</Heading>
              <Heading>&#8377; {total}</Heading>
            </Flex>
            <Box mt={10}>
              <CardElement
                options={CARD_ELEMENT_OPTIONS}
                onChange={handleCardElementChange}
              />
            </Box>
            <Button
              mt={10}
              w="100%"
              variant="primary"
              onClick={handleCheckout}
              disabled={processing}
            >
              {processing ? "Processing" : "Checkout"}
            </Button>
          </Box>
        </Flex>
      )}
    </Box>
  )
}

export default Cart

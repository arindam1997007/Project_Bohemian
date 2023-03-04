import {
  Flex,
  Box,
  Heading,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Image,
} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { useAuth } from "../../context/AuthContext"
import { fetchUserOrderData } from "../../firebase/userFirebase"
import { USER_ORDER_SUB_COLLECTION } from "../../utils/DB_CONST"

const Orders = () => {
  const { currentUser } = useAuth()
  const [orders, setOrders] = useState([])

  useEffect(() => {
    getUserOrderData()
  }, [])

  const getUserOrderData = async () => {
    try {
      if (currentUser?.uid) {
        const it = []
        const result = await fetchUserOrderData(
          USER_ORDER_SUB_COLLECTION(currentUser.uid)
        )
        result.forEach((res) => {
          res.items.map((item) =>
            it.push({
              ...item,
              timeStamp: res.timeStamp.toDate().toDateString(),
            })
          )
        })
        setOrders(it)
      }
    } catch (err) {
      console.log("err", err)
    }
  }

  return (
    <Flex
      flexDirection="column"
      width={{ base: "80vw", md: "100%" }}
      overflow="auto"
    >
      {/* <Box> */}
      <Heading ml={10}>Order Details</Heading>
      {/* </Box> */}
      <Box m={5}>
        <Table variant="primary">
          <Thead>
            <Tr>
              <Th>ITEM</Th>
              <Th>NAME</Th>
              <Th>QUANTITY</Th>
              <Th>PRICE</Th>
              <Th>COLOR</Th>
              <Th>SIZE</Th>
              <Th>ORDER DATE</Th>
              <Th>PAYMENT</Th>
            </Tr>
          </Thead>
          <Tbody>
            {orders.length > 0 &&
              orders.map((item, index) => {
                return (
                  <Tr key={index}>
                    <Td>
                      <Image
                        style={{
                          borderRadius: "10px",
                        }}
                        maxWidth="8rem"
                        maxHeight="8rem"
                        width="100%"
                        objectFit="cover"
                        src={item.image}
                      />
                    </Td>
                    <Td>{item.name}</Td>
                    <Td>{item.quantity}</Td>
                    <Td>{item.quantity * item.price}</Td>
                    <Td>{item.color}</Td>
                    <Td>{item.size}</Td>
                    <Td>{item.timeStamp}</Td>
                    <Td>{"Completed"}</Td>
                  </Tr>
                )
              })}
          </Tbody>
        </Table>
      </Box>
    </Flex>
  )
}

export default Orders

import {
  Flex,
  Heading,
  TabList,
  Tabs,
  Tab,
  TabPanel,
  TabPanels,
} from "@chakra-ui/react"
import { useEffect } from "react"
import AddProducts from "./addProducts"
import { useAuth } from "./../../context/AuthContext"
import { useHistory } from "react-router-dom"

const Admin = () => {
  const { currentUser } = useAuth()

  const history = useHistory()

  useEffect(() => {
    if (currentUser?.email !== process.env.REACT_APP_ADMIN_EMAIL) {
      return history.push("/")
    }
    // }
  }, [currentUser])

  return (
    <Flex flexDirection="column" w="80vw">
      <Heading ml={10} mb={{ base: "10", md: "2" }}>
        Welcome Admin
      </Heading>
      <Tabs m={{ base: "2", md: "10" }} size="lg" isManual>
        <TabList>
          <Tab>ADD ITEM</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <AddProducts />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Flex>
  )
}

export default Admin

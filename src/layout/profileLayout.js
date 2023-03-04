import React, { useEffect, useState } from "react"
import Navbar from "./../components/navbar/index"
import Footer from "./../components/footer/index"
import { useAuth } from "../context/AuthContext"
import { useHistory } from "react-router-dom"
import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  useBreakpointValue,
  Center,
} from "@chakra-ui/react"
import Cart from "../components/cart"
import CustomerProfile from "./../components/customerProfile/index"
import {
  MdPerson,
  MdShoppingCart,
  MdMenuBook,
  MdSecurity,
} from "react-icons/md"
import Orders from "../components/orders"
import Admin from "../components/admin/admin"
import { Elements } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"

const selectedTabStyle = {
  color: "font.secondary",
  bg: "primary",
}

const focusTabStyle = {
  boxShadow: "none",
}
const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_API_KEY)

function ProfileLayout({ defaultTabIndex = 0 }) {
  const { currentUser } = useAuth()

  const history = useHistory()
  const orientation = useBreakpointValue({
    base: "horizontal",
    md: "vertical",
  })

  const [tabIndex, setTabIndex] = useState(defaultTabIndex)

  useEffect(() => {
    if (!currentUser) {
      return history.push("/")
    }
  }, [])

  useEffect(() => {
    setTabIndex(defaultTabIndex)
  }, [defaultTabIndex])

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <Navbar />
      <Tabs
        index={tabIndex}
        onChange={(index) => setTabIndex(index)}
        orientation={orientation}
        m={10}
        size="lg"
        isManual
        variant="soft-rounded"
        isLazy
      >
        <TabList overflowX={{ base: "scroll", md: "hidden" }}>
          <Tab _selected={selectedTabStyle} _focus={focusTabStyle}>
            Cart <MdShoppingCart style={{ marginLeft: "0.4em" }} />
          </Tab>
          <Tab _selected={selectedTabStyle} _focus={focusTabStyle}>
            Orders <MdMenuBook style={{ marginLeft: "0.4em" }} />
          </Tab>
          <Tab _selected={selectedTabStyle} _focus={focusTabStyle}>
            Profile <MdPerson style={{ marginLeft: "0.4em" }} />
          </Tab>
          <Tab _selected={selectedTabStyle} _focus={focusTabStyle}>
            Admin <MdSecurity style={{ marginLeft: "0.4em" }} />
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Center>
              <Elements stripe={stripePromise}>
                <Cart />
              </Elements>
            </Center>
          </TabPanel>
          <TabPanel>
            <Orders />
          </TabPanel>
          <TabPanel>
            <Center>
              <CustomerProfile />
            </Center>
          </TabPanel>
          <TabPanel>
            <Admin />
          </TabPanel>
        </TabPanels>
      </Tabs>
      <Footer />
    </div>
  )
}

export default ProfileLayout

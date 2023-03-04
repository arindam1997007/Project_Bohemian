import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom"
import { ChakraProvider } from "@chakra-ui/react"
import React from "react"
import theme from "./theme/index"
import AuthContextProvider from "./context/AuthContext"
import HomeLayout from "./layout/homeLayout"
import AboutLayout from "./layout/aboutLayout"
import ShopLayout from "./layout/shopLayout"
import ProfileLayout from "./layout/profileLayout"

function App() {
  return (
    <ChakraProvider theme={theme}>
      <AuthContextProvider>
        <BrowserRouter>
          <Switch>
            <Route path="/" exact={true}>
              <HomeLayout />
            </Route>
            <Route path="/about" exact={true}>
              <AboutLayout />
            </Route>
            <Route path="/shop" exact={true}>
              <ShopLayout />
            </Route>
            <Route path="/profile/admin" exact={true}>
              <ProfileLayout defaultTabIndex={3} />
            </Route>
            <Route path="/profile/cart" exact={true}>
              <ProfileLayout defaultTabIndex={0} />
            </Route>
            <Route path="/profile/orders" exact={true}>
              <ProfileLayout defaultTabIndex={1} />
            </Route>
            <Route path="/profile/myprofile" exact={true}>
              <ProfileLayout defaultTabIndex={2} />
            </Route>
            <Route path="*">
              <Redirect to="/" />
            </Route>
          </Switch>
        </BrowserRouter>
      </AuthContextProvider>
    </ChakraProvider>
  )
}

export default App

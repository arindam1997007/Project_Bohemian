import { Grid, GridItem, Link, Text } from "@chakra-ui/react"
import React from "react"
import { FiTwitter, FiInstagram, FiLinkedin } from "react-icons/fi"

function Footer(props) {
  return (
    <div style={{ marginTop: "auto" }}>
      <Grid
        backgroundColor="secondary.dark"
        w="100%"
        minH={{ base: "300px", md: "100px" }}
        // style={{ minHeight: "100px" }}
        color="font.secondary"
        templateColumns="repeat(4, 1fr)"
        // templateColumns={{ base: "repeat(1, 1fr)", md: "repeat(4, 1fr)" }}
        textAlign="center"
        // rowGap={15}
        paddingTop={3}
        // gap="1rem"
        // mt={5}
      >
        <GridItem
          colStart={{ md: "2" }}
          colEnd={{ md: "3" }}
          colSpan={{ base: "4" }}
          fontSize={{ base: "xl" }}
          // colStart={2} colEnd={3}
        >
          <Text color="font.secondary" opacity="0.6">
            STAY CONNECTED
          </Text>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "0.5rem",
            }}
          >
            <Link
              href="https://www.linkedin.com/in/arindam404/"
              isExternal
              display="block"
              width="-moz-fit-content"
              padding={1}
            >
              <FiLinkedin />
            </Link>
            <Link
              href="https://twitter.com/arindam_404"
              isExternal
              display="block"
              width="-moz-fit-content"
              padding={1}
            >
              <FiTwitter />
            </Link>
            <Link
              href="https://www.instagram.com/arindam_404/"
              isExternal
              display="block"
              width="-moz-fit-content"
              padding={1}
            >
              <FiInstagram />
            </Link>
          </div>
        </GridItem>
        <GridItem
          fontSize={{ base: "xl" }}
          colSpan={{ base: "4" }}
          colStart={{ md: "3" }}
          colEnd={{ md: "4" }}
          // colStart={3} colEnd={4}
        >
          <Text color="font.secondary" opacity="0.6">
            NEED ASSISTANCE?
          </Text>
          <Text color="font.secondary">
            <a href="tel:+917384390983">73843-90983</a>
          </Text>
          <Text color="font.secondary">
            <a href="mailto:arindam.webdeveloper@gmail.com">
              arindam.webdeveloper@gmail.com
            </a>
          </Text>
        </GridItem>
        <GridItem colSpan={4} pb={1} pt={3} fontSize="xl" opacity="0.6">
          "All images and content on this website are for educational purposes
          only. We do not claim ownership of any of the materials presented on
          this website, and we do not generate any revenue from them. If you are
          the owner of any of the copyrighted materials presented on this
          website and would like us to remove them, please contact us and we
          will do so immediately."
        </GridItem>
      </Grid>
    </div>
  )
}

export default Footer

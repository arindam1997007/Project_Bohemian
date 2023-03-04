import { Grid, GridItem } from "@chakra-ui/react"
import React from "react"
import ShopImage from "../shopDisplay/shopImage"

function ItemsList({ openItemModal, items }) {
  return (
    <div>
      <Grid templateColumns={{ base: "repeat(2, 1fr)", md: "repeat(4,1fr)" }}>
        {items.map((item, index) => {
          return (
            <GridItem
              w={{ base: "10em", md: "15em" }}
              h={{ base: "15em", md: "20em" }}
              //  w="15em" h="20em"
              key={index}
              cursor="pointer"
              m={5}
            >
              <ShopImage item={item} openItemModal={openItemModal} />
            </GridItem>
          )
        })}
      </Grid>
      {/* <Center>
        <Button mt={10} variant="filterButtonType1">
          Load More
        </Button>
      </Center> */}
    </div>
  )
}

export default ItemsList

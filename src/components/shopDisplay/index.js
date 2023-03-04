import { Box, Center, Heading, useDisclosure } from "@chakra-ui/react"
import React, { useEffect, useState } from "react"
import FilterProduct from "../filterProduct"
import ItemsList from "./../itemsList/index"
import ItemDisplay from "./../itemDisplay/index"
import {
  getPaginateProducts,
  getProductsEqualFilter,
} from "../../firebase/productFirebase"
import { PRODUCT_COLLECTION } from "./../../utils/DB_CONST"
import {
  ifArrayContains,
  ifContainCommonElement,
} from "./../../utils/arrayUtil"

function ShopDisplay(props) {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [items, setItems] = useState([])
  const [downloadedItems, setDownloadedItems] = useState([])
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    getInitialData()
  }, [])

  const getInitialData = async (orderName = "timeStamp", order = "desc") => {
    const items = await getPaginateProducts(
      PRODUCT_COLLECTION,
      orderName,
      order
    )
    setDownloadedItems(items)
    setItems(items)
  }
  // console.log(items);

  // const downloadItemsSizeFilter = async (filterState,sortBy)=>{
  //   let filter = [];
  //   console.log(Object.keys(filterState), filterState);
  //   if (filterState.size.length > 0) {
  //     filter.push({
  //       filterName: "size",
  //       operator: "array-contains-any",
  //       filterValues: filterState.size,
  //     });
  //   }
  //   if (filter.length) {
  //     const items = await getProductsEqualFilter(
  //       PRODUCT_COLLECTION,
  //       filter,
  //       sortBy.value,
  //       sortBy.order
  //     );
  //     setDownloadedItems(items);
  //     return items;
  //   }
  // }

  const sortItems = async (sortBy) => {
    const items = await getProductsEqualFilter(
      PRODUCT_COLLECTION,
      [],
      sortBy.value,
      sortBy.order
    )
    setDownloadedItems(items)
    return items
  }

  const filterItems = (items, filterState) => {
    const filteredItems = items
    let filterItems = filteredItems.filter((item) => {
      // Size is an array in item
      if (filterState["size"].length > 0) {
        if (!ifContainCommonElement(filterState["size"], item["size"]))
          return false
      }
      // Color is an array in item
      if (filterState["color"].length > 0) {
        if (!ifContainCommonElement(filterState["color"], item["color"]))
          return false
      }
      // Category is a string in item
      if (filterState["category"].length > 0) {
        if (!ifArrayContains(filterState["category"], item["category"]))
          return false
      }
      // Gender is a string in item
      if (filterState["gender"].length > 0) {
        if (!ifArrayContains(filterState["gender"], item["gender"]))
          return false
      }
      return true
    })

    setItems(filterItems)
    // return filteredItems;
  }

  const applyFilterSort = async (filterState, sortBy, sort = false) => {
    try {
      if (sort) {
        const items = await sortItems(sortBy)
        filterItems(items, filterState)
      } else {
        filterItems(downloadedItems, filterState)
      }
    } catch (error) {
      console.error(error)
    }
  }

  const openItemModal = (item) => {
    // console.log("selected", item);
    setSelectedItem(item)
    onOpen()
  }

  return (
    <>
      {selectedItem && isOpen ? (
        <ItemDisplay
          selectedItem={selectedItem}
          isOpen={isOpen}
          onClose={onClose}
        />
      ) : null}
      <Box mb={10} overflowX="hidden" paddingRight={1} paddingLeft={1}>
        <Center flexDirection="column">
          <Heading margin={10} minWidth="80vw" textAlign="right">
            OUR PRODUCTS
          </Heading>
          <Box minWidth="80vw" margin={{ base: 5, md: 10 }}>
            <FilterProduct
              setItems={setItems}
              applyFilterSort={applyFilterSort}
              getInitialData={getInitialData}
            >
              <ItemsList items={items} openItemModal={openItemModal} />
            </FilterProduct>
          </Box>
        </Center>
      </Box>
    </>
  )
}

export default ShopDisplay

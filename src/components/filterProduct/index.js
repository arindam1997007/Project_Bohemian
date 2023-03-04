import React, { useState, useReducer } from "react"
import "./index.css"
import FilterMenu from "./filterMenu"
import { filterReducer, initialFilter } from "../../reducer/filterReducer"
import { FILTER_REDUCER_CONST } from "../const/filterReducerConst"
import { FILTER_LABEL_REDUCER_MAP } from "./../../reducer/filterReducer"
import { Button, Flex, Box } from "@chakra-ui/react"
import SortMenu from "./sortMenu"

const sortByOptions = [
  { label: "Newest Arrivals", value: "timeStamp", order: "desc" },
  { label: "Price: Low to High", value: "price", order: "asc" },
  { label: "Price: High to Low", value: "price", order: "desc" },
]

function FilterProduct({ applyFilterSort, getInitialData, children }) {
  const [filterState, dispatchFilter] = useReducer(filterReducer, initialFilter)

  const [sortBy, setSortBy] = useState(sortByOptions[0])

  const onChangeSortBy = (e) => {
    setSortBy(e)
    applyFilterSort(filterState, e, true)
    // applyFilterSort(filterState, e);
  }

  return (
    <div>
      <Flex justifyContent="space-between">
        <Box
          display={{ base: "flex", md: "block" }}
          flexDirection={{ base: "column" }}
        >
          {FILTER_LABEL_REDUCER_MAP.map((item, index) => {
            return (
              <FilterMenu
                key={index}
                filterState={filterState}
                dispatch={dispatchFilter}
                filterStateKey={item.stateKey}
                buttonLabel={item.label}
                menuItem={item.dropdownItems}
              />
            )
          })}
          <div>
            <Button
              variant="filterButtonType1"
              onClick={() => {
                getInitialData()
                dispatchFilter({
                  type: FILTER_REDUCER_CONST.CLEAR_ALL_FILTER,
                })
              }}
            >
              CLEAR ALL
            </Button>
            <Button
              variant="filterButtonType1"
              onClick={() => applyFilterSort(filterState, sortBy)}
            >
              APPLY FILTERS
            </Button>
          </div>
        </Box>
        <div>
          <SortMenu
            selected={sortBy}
            onChange={onChangeSortBy}
            options={sortByOptions}
          />
        </div>
      </Flex>
      {/* {props.children} */}
      {children}
    </div>
  )
}

export default FilterProduct

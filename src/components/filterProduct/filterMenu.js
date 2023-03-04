import {
  Menu,
  MenuButton,
  MenuList,
  MenuItemOption,
  MenuOptionGroup,
  Button,
} from "@chakra-ui/react"
import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { FILTER_REDUCER_CONST } from "../const/filterReducerConst"

const FilterMenu = ({
  buttonLabel,
  menuItem,
  dispatch,
  filterStateKey,
  filterState,
}) => {
  return (
    <Menu closeOnSelect={false}>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            variant="filterMenuButtonDropdown"
            rightIcon={isOpen ? <BsChevronUp /> : <BsChevronDown />}
            w="fit-content"
          >
            {buttonLabel}
          </MenuButton>
          <MenuList minWidth="240px">
            <MenuItemOption
              value="clear"
              onClick={() =>
                dispatch({
                  type: FILTER_REDUCER_CONST.CLEAR_FILTER,
                  filterName: filterStateKey,
                })
              }
            >
              CLEAR
            </MenuItemOption>
            <MenuOptionGroup
              type="checkbox"
              value={filterState[filterStateKey]}
              onChange={(e) => {
                dispatch({
                  type: FILTER_REDUCER_CONST.CHANGE_FILTER,
                  filterName: filterStateKey,
                  payload: e,
                })
              }}
            >
              {menuItem.map((item) => {
                return (
                  <MenuItemOption key={item.value} value={item.value}>
                    {item.label}
                  </MenuItemOption>
                )
              })}
            </MenuOptionGroup>
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default FilterMenu

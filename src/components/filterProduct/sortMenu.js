import { BsChevronDown, BsChevronUp } from "react-icons/bs"
import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react"

const SortMenu = ({ selected, options, onChange }) => {
  return (
    <Menu>
      {({ isOpen }) => (
        <>
          <MenuButton
            as={Button}
            variant="filterMenuButtonDropdown"
            rightIcon={isOpen ? <BsChevronUp /> : <BsChevronDown />}
          >
            {selected?.label}
          </MenuButton>
          <MenuList>
            {options.map((option, i) => {
              return (
                <MenuItem
                  key={i}
                  onClick={() => {
                    onChange(option)
                  }}
                >
                  {option.label}
                </MenuItem>
              )
            })}
          </MenuList>
        </>
      )}
    </Menu>
  )
}

export default SortMenu

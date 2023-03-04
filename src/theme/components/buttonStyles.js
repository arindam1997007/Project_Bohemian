export const ButtonStyle = {
  // style object for base or default style
  baseStyle: {
    "&:focus": {
      boxShadow: "none",
    },
  },
  // styles for different sizes ("sm", "md", "lg")
  sizes: {},
  // styles for different visual variants ("outline", "solid")
  variants: {
    primary: {
      bg: "primary",
      color: "font.secondary",

      _hover: {
        bg: "#c0cacb",
        color: "secondary.dark",
      },
    },

    navButton: {
      color: "font.secondary",
      _hover: {
        bg: "secondary.medium",
      },
    },

    filterMenuButtonDropdown: {
      color: "font.primary",
      fontSize: "1em",
      fontWeight: "400",
      _hover: {
        borderBottom: "1px solid var(--chakra-colors-font-primary)",
        borderRadius: "0",
      },
      _focus: {
        boxShadow: "none",
      },
    },

    filterButtonType1: {
      fontSize: "0.8em",
      fontWeight: "300",
      padding: 2,
      margin: 2,
      textDecoration: "underline",
      background: "transparent",
      _hover: {
        background: "transparent",
      },
      _focus: {
        boxShadow: "none",
      },
      _active: {
        background: "transparent",
        fontSize: "0.7em",
      },
    },
  },
  // default values for 'size', 'variant' and 'colorScheme'
  defaultProps: {},
}

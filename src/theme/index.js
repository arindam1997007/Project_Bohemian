import { extendTheme } from "@chakra-ui/react"
import { ButtonStyle } from "./components/buttonStyles"
import { breakpoints } from "./breakpoints"
import { TableStyle } from "./components/tableStyle"

const theme = extendTheme({
  styles: {
    global: (props) => ({
      body: {
        background:
          "radial-gradient(circle, rgba(255,255,240,1) 0%, rgba(255,219,189,1) 100%, rgba(255,199,160,1) 100%, rgba(131,162,141,1) 100%)",
        color: "#A97155",
        fontWeight: 400,
        fontSize: "16px",
      },
      p: {
        color: "#00446e",
      },
      [`@media screen and (max-width: ${props.theme.breakpoints.md})`]: {
        body: {
          // fontWeight: 400,
          // fontSize: "13px",
        },
      },
    }),
  },
  fonts: {
    heading: "Dosis",
    body: "Dosis",
  },
  colors: {
    primary: "#4c6b73",
    secondary: {
      light: "#cde2e4",
      medium: "#6aa8ae",
      dark: "#2d4f53",
    },
    font: {
      primary: "#A97155",
      secondary: "#fee7e6",
      selected: "#eadeda",
    },
    error: "#ff0000",
  },
  breakpoints,
  components: {
    Button: ButtonStyle,
    Table: TableStyle,
  },
})
export default theme

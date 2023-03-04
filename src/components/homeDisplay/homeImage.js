import { Box, Center, Heading, Image } from "@chakra-ui/react"
import React from "react"

function HomeImage({ item, onOpen }) {
  return (
    <>
      <Box
        m="1rem"
        width={{ base: "75%", md: "32.5%" }}
        position="relative"
        overflow="hidden"
        borderRadius="5px"
        cursor="pointer"
        onClick={() => onOpen(item)}
      >
        <Image
          style={{ transition: "all .2s", aspectRatio: "1" }}
          _hover={{
            transform: "scale(1.5)",
          }}
          width="100%"
          src={item.thumbnail}
          objectFit="cover"
        />
        <Center
          color="font.secondary"
          style={{
            position: "absolute",
            textAlign: "center",
            bottom: "0",
            left: "0",
            width: "100%",
          }}
        >
          <Heading
            fontSize="3xl"
            width="100%"
            style={{
              padding: "15px",
              backgroundColor: "rgba(52, 52, 52, 0.8)",
            }}
          >
            {item.name}
          </Heading>
        </Center>
      </Box>
    </>
  )
}

export default HomeImage

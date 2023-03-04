import { Box, Flex, Image, Text } from "@chakra-ui/react";

const ShopImage = ({ item, openItemModal }) => {
  return (
    <>
      <Box overflow="hidden" width="100%" height="100%">
        <Image
          style={{ transition: "all .2s" }}
          _hover={{
            transform: "scale(1.5)",
          }}
          objectFit="cover"
          width="100%"
          height="100%"
          onClick={() => openItemModal(item)}
          src={item.thumbnail}
          // alt="Woman in saree"
        />
      </Box>
      <Flex justifyContent="space-between">
        <Text>{item.name}</Text>
        <Text>&#8377; {item.price}</Text>
      </Flex>
    </>
  );
};

export default ShopImage;

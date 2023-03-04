import {
  CloseButton,
  Flex,
  Image,
  Divider,
  Heading,
  Text,
} from "@chakra-ui/react";

const CartProduct = ({ product, removeItem }) => {
  return (
    <>
      <Flex mb={5} w="100%">
        <Image
          style={{
            borderRadius: "10px",
          }}
          maxWidth="8rem"
          maxHeight="8rem"
          width="100%"
          objectFit="cover"
          src={product.image}
        />
        <Flex ml={3} w="100%">
          <Flex flexDirection="column">
            <Heading size="md">{product.name}</Heading>
            <Text>{product.price}</Text>
            <Text>Color: {`${product.color.toUpperCase()}`}</Text>
            <Text>Size: {`${product.size.toUpperCase()}`}</Text>
            <Text>Quantity: {product.quantity}</Text>
          </Flex>
          <Heading size="md" marginLeft="auto">
            &#8377; {product.price * product.quantity}
          </Heading>
          <CloseButton ml={3} onClick={() => removeItem(product.id)} />
        </Flex>
      </Flex>
      <Divider
        width={{ base: "50vw", md: "100%" }}
        my={3}
        borderColor="black"
        opacity={0.5}
      />
    </>
  );
};

export default CartProduct;

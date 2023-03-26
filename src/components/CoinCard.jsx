import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";
import { Link } from "react-router-dom";

const CoinCard = ({ currencySymbol, ...props }) => {
  const { id, name, current_price: price, image, symbol } = props.coin;

  

  return (
    <Link to={`/coin/${id}`} rel="noreferrer">
      <VStack
        w={"56"}
        shadow={"lg"}
        p={"8"}
        borderRadius={"lg"}
        transition={"all 0.3s"}
        m={"4"}
        css={{
          "&:hover": {
            transform: "scale(1.1)",
          },
        }}
      >
        <Image
          src={image}
          width={"10"}
          height={"10"}
          objectFit={"contain"}
          alt="Exchange"
        />
        <Heading size={"md"} noOfLines={1}>
          {symbol}
        </Heading>
        <Text>{name}</Text>
        <Text>{price ? `${currencySymbol} ${price}` : "NA"}</Text>
      </VStack>
      
    </Link>
  );
};

export default CoinCard;

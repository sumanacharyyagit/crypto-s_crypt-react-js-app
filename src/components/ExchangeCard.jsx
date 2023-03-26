import { Heading, Image, Text, VStack } from "@chakra-ui/react";
import React from "react";

const ExchangeCard = (props) => {
  const { name, image, trust_score_rank: rank, url } = props.exchange;
  return (
    <a href={url} target="blank" rel="noreferrer">
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
          {rank}
        </Heading>
        <Text>{name}</Text>
      </VStack>
    </a>
  );
};

export default ExchangeCard;

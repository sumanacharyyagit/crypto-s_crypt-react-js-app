import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Container, HStack, Radio, RadioGroup } from "@chakra-ui/react";
import Loader from "./Loader";
import ErrorComponent from "./ErrorComponent";
import CoinCard from "./CoinCard";

const server = process.env.REACT_APP_SERVER;

const Coins = () => {
  const [coins, setCoins] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [currency, setCurrency] = useState("inr");
  const [page, setPage] = useState(1);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(
          `${server}/coins/markets?vs_currency=${currency}&page=${page}`
        );
        setCoins(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, [currency, page]);

  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";

  const pageChange = (page) => {
    setPage(page);
    setLoading(true);
  };

  const paginationBtns = new Array(132).fill(1);

  if (error) {
    return <ErrorComponent message={"Error while fetching Coins"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
            <HStack spacing={"4"}>
              <Radio value={"inr"}>INR(₹)</Radio>
              <Radio value={"eur"}>EUR(€)</Radio>
              <Radio value={"usd"}>USD($)</Radio>
            </HStack>
          </RadioGroup>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {coins.map((coin) => (
              <CoinCard
                key={coin.id}
                coin={coin}
                currencySymbol={currencySymbol}
              />
            ))}
          </HStack>
          <HStack w={"full"} overflowX={"auto"} p={"8"}>
            {paginationBtns.map((btn, index) => (
              <Button
                key={index}
                bgColor={"blackAlpha.800"}
                color={"white"}
                onClick={() => pageChange(index + 1)}
              >
                {index + 1}
              </Button>
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Coins;

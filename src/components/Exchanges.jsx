import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, HStack } from "@chakra-ui/react";
import Loader from "./Loader";
import ExchangeCard from "./ExchangeCard";
import ErrorComponent from "./ErrorComponent";

const server = process.env.REACT_APP_SERVER;

const Exchanges = () => {
  const [exchanegs, setExchanges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const { data } = await axios.get(`${server}/exchanges?per_page=250`);
        setExchanges(data);
      } catch (error) {
        console.log(error);
        setError(true);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (error) {
    return <ErrorComponent message={"Error while fetching Exchanges"} />;
  }

  return (
    <Container maxW={"container.xl"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <HStack wrap={"wrap"} justifyContent={"space-evenly"}>
            {exchanegs.map((exchange) => (
              <ExchangeCard key={exchange.id} exchange={exchange} />
            ))}
          </HStack>
        </>
      )}
    </Container>
  );
};

export default Exchanges;

import { useMoralisQuery } from "react-moralis";
import { getEllipsisTxt } from "../helpers/formatters";

const EventListener = () => {
  const { fetch } = useMoralisQuery(
    "NowOnSale",(query) => query,
    [],
    { autoFetch: false }
  );
  const { data } = useMoralisQuery("NowOnSale", (query) => query, [], {
    live: true,
  });

  const basicQuery = async () => {
    const results = await fetch();
    alert("Successfully retrieved " + results.length + " transfers.");
  };

  return(
    <div>
    <button onClick={basicQuery}>Call The Code</button>
    {data.map((event, key) => (
      <p>
        {getEllipsisTxt(event.attributes.transaction_hash, 14)}
      </p>
    ))}
    </div>
  );
};

export default EventListener
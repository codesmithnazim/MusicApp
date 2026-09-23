import { algoliasearch } from "algoliasearch";
import config from "../utils/config";

const algoliaClient = algoliasearch(
  config.ALGOLIA_APP_ID,
  config.ALGOLIA_WRITE_API_KEY,
);

export default algoliaClient;

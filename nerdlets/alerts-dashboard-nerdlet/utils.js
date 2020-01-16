import { NerdGraphQuery } from "nr1";

// search for entities by domain & account
export const EntitySearchByAccount = async (domain, accountId, cursor) => {
  console.log("EntitySearchByAccount : GRAPHQL STARTED");
  console.log(
    "EntitySearchByAccount : GRAPHQL STARTED WITH ACCOUNT: " + accountId
  );
  const gql = `
    {
		  actor {
		    entitySearch(query: "domain IN ('${domain}') AND (accountId='${accountId}')") {
		      count
		      query
		      results {
		        entities {
		          ... on ApmApplicationEntityOutline {
					name
					guid
		            alertSeverity
		          }
		        }
		      }
		    }
		  }
		}`;
  let result = await NerdGraphQuery.query({ query: gql });
  if (result.errors) {
    console.log(
      "Can't get reporting event types because NRDB is grumpy at NerdGraph.",
      result.errors
    );
    console.log(JSON.stringify(result.errors.slice(0, 5), 0, 2));
    return [];
  }
  console.log("EntitySearchByAccount: GRAPHQL RESULT " + result);
  return result;
};

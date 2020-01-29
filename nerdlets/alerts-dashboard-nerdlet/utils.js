import { NerdGraphQuery } from "nr1";
import gql from "graphql-tag";

export const nerdGraphQuery = async query => {
  const nerdGraphData = await NerdGraphQuery.query({
    query: gql`
      ${query}
    `
  });
  return nerdGraphData.data;
};

// search for entities by domain & account
export const EntitySearchByAccount = (accountId, cursor) => gql`{
		  actor {
		    entitySearch(query: "type IN ('APPLICATION', 'HOST', 'MONITOR') AND (accountId='${accountId}')") {
		      count
		      query
		      results${cursor ? `(cursor: "${cursor}")` : ""} {
		        entities {
					... on AlertableEntityOutline {
					  alertSeverity
					}
					name
					guid
					permalink
					type
					entityType
				}nextCursor
		      }
		    }
		  }
		}`;

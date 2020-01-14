import React from "react";
import { Stack, StackItem, Grid, GridItem } from "nr1";
import { EntitiesByDomainTypeQuery, NerdGraphQuery } from "nr1";
import { Card, Popup, Image, Statistic } from "semantic-ui-react";
import Critical from "./assets/CRITICAL.png";
import Warning from "./assets/WARNING.png";
import NotAlerting from "./assets/NOT_ALERTING.png";
import NotConfigured from "./assets/NOT_CONFIGURED.png";
import AccountPicker from "./account-picker.js";

export default class AlertsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      account: ""
    };
    this.setAlertsDashboardState = this.setAlertsDashboardState.bind(this);
  }

  componentDidMount() {
    // refresh every 15 seconds
    this.load();
    this.interval = setInterval(() => this.load(), 15000);
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  setAlertsDashboardState(data) {
    //debugger;
    console.log(">>", data.account.id);
    this.setState({ account: data.account.id });
  }

  async load() {
    //GraphQL
    const gql = `
    {
		  actor {
		    entitySearch(query: "(accountId = ${this.state.account}) AND domain IN ('APM')") {
		      count
		      query
		      results {
		        entities {
		          ... on ApmApplicationEntityOutline {
		            name
		            alertSeverity
		          }
		        }
		      }
		    }
		  }
		}`;
    let result = NerdGraphQuery.query({ query: gql });
    console.log("Result :", result);
    EntitiesByDomainTypeQuery.query({
      entityDomain: "APM",
      entityType: "APPLICATION"
    }).then(({ data }) => {
      console.log("DATA ENTITIES");
      console.log(data.entities);
      this.sortbySeverity(data.entities);
      this.setState({ entities: data.entities });
      console.log("STATE");
      console.log(this.state.entities);
    });
  }

  sortbySeverity(data) {
    var severtityOrder = [
      "CRITICAL",
      "WARNING",
      "NOT_ALERTING",
      "NOT_CONFIGURED"
    ];
    let sortedData = data.sort((a, b) => {
      return (
        severtityOrder.indexOf(a.alertSeverity) -
        severtityOrder.indexOf(b.alertSeverity)
      );
    });
    console.log("SORTED");
    console.log(sortedData);
  }

  setAnimation(alertSeverity) {
    if (alertSeverity == "CRITICAL") return "shake";
    else return "";
  }

  rendercards() {
    return (
      <div>
        <Card.Group style={{ margin: "auto", width: "100%" }} centered>
          {this.state.entities.map((entity, i) => {
            let appLink =
              "https://one.newrelic.com/redirect/entity/" + entity.guid;
            return (
              <Card
                color={this.setColor(entity.alertSeverity)}
                key={i}
                className={this.setAnimation(entity.alertSeverity)}
              >
                <Card.Content>
                  <Image
                    alt={entity.alertSeverity}
                    floated="right"
                    size="mini"
                    src={this.setLogo(entity.alertSeverity)}
                  />
                  <Card.Header>
                    {
                      <Popup
                        hoverable
                        position="top center"
                        content={
                          <a
                            href={appLink}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            {entity.name}
                          </a>
                        }
                        trigger={<h5>{entity.name}</h5>}
                      />
                    }
                  </Card.Header>
                </Card.Content>
              </Card>
            );
          })}
        </Card.Group>
      </div>
    );
  }

  setColor(alertSeverity) {
    switch (alertSeverity) {
      case "CRITICAL":
        return "red";
      case "NOT_ALERTING":
        return "green";
      case "NOT_CONFIGURED":
        return "grey";
      case "WARNING":
        return "orange";
      default:
        return "white";
    }
  }

  setLogo(alertSeverity) {
    switch (alertSeverity) {
      case "CRITICAL":
        return Critical;
      case "NOT_ALERTING":
        return NotAlerting;
      case "NOT_CONFIGURED":
        return NotConfigured;
      case "WARNING":
        return Warning;
      default:
        return "";
    }
  }

  renderCounts() {
    let counts = {
      CRITICAL: 0,
      WARNING: 0,
      NOT_ALERTING: 0,
      NOT_CONFIGURED: 0
    };
    return (
      <div>
        <Statistic.Group style={{ margin: "9px 15px 0px 0px" }}>
          {this.state.entities.map((entity, i) => {
            if (entity.alertSeverity == "CRITICAL") {
              counts.CRITICAL = counts.CRITICAL + 1;
            } else if (entity.alertSeverity == "WARNING") {
              counts.WARNING = counts.WARNING + 1;
            } else if (entity.alertSeverity == "NOT_ALERTING") {
              counts.NOT_ALERTING = counts.NOT_ALERTING + 1;
            } else {
              counts.NOT_CONFIGURED = counts.NOT_CONFIGURED + 1;
            }
          })}
          <Statistic color="red">
            <Statistic.Value>{counts.CRITICAL}</Statistic.Value>
            <Statistic.Label>Critical</Statistic.Label>
          </Statistic>
          <Statistic color="orange">
            <Statistic.Value>{counts.WARNING}</Statistic.Value>
            <Statistic.Label>Warning</Statistic.Label>
          </Statistic>
          <Statistic color="green">
            <Statistic.Value>{counts.NOT_ALERTING}</Statistic.Value>
            <Statistic.Label>Not Alerting</Statistic.Label>
          </Statistic>
          <Statistic color="grey">
            <Statistic.Value>{counts.NOT_CONFIGURED}</Statistic.Value>
            <Statistic.Label>Not Configured</Statistic.Label>
          </Statistic>
        </Statistic.Group>
      </div>
    );
  }

  render() {
    return (
      <>
        <Stack
          className="toolbar-container"
          fullWidth
          gapType={Stack.GAP_TYPE.NONE}
          horizontalType={Stack.HORIZONTAL_TYPE.FILL_EVENLY}
          verticalType={Stack.VERTICAL_TYPE.FILL}
        >
          <StackItem className="toolbar-section1">
            <Stack
              gapType={Stack.GAP_TYPE.NONE}
              fullWidth
              verticalType={Stack.VERTICAL_TYPE.FILL}
            >
              <StackItem className="toolbar-item has-separator">
                <AccountPicker
                  setAlertsDashboardState={this.setAlertsDashboardState}
                />
              </StackItem>
            </Stack>
          </StackItem>
          <StackItem className="toolbar-section2">
            <Stack
              fullWidth
              fullHeight
              verticalType={Stack.VERTICAL_TYPE.CENTER}
              horizontalType={Stack.HORIZONTAL_TYPE.RIGHT}
            >
              <StackItem>{this.renderCounts()}</StackItem>
            </Stack>
          </StackItem>
        </Stack>
        <Grid
          className="primary-grid"
          spacingType={[Grid.SPACING_TYPE.NONE, Grid.SPACING_TYPE.NONE]}
        >
          {/*
        Note: This sidebar does _not_ have to be a list of links/navigation.
        It can just as easily contain content. This is just an example of how it
        may be used.
      */}
          <GridItem className="primary-content-container" columnSpan={12}>
            <main className="primary-content full-height">
              {this.rendercards()}
            </main>
          </GridItem>
        </Grid>
      </>
    );
  }
}

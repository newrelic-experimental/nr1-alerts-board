import React from "react";
import { Stack, StackItem, Grid, GridItem } from "nr1";
import { EntitiesByDomainTypeQuery } from "nr1";
import { Card, Popup, Image } from "semantic-ui-react";
import Critical from "./assets/CRITICAL.png";
import Warning from "./assets/WARNING.png";
import NotAlerting from "./assets/NOT_ALERTING.png";
import NotConfigured from "./assets/NOT_CONFIGURED.png";
import AccountPicker from "./account-picker.js";

export default class AlertsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: []
    };
  }

  componentDidMount() {
    EntitiesByDomainTypeQuery.query({
      entityDomain: "APM",
      entityType: "APPLICATION"
    }).then(({ data }) => {
      console.log("DATA ENTITIES");
      console.log(data.entities);
      let sortedArray = this.sortbySeverity(data.entities);
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

  rendercards() {
    return (
      <div>
        <Card.Group style={{ margin: "auto", width: "100%" }} centered>
          {this.state.entities.map((entity, i) => {
            let appLink =
              "https://one.newrelic.com/redirect/entity/" + entity.guid;
            return (
              <Card color={this.setColor(entity.alertSeverity)} key={i}>
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
                  accountChangedCallback={this.onAccountSelected}
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
              <StackItem>
                <h1>this is placeholder</h1>
              </StackItem>
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

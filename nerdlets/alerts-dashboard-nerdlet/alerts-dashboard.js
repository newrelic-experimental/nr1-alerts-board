import React from "react";
import { Stack, StackItem, Grid, GridItem, Spinner } from "nr1";
import { Card, Popup, Image, Statistic } from "semantic-ui-react";
import AccountPicker from "./account-picker.js";
import { EntitySearchByAccount } from "./utils.js";
import { SemipolarLoading } from "react-loadingg";

import Critical from "./assets/CRITICAL.png";
import Warning from "./assets/WARNING.png";
import NotAlerting from "./assets/NOT_ALERTING.png";
import NotConfigured from "./assets/NOT_CONFIGURED.png";
import Ruby from "./assets/ruby.png";
import Php from "./assets/php.png";
import Java from "./assets/java.png";
import Dotnet from "./assets/dotnet.png";
import Python from "./assets/python.png";
import Nodejs from "./assets/nodejs.png";
import Go from "./assets/go.png";
import C from "./assets/c.png";

export default class AlertsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: [],
      account: "",
      selectedAccountId: undefined,
      loading: true
    };
    this.onAccountSelected = this.onAccountSelected.bind(this);
  }

  componentDidMount() {
    this.interval = setInterval(
      () => this._fetchData(this.state.selectedAccountId),
      1500000
    );
  }

  componentWillUnmount() {
    clearInterval(this.interval);
  }

  async onAccountSelected(accountId) {
    this.setState({
      selectedAccountId: accountId
    });
    this._fetchData(accountId);
  }

  async _fetchData(accountId) {
    let apm = EntitySearchByAccount("APM", accountId);
    Promise.all([apm]).then(values => {
      if (values["0"].data.actor.entitySearch.count != 0) {
        this.sortbySeverity(
          values["0"].data.actor.entitySearch.results.entities
        );
        this.setState({
          entities: values["0"].data.actor.entitySearch.results.entities,
          loading: false
        });
      } else {
        this.setState({
          entities: [],
          loading: false
        });
      }
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
  }

  setAnimation(alertSeverity) {
    if (alertSeverity == "CRITICAL") return "shake";
    else return "";
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

  rendercards() {
    if (this.state.loading) {
      return <SemipolarLoading color="#0189A4" />;
    } else {
      if (this.state.entities.length > 0) {
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
      } else {
        return (
          <div>
            <div className="ui message">
              <div className="header">
                What you can't see is what you can't measure!
              </div>
              <p>
                Currently there are no application instrumented or reporting on
                this account. Please instrument your apps with New Relic APM
                Agent.
              </p>
            </div>
            <h1>Get started with New Relic</h1>
            <br />
            <h3>Select a web agent to install.</h3>
            <div>
              <Image.Group size="small">
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#ruby"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={Ruby} />
                </a>
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#php"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={Php} />
                </a>
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#java"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={Java} />
                </a>
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#dotnet"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={Dotnet} />
                </a>
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#python"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={Python} />
                </a>
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#nodejs"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={Nodejs} />
                </a>
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#go"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={Go} />
                </a>
                <a
                  href={
                    "https://rpm.newrelic.com/accounts/" +
                    this.state.selectedAccountId +
                    "/applications/setup#c"
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Image src={C} />
                </a>
              </Image.Group>
            </div>
          </div>
        );
      }
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

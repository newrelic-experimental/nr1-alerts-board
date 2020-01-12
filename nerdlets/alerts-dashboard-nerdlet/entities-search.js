import React from "react";
import { EntitiesByDomainTypeQuery, EntitySearchQuery } from "nr1";
import { Card, Popup, Image } from "semantic-ui-react";
import Critical from "./assets/CRITICAL.png";
import Warning from "./assets/WARNING.png";
import NotAlerting from "./assets/NOT_ALERTING.png";
import NotConfigured from "./assets/NOT_CONFIGURED.png";

export default class AccountPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      entities: []
    };
    this.rendercards = this.rendercards.bind(this);
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

  // componentDidMount() {
  //   EntitySearchQuery.query({
  //     filters: [
  //       {
  //         type: EntitySearchQuery.FILTER_TYPE.TAG,
  //         value: { key: "language", value: "java" }
  //       }
  //     ]
  //   }).then(({ data }) => {
  //     console.log(data.entities);
  //     this.setState({ entities: data.entities });
  //     console.log("State: " + this.state.entities);
  //   });
  // }

  // async componentWillUnmount() {
  //   clearInterval(this.refereshInterval);
  // }

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
    return <>{this.rendercards()}</>;
  }
}

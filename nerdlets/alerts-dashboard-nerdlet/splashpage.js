import React from "react";
import { Image } from "semantic-ui-react";

import Ruby from "./assets/ruby.png";
import Php from "./assets/php.png";
import Java from "./assets/java.png";
import Dotnet from "./assets/dotnet.png";
import Python from "./assets/python.png";
import Nodejs from "./assets/nodejs.png";
import Go from "./assets/go.png";
import C from "./assets/c.png";

export default class SplashPage extends React.Component {
  render() {
    const accountId = this.props.selectedAccountId;
    return (
      <>
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
                  accountId +
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
                  accountId +
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
                  accountId +
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
                  accountId +
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
                  accountId +
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
                  accountId +
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
                  accountId +
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
                  accountId +
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
      </>
    );
  }
}

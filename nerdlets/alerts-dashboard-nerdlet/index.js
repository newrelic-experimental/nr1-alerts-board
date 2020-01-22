import React from "react";
import { NerdletStateContext, PlatformStateContext, AutoSizer } from "nr1";
import AlertsDashboard from "./alerts-dashboard";
// import Test from "./test-dashboard";

// https://docs.newrelic.com/docs/new-relic-programmable-platform-introduction

export default class Root extends React.Component {
  render() {
    return (
      <PlatformStateContext.Consumer>
        {launcherUrlState => (
          <NerdletStateContext.Consumer>
            {nerdletUrlState => (
              <AutoSizer>
                {({ width, height }) => (
                  <AlertsDashboard
                    launcherUrlState={launcherUrlState}
                    nerdletUrlState={nerdletUrlState}
                    width={width}
                    height={height}
                  />
                )}
              </AutoSizer>
            )}
          </NerdletStateContext.Consumer>
        )}
      </PlatformStateContext.Consumer>
    );
  }
}

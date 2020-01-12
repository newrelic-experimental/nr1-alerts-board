import React from "react";
import { Stack, StackItem, Grid, GridItem } from "nr1";
import AccountPicker from "./account-picker.js";
import EntitySearch from "./entities-search.js";
export default class AlertsDashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

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
              <EntitySearch></EntitySearch>
            </main>
          </GridItem>
        </Grid>
      </>
    );
  }
}

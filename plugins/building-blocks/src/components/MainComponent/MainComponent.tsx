import React from 'react';
import { Typography, Grid, Table } from '@material-ui/core';
import {
  InfoCard,
  Header,
  Page,
  Content,
  ContentHeader,
  HeaderLabel,
  SupportButton,
} from '@backstage/core-components';
import { TableComponent } from '../TableComponent';

export const MainComponent = () => (
  <Page themeId="tool">
    <Header title="CI Workflows" subtitle="Optional subtitle">
      <HeaderLabel label="Owner" value="Team X" />
      <HeaderLabel label="Lifecycle" value="Alpha" />
    </Header>
    <Content>
      <ContentHeader title="Reusable Building Blocks!">
        <SupportButton>A description of your plugin goes here.</SupportButton>
      </ContentHeader>
      <Grid container spacing={3} direction="column">
        <Grid item>
          <TableComponent />
        </Grid>
      </Grid>
    </Content>
  </Page>
);

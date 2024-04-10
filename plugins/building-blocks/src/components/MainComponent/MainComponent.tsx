import { Typography, Grid, Table } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
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

export const MainComponent = () => { 

  const [buildingBlocks, setBuildingBlocks] = useState([]);

  useEffect(() => {
    fetch('http://localhost:7007/api/blocks/building-blocks')
      .then((response) => response.json())
      .then((data) => setBuildingBlocks(data))
      .catch((error) => console.error('Error fetching building blocks:', error));
  }, []);

  return (
    <Page themeId="tool">
      <Header title="CI Workflows" subtitle="Optional subtitle">
        <HeaderLabel label="Owner" value="Team X" />
        <HeaderLabel label="Lifecycle" value="Alpha" />
      </Header>
      <Content>
        <ContentHeader title="Reusable Building Blocks!">
          <SupportButton>A description of your plugin goes here.</SupportButton>
        </ContentHeader>
        <Typography variant="h1">{buildingBlocks}</Typography>
        <Grid container spacing={3} direction="column">
          <Grid item>
            <TableComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};
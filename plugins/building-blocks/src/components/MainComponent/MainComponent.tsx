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
import { useApi, configApiRef } from '@backstage/core-plugin-api';

export const MainComponent = () => {
  const [buildingBlocks, setBuildingBlocks] = useState([]);
  const config = useApi(configApiRef);
  const backendUrl = config.getString('backend.baseUrl');

  useEffect(() => {
    fetch(`${backendUrl}/api/blocks/building-blocks`)
      .then(response => response.json())
      .then(data => {
        console.log('Building blocks:', data);
        setBuildingBlocks(data);
      })
      .catch(error => console.error('Error fetching building blocks:', error));
  }, [backendUrl]); // Depend on `backendUrl` to re-fetch if the config changes

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
        <Grid container spacing={3}>
          {buildingBlocks.map((block, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <InfoCard title={block.name} subheader={block.description}>
                <Typography variant="body1">{`ID: ${block}`}</Typography>
                {/* You can include more block details here */}
              </InfoCard>
            </Grid>
          ))}
        </Grid>

        <Grid container spacing={3} direction="column">
          <Grid item>
            <TableComponent />
          </Grid>
        </Grid>
      </Content>
    </Page>
  );
};

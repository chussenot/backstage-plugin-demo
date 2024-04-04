import React from 'react';
import { createDevApp } from '@backstage/dev-utils';
import { buildingBlocksPlugin, BuildingBlocksPage } from '../src/plugin';

createDevApp()
  .registerPlugin(buildingBlocksPlugin)
  .addPage({
    element: <BuildingBlocksPage />,
    title: 'Root Page',
    path: '/building-blocks',
  })
  .render();

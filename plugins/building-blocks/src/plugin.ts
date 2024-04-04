import {
  createPlugin,
  createRoutableExtension,
} from '@backstage/core-plugin-api';

import { rootRouteRef } from './routes';

export const buildingBlocksPlugin = createPlugin({
  id: 'building-blocks',
  routes: {
    root: rootRouteRef,
  },
});

export const BuildingBlocksPage = buildingBlocksPlugin.provide(
  createRoutableExtension({
    name: 'BuildingBlocksPage',
    component: () =>
      import('./components/ExampleComponent').then(m => m.ExampleComponent),
    mountPoint: rootRouteRef,
  }),
);

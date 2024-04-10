import {
  coreServices,
  createBackendPlugin,
} from '@backstage/backend-plugin-api';
import { createRouter } from './service/router';

/**
 * buildingBlocksPlugin backend plugin
 *
 * @public
 */
export const buildingBlocksPlugin = createBackendPlugin({
  pluginId: 'blocks',
  register(env) {
    env.registerInit({
      deps: {
        httpRouter: coreServices.httpRouter,
        logger: coreServices.logger,
      },
      async init({ httpRouter, logger }) {
        httpRouter.use(
          await createRouter({
            logger,
          }),
        );
        httpRouter.addAuthPolicy({
          path: '/health',
          allow: 'unauthenticated',
        });
        httpRouter.addAuthPolicy({
          path: '/building-blocks',
          allow: 'unauthenticated',
        });
      },
    });
  },
});

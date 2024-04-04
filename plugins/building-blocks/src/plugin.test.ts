import { buildingBlocksPlugin } from './plugin';

describe('building-blocks', () => {
  it('should export plugin', () => {
    expect(buildingBlocksPlugin).toBeDefined();
  });
});

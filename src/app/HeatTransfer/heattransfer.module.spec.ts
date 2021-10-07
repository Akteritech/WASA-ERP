import { HeattransferModule } from './heattransfer.module';

describe('HeattransferModule', () => {
  let offsetModule: HeattransferModule;

  beforeEach(() => {
    offsetModule = new HeattransferModule();
  });

  it('should create an instance', () => {
    expect(offsetModule).toBeTruthy();
  });
});

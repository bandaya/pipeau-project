import { CloudwatchLogViewerPipe } from './cloudwatch-log-viewer.pipe';

describe('CloudwatchLogViewerPipe', () => {
  it('create an instance', () => {
    const pipe = new CloudwatchLogViewerPipe();
    expect(pipe).toBeTruthy();
  });
});

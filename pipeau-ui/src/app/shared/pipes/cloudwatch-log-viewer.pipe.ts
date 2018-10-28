import {Pipe, PipeTransform} from '@angular/core';
import {ExecutionLogDescriptor} from "../models/ExecutionLogDescriptor";

@Pipe({
  name: 'cloudwatchLogViewer'
})
export class CloudwatchLogViewerPipe implements PipeTransform {

  transform(value: ExecutionLogDescriptor, args?: any): any {
    console.log(JSON.stringify(value))
    //https://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logEventViewer:group=/aws/lambda/pipeau-lambda-1;stream=2018/10/24/[$LATEST]939cce94919548129598a33db470db60;start=2018-10-23T20:55:49Z
    return "http://eu-west-1.console.aws.amazon.com/cloudwatch/home?region=eu-west-1#logEventViewer:group="
      + value.logGroup
      + ";stream=" + value.logStream
      + ";start=" + this.toISOString(value.start)
      + value.end?";end=" + this.toISOString(value.end):"";
  }

  private toISOString(timestamp): string {
    return new Date(timestamp).toISOString();
  }

}

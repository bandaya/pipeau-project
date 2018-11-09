import {Injectable} from '@angular/core';
import * as AWS from "aws-sdk";
import {GetLogEventsRequest, GetLogEventsResponse} from "aws-sdk/clients/cloudwatchlogs";
import {
  CommonPrefix,
  GetObjectOutput,
  GetObjectRequest,
  ListObjectsV2Output,
  ListObjectsV2Request,
  Object
} from "aws-sdk/clients/s3";
import {LogConfiguration} from "../../shared/models/LogConfiguration";
import {ExecutionLogDescriptor} from "../../shared/models/ExecutionLogDescriptor";

@Injectable({
  providedIn: 'root'
})
export class LogsService {

  constructor(private configuration: LogConfiguration) {
  }

  /**
   * Get execution logs descriptor names
   */
  getExecutionLogsDescriptorIds(): Promise<ExecutionLogDescriptor[]> {
    let s3 = new AWS.S3()
    let request: ListObjectsV2Request = {
      Bucket: this.configuration.bucket,
      Prefix: this.configuration.bucketPath,
      Delimiter: '/',
      //ContinuationToken: token,
      MaxKeys: 100
    }
    let i = s3.listObjectsV2(request).promise()
      .then((res: ListObjectsV2Output) => {
        let promises: Promise<ExecutionLogDescriptor>[]
          =
          res.CommonPrefixes
            .map((value: CommonPrefix) => {
              let requestId: string =
                value.Prefix
                  .replace(this.configuration.bucketPath, "")
                  .replace('/', '')
              return this.getExecutionLogDescriptor(requestId)
            });
        return Promise.all(promises)
      });

    return i;
  }

  getExecutionLogDescriptor(requestId: string): Promise<ExecutionLogDescriptor> {
    let s3 = new AWS.S3()
    let request: ListObjectsV2Request = {
      Bucket: this.configuration.bucket,
      Prefix: this.configuration.bucketPath + requestId + '/',
      //ContinuationToken: token,
      MaxKeys: 100
    }

    return s3.listObjectsV2(request).promise()
      .then((res: ListObjectsV2Output) => {
        //ensure CommonPrefixes is empty
        //format:
        //@@logGroup@@logStream@@timestamp
        let desc: ExecutionLogDescriptor = new ExecutionLogDescriptor();
        console.log("got " + res.Contents.length + " results for " + requestId)
        let start = res.Contents[0];
        let key = start.Key
          .replace(this.configuration.bucketPath + requestId + "/", "")
        let tokens = key.split('@@')
        desc.requestId = requestId;
        desc.logGroup = tokens[1];
        desc.logStream = tokens[2];
        desc.start = +tokens[3];
        if (res.Contents.length > 1) {
          desc.end = +res.Contents[res.Contents.length - 1].Key
            .replace(this.configuration.bucketPath + requestId + "/", "")
            .split('@@')[3];
        }
        return desc
      });
  }


  readLog() {
    let cloudwatch = new AWS.CloudWatchLogs();
    return cloudwatch.getLogEvents(this.createGetLogEventsRequest()).promise()
  }

  private createGetLogEventsRequest() {
    let request: GetLogEventsRequest = {
      logGroupName: "/aws/lambda/pipeau-lambda-1",
      logStreamName: "2018/10/21/[$LATEST]49260f6b43504c878591af04ab8ff3df",
      startFromHead: false,
      startTime: 1540134308464,
      endTime: 1540134314473 + 1
    };
    return request;
  }
}

import {Component, OnInit} from '@angular/core';
import * as AWS from 'aws-sdk';
import {InvocationRequest, InvocationResponse} from "aws-sdk/clients/lambda";
import {GetLogEventsRequest, GetLogEventsResponse} from "aws-sdk/clients/cloudwatchlogs";
import {LogsService} from "../../core/services/logs.service";
import {AWSError} from "aws-sdk";
import {ExecutionLogDescriptor} from "../../shared/models/ExecutionLogDescriptor";

@Component({
  selector: 'app-lambdas',
  templateUrl: './lambdas.component.html',
  styleUrls: ['./lambdas.component.css']
})
export class LambdasComponent implements OnInit {

  public lambdaExecutionResult: any;
  public lambda_log_events: any[] = [];
  public lambda_logs = ""
  public executionDescriptors: ExecutionLogDescriptor[];

  constructor(private logsService: LogsService) {
  }

  ngOnInit() {
    console.log(`1 and 1 make ${1 + 1}`);
    this.logsService.getExecutionLogsDescriptorIds()
      .then(e => {
        this.executionDescriptors = e;
      })
  }


  public loadSomeLogs(): void {
    this.lambda_logs = ""
    this.lambda_log_events = []
    this.logsService.readLog()
      .then((data: GetLogEventsResponse) => {
        for (let event of data.events) {
          console.log(event);
          this.lambda_logs += event.message + '<br>';
        }
        this.lambda_log_events = this.lambda_log_events.concat(data.events);
      }).catch((error: AWSError) => {
      console.log(error);
    });

    let request: GetLogEventsRequest = {
      logGroupName: "/aws/lambda/pipeau-lambda-1",
      logStreamName: "2018/10/21/[$LATEST]49260f6b43504c878591af04ab8ff3df",
      startFromHead: false,
      startTime: 1540134308464,
      endTime: 1540134314473 + 1,
    };


  }

  public executeLambda(): void {
    let lambda = new AWS.Lambda();

    /**Function name - pipeau-lambda-1
     Function ARN - arn:aws:lambda:eu-west-1:159215624086:function:pipeau-lambda-1
     Partial ARN - 159215624086:function:pipeau-lambda-1
     *
     * ClientContext: test/myappl
     *  ClientContext JSON must be base64-encoded and has a maximum size of 3583 bytes.
     * InvocationType: DryRun / RequestResponse / Event
     * LogType: Tail / None
     * Payload: the event
     *  JSON that you want to provide to your Lambda function as input.
     * Qualifier:
     *  Specify a version or alias to invoke a published version of the function.
     *
     */

//    let invocation = new Lambda.Types.
    let invocation: InvocationRequest = {
      ClientContext: null,
      FunctionName: "arn:aws:lambda:eu-west-1:159215624086:function:pipeau-lambda-1",
//      InvocationType : "RequestResponse",
      InvocationType: "Event",
      LogType: "Tail",
      Qualifier: null,
      Payload: null
    }
    let outerThis = this;
    lambda.invoke(invocation, function (err: AWS.AWSError, data: InvocationResponse) {
      console.log(this);
      let requestId = this.requestId;
      if (data) {
        console.log(data);
        outerThis.lambdaExecutionResult = data
      }
      if (err) {
        outerThis.lambdaExecutionResult = err
        console.error(err);
      }

    })
  }


}

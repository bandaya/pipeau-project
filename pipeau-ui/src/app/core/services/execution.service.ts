import {Injectable} from '@angular/core';
import * as AWS from "aws-sdk";
import {
  GetExecutionHistoryInput,
  GetExecutionHistoryOutput,
  HistoryEvent,
  HistoryEventList
} from "aws-sdk/clients/stepfunctions";
import {from, Observable} from 'rxjs';
import {pluck, concatAll} from 'rxjs/operators';
import StepFunctions from "aws-sdk/clients/stepfunctions";
import * as StepFunctions from "aws-sdk/clients/stepfunctions";

@Injectable({
  providedIn: 'root'
})
export class ExecutionService {

  constructor() {
  }

  getExecutionHistory(executionArn): Observable<HistoryEvent> {
    let sf = new StepFunctions({apiVersion: '2016-11-23'});
    var request: GetExecutionHistoryInput = {
      executionArn: executionArn,
      maxResults: 1000,//0 is default (100), 1000 max
      //nextToken: nextToken,
      //depends on how to visualize...
      reverseOrder: false
    };
    
    //sf.getExecutionHistory(request).createReadStream().
    return from(sf.getExecutionHistory(request).promise())
      .pipe(
        pluck('events'),
        concatAll()
      );
  }


}

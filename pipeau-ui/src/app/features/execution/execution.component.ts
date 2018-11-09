import { Component, OnInit } from '@angular/core';
import {ExecutionService} from "../../core/services/execution.service";
import {HistoryEvent} from "aws-sdk/clients/stepfunctions";

@Component({
  selector: 'app-execution',
  templateUrl: './execution.component.html',
  styleUrls: ['./execution.component.css']
})
export class ExecutionComponent implements OnInit {

  public events:HistoryEvent[] = []
  constructor(private service:ExecutionService) { }

  ngOnInit() {
    var arn:string = "arn:aws:states:eu-west-1:159215624086:execution:test-sm:cc5789f5-72e6-a914-f4d5-a6bf21844023";
    this.service.getExecutionHistory(arn)
      .subscribe(
        null,
        (val:HistoryEvent)=>{
          this.events.concat(val);
        }
      );
  }

}

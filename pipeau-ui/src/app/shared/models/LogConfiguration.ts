import {Injectable} from "@angular/core";

@Injectable({
  providedIn: 'root'
})
export class LogConfiguration {
  public bucket:String = "bandaya-pipeau-dev";
  public bucketPath:String = "dev/lambda_executions/";

}

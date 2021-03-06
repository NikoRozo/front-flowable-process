import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { RequestModel } from '../request/requestModel';
import { TaskModel } from '../inbox/taskModel';
import { DetailModel } from '../detail/detailModel';
import { ApprovedModel } from '../detail/approvedModel';

@Injectable({
  providedIn: 'root'
})
export class RequestService {

  private urlEndPoint = 'http://localhost:8080';

  private httpHeaders = new HttpHeaders({'Content-Type': 'application/json'});

  constructor(private http: HttpClient,
              private router: Router) { }

  startProcess(requestModel: RequestModel): Observable<RequestModel> {
    return this.http.post(`${this.urlEndPoint}/process`, requestModel, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.requestModel as RequestModel),
      catchError(e => {

        if (e.status === 400) {
          console.log(e)
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  completeTaskById(id: string, approved: ApprovedModel): Observable<any> {
    return this.http.post(`${this.urlEndPoint}/complete?taskid=${id}`, approved, {headers: this.httpHeaders}).pipe(
      map((response: any) => response.requestModel as any),
      catchError(e => {

        if (e.status === 400) {
          console.log(e)
          return throwError(e);
        }

        console.error(e.error.mensaje);
        swal.fire(e.error.mensaje, e.error.error, 'error');
        return throwError(e);
      })
    );
  }

  getTasks(id: string): Observable<any> {
    return this.http.get(`${this.urlEndPoint}/tasks?assignee=${id}`).pipe(
      map((response: any) => {
        (response as TaskModel[])
        .map( task => {
          return task;
        });
        return response;
      })
    );
  }

  getTaskDeatil(id: string): Observable<DetailModel> {
    return this.http.get<DetailModel>(`${this.urlEndPoint}/tasks/task?id=${id}`);
  }

}

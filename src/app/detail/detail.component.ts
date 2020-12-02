import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DetailModel } from '../detail/detailModel';
import { ApprovedModel } from './approvedModel';
import { RequestService } from '../service/request.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.css']
})
export class DetailComponent implements OnInit, OnDestroy {

  title = 'Detalle de la Tarea';
  taskId: any;
  private sub: any;
  errors: string[];
  ask: string;
  detail: DetailModel = new DetailModel();
  approved: ApprovedModel = new ApprovedModel();

  constructor(private requestService: RequestService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.sub = this.activatedRoute.params.subscribe(params => {
      console.log(params);
      this.activatedRoute.paramMap.subscribe(paramsD => {
        this.requestService.getTaskDeatil(params.id).subscribe(
          response => {
            this.detail = response as DetailModel;
            this.assigTaskID(params);
            console.log(response);
          }
        );
      });
    });

  }

  // tslint:disable-next-line: typedef
  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  assigTaskID(id: any): void {
    this.taskId = id;
    console.log(this.taskId);
    console.log(this.taskId.id);
  }

  complete(): void{
    this.approved.approved = this.ask === 'true';
    console.log(this.approved.approved);
    this.requestService.completeTaskById(this.taskId.id, this.approved).subscribe(
      request => {
        this.router.navigate(['/']);
        swal.fire('Tarea Completada',  `La Tarea ${this.taskId.id} fue Completada`,  'success');
      },
      err => {
        this.errors = err.error.errors as string[];
        // console.error('Código del error desde el backend: ' + err.status);
        // console.error(err.error.errors);
      }
    );
  }

  cancel(): void{
    this.router.navigate(['/inbox']);
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RequestModel } from './requestModel';
import { RequestService } from '../service/request.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-request',
  templateUrl: './request.component.html',
  styleUrls: ['./request.component.css']
})
export class RequestComponent implements OnInit {

  title = 'Solicitud de Vacaciones';
  holRequest: RequestModel = new RequestModel();
  errors: string[];

  constructor(private requestService: RequestService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
  }

  startProcess(): void {
    this.requestService.startProcess(this.holRequest).subscribe(
      request => {
        this.router.navigate(['/']);
        swal.fire('Nuevo Caso',  `Caso asigando al usuario ${this.holRequest.assignee}`,  'success');
      },
      err => {
        this.errors = err.error.errors as string[];
      }
    );
  }

}

import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskModel } from './taskModel';
import { RequestService } from '../service/request.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-inbox',
  templateUrl: './inbox.component.html',
  styleUrls: ['./inbox.component.css']
})
export class InboxComponent implements OnInit {

  tasks: TaskModel[];

  constructor(private requestService: RequestService,
              private router: Router,
              private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe(params => {
      this.requestService.getTasks('1').subscribe(
        response => {
          this.tasks = response as TaskModel[];
          console.log(response);
        }
      );
    });
  }

}

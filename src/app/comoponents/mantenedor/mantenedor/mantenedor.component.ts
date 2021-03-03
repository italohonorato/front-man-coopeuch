import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Tarea } from 'src/app/interfaces/tarea';
import { MantenedorService } from 'src/app/services/mantenedor.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';


export interface DialogData {
  animal: string;
  name: string;
}

@Component({
  selector: 'app-mantenedor',
  templateUrl: './mantenedor.component.html',
  styleUrls: ['./mantenedor.component.css']
})
export class MantenedorComponent implements OnInit, AfterViewInit {

  public idTask;
  displayedColumns: string[] = ['id', 'descripcion', 'fechaCreacion', 'vigente', 'opciones'];
  dataSource;
  taskForm = this.fb.group({
    id: 0,
    descripcion: ['', Validators.required],
    vigente: [false, Validators.required],
  });

  get id() { return this.taskForm.get('id'); }
  get descripcion() { return this.taskForm.get('descripcion'); }
  get vigente() { return this.taskForm.get('vigente'); }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild('closebutton', { static: true }) closebutton;

  constructor(
    private mantenedorService: MantenedorService,
    private fb: FormBuilder,
    private modalService: NgbModal) { }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  ngOnInit() {
    this.getAllTaks();
  }

  getAllTaks() {
    this.mantenedorService.listTasks()
      .subscribe(response => {
        console.log(response);
        this.dataSource = new MatTableDataSource<Tarea>(response);
        this.dataSource.paginator = this.paginator;
      }, error => console.log('Error al obtener lista de Tareas'));
  }

  editTask(task: Tarea) {
    this.idTask = task.id;
    this.taskForm.patchValue({
      id: task.id,
      descripcion: task.descripcion,
      vigente: task.vigente
    });

    document.getElementById('openModalButton').click();
  }

  update() {
    const taskUpadeted: Tarea = {
      id: this.taskForm.get('id').value as number,
      descripcion: (this.taskForm.get('descripcion').value as string).toUpperCase().trim(),
      vigente: this.taskForm.get('vigente').value as boolean
    };

    this.mantenedorService.editTask(taskUpadeted).subscribe(response => {
      this.closebutton.nativeElement.click();
      this.getAllTaks();
      this.resetTaskForm();

      Swal.fire({
        icon: 'success',
        title: 'Edición Tarea',
        text: 'Tarea editada con éxito!'
      });
    },
      error => {
        this.closebutton.nativeElement.click();
        this.resetTaskForm();
        Swal.fire({
          icon: 'error',
          title: 'Error Actualización',
          text: 'Ha ocurrido un error al actualizar Tarea!',
          footer: '<a href>Why do I have this issue?</a>'
        });
      });
  }

  deleteTask(id: number) {
    Swal.fire({
      title: 'Estás seguro?',
      text: 'Esta acción no podrá ser revertida!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '&nbsp;&nbsp;&nbsp;&nbsp;Si&nbsp;&nbsp;&nbsp;&nbsp;',
      cancelButtonText: '&nbsp;&nbsp;&nbsp;&nbsp;No&nbsp;&nbsp;&nbsp;&nbsp;'
    }).then((result) => {
      if (result.isConfirmed) {
        this.mantenedorService.deleteTask(id).subscribe(response => {
          this.closebutton.nativeElement.click();
          this.getAllTaks();
          Swal.fire(
            'Tarea Eliminada!',
            'La Taea seleccionada ha sido eliminda',
            'success'
          );
        });
      }
    });
  }

  saveTask() {
    const task: Tarea = {
      descripcion: (this.taskForm.get('descripcion').value as string).toUpperCase().trim(),
      vigente: this.taskForm.get('vigente').value,
    };

    this.mantenedorService.saveTask(task).subscribe(response => {
      this.closebutton.nativeElement.click();
      this.getAllTaks();
      this.resetTaskForm();
      Swal.fire(
        'Mantenedor Tareas',
        'Tarea Creada!',
        'success'
      );
    },
      error => {
        this.resetTaskForm();
        this.closebutton.nativeElement.click();
        Swal.fire({
          icon: 'error',
          title: 'Ha ocurrido un error al crear Tarea!',
          text: error.message
        });
      });
  }

  resetTaskForm() {
    this.idTask = null;
    this.taskForm.patchValue({
      id: null,
      descripcion: [''],
      vigente: false,
    });
  }

}

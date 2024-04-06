import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmployeeService } from '../employee.service';
import { Employee, Gender } from '../employee.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-show-employee',
  // standalone: true,
  // imports: [],
  templateUrl: './show-employee.component.html',
  styleUrl: './show-employee.component.scss'
})
export class ShowEmployeeComponent{
  constructor(@Inject(MAT_DIALOG_DATA) public employee : any,private dialogRef: MatDialogRef<ShowEmployeeComponent>){}

genders=Gender;
closeDialog() {
  this.dialogRef.close();
}
}

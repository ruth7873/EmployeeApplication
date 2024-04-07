import { Component } from '@angular/core';
import { MatRadioChange } from '@angular/material/radio';
import { Employee } from '../../models/employee.model';
import { AppService } from '../../../../app.service';

@Component({
  selector: 'app-filter',
  standalone: false,
  // imports: [],
  templateUrl: './filter.component.html',
  styleUrl: './filter.component.scss'
})
export class FilterComponent {
  selectedValue: any;
  inputToFilter: string = '';
  employees: Employee[];
  employees2: Employee[];
  constructor(private _appService: AppService) {
    this.employees = this._appService.getAllEmployees();
    // this.employees2 = this._appService.getAllEmployees()
  }
  onSelectionChange(event: MatRadioChange) {
    this.selectedValue = event.value;
    this.filter()
  }
  // filter() {
  //   const searchTerm = this.inputToFilter.toLowerCase();
  //   this.employees = this.employees2.filter(emp =>
  //     (this.selectedValue == undefined || emp.gender == this.selectedValue) &&
  //     (emp.firstName.includes(this.inputToFilter) ||
  //       emp.lastName.includes(this.inputToFilter) ||
  //       emp.identificationNumber.includes(this.inputToFilter) ||
  //       emp.gender.toString().includes(this.inputToFilter) ||
  //       emp.roles.some(r => r.role.roleName.toLowerCase().includes(searchTerm)))
  //   );
  //   this._appService.setEmployees(this.employees);
  // }

  filter() {
    this.employees = this._appService.filterEmployees(this.selectedValue, this.inputToFilter);
    this._appService.setEmployees(this.employees)
  }
}

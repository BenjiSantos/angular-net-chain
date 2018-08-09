import { Component, OnInit, NgZone } from '@angular/core';
import { NgForm } from '@angular/forms'

import { EmployeeService } from '../shared/employee.service'
import { ContractsService } from '../shared/contracts.service'
import { ToastrService } from 'ngx-toastr'

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  public balance: number;
  public account: any;
  public accounts: any;
  public result: any;
  public resultGet: any;

  constructor(private employeeService: EmployeeService, private toastr: ToastrService,
              private web3Service: ContractsService, private _ngZone: NgZone) {
  }

  ngOnInit() {
    this.resetForm();
  }

  setUser(employeeId: number, firstName: string, lastName: string, empCode: string,
          position: string, office: string) {
    // Get the initial account balance so it can be displayed.
    this.web3Service.setUser(employeeId,firstName,lastName,empCode,position,office).subscribe(result => {
      this.result = result;
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
       this.result = result
      );
    }, err => alert(err))
  };

  getUser() {
    // Get the initial account balance so it can be displayed.
    this.web3Service.getUser().subscribe(result => {
      this.resultGet = result;
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
        this.resultGet = result
      );
    }, err => alert(err))
  };


  onReady = () => {

    // Get the initial account balance so it can be displayed.
    this.web3Service.getAccounts().subscribe(accs => {
      this.accounts = accs;
      // This is run from window:load and ZoneJS is not aware of it we
      // need to use _ngZone.run() so that the UI updates on promise resolution
      this._ngZone.run(() =>
        this.account = this.accounts[0]
      );
    }, err => alert(err))
  };

  resetForm(form?: NgForm) {
    if (form != null)
      form.reset();
    this.employeeService.selectedEmployee = {
      EmployeeID: null,
      FirstName: '',
      LastName: '',
      EmpCode: '',
      Position: '',
      Office: ''
    }
  }

  onSubmit(form: NgForm) {
    this.setUser(form.controls['EmployeeID'].value == null ? 0 : form.controls['EmployeeID'].value, form.controls['FirstName'].value,
      form.controls['LastName'].value, form.controls['Position'].value, form.controls['EmpCode'].value,
      form.controls['Office'].value);
    this.onReady();
    this.getUser();
    if (form.value.EmployeeID == null) {
      this.employeeService.postEmployee(form.value).subscribe(data => {
          this.resetForm(form);
          this.employeeService.getEmployeeList();
          this.toastr.success('New Record Added Succcessfully', 'Employee Register');
        })
    }
    else {
      this.employeeService.putEmployee(form.value.EmployeeID, form.value)
      .subscribe(data => {
        this.resetForm(form);
        this.employeeService.getEmployeeList();
        this.toastr.info('Record Updated Successfully!', 'Employee Register');
      });
    }
  }
}

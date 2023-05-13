import { Component, ElementRef, ViewChild } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/compat/database';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable, finalize } from 'rxjs';

interface User {
  firstname: string;
  contactnumber: string;
  regno: string;
  vehiclemodel: string; 
  vehiclecost: number;
  loantype: string;
  address: string;
  birthday: Date;
  aadhar: File;
  pan: File;
  addressproof: File;
  bescom: File;
  workingid: File;
  salaryslip: File;
  vehicledelivery: File;
}

@Component({
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.css']
})
export class SalesComponent {
  
  form!: FormGroup;
  user: User;
  selectedFile: File;
  fb1: any;
  downloadURL: Observable<string>;
  
  constructor(private fb: FormBuilder, private db: AngularFireDatabase, private storage: AngularFireStorage) {
    this.user = {} as User;
    this.form = this.fb.group({
      firstname: [null, Validators.compose([Validators.pattern(/^(?:[a-zA-Z\s]+)?$/), Validators.required, Validators.minLength(6), Validators.maxLength(25)])],
      contactnumber: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)])),
      regno: [null, Validators.compose([Validators.pattern(/^(?:[a-zA-Z0-9\s]+ )?$/), Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      vehiclemodel:[null, Validators.compose([Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/), Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      vehiclecost: [null, Validators.compose([Validators.pattern(/^(?:[0-9\s]+)?$/), Validators.required, Validators.minLength(1), Validators.maxLength(10)])],
      loantype: [null],
      address: [null, Validators.compose([Validators.pattern(/^(?:[_a-zA-Z0-9\s]+)?$/), Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      birthday: [null]
    });
    this.user = this.form.value;
  }
  
  get f() {
    return this.form.controls;
  }
  
  get firstname() {
    return this.form.get('firstname')!;
  };
  
  get contactnumber() {
    return this.form.get('contactnumber')!;
  }
  
  get regno() {
    return this.form.get('regno')!;
  }
  
  get vehiclemodel() {
    return this.form.get('vehiclemodel')!;
  }
  
  get vehiclecost() {
    return this.form.get('vehiclecost')!;
  }
  
  get loantype() {
    return this.form.get('loantype')!;
  }
  
  get address(){
    return this.form.get('address')!;
  }
  
  get birthday(){
    return this.form.get('birthday')!;
  }
  
  get aadhar(){
    return this.form.get('aadhar');
  }
  
  public inputValidator(event: any) {
    const pattern = /^[0-9]*$/;   
    if (!pattern.test(event.target.value)) {
      event.target.value = event.target.value.replace(/[^0-9]/g, "");
    }
  }
  
  onClickSubmit()
  {
    this.user = this.form.value;
    console.log("this.user", this.user.aadhar);
    
    // var body = {
    //   "firstName": this.user.firstname,
    //   "contactNumber": this.user.contactnumber,
    //   "registrationNumber": this.user.regno,
    //   "vehicleModel": this.user.vehiclemodel,
    //   "vehiclecost": this.user.vehiclecost,
    //   "vehicletype": this.user.loantype
    // }
    
    // console.log("Body", body);
    //   const ref = this.db.list("salesData");
    //   ref.push(body).then((response) =>{
    //     console.log("Response", response);
    //   }).catch((error)=>{
    //     console.log("Error", error);
    //   })
  }
  
  onFileSelected(event: any) {
    
    console.log("event", event.target.files[0].name);
    var n = event.target.files[0].name;
    const file = event.target.files[0];
    const filePath = `Sales/${n}`;
    const fileRef = this.storage.ref(filePath);
    console.log("fileRef", fileRef);
    const task = this.storage.upload(`Sales/${n}`, file);
    task
    .snapshotChanges()
    .pipe(
      finalize(() => {
        this.downloadURL = fileRef.getDownloadURL();
        this.downloadURL.subscribe(url => {
          if (url) {
            this.fb1 = url;
          }
          console.log("this.fb1", this.fb);
        });
      })
      )
      .subscribe(url => {
        if (url) {
          console.log("url", url);
        }
      });
    }
  }
  
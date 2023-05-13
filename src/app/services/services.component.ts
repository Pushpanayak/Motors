import { Component } from '@angular/core';
import { AngularFireModule} from '@angular/fire/compat'
import { AngularFireDatabase, AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

interface User {
  firstname: string;
  lastname: string;
  country: string;
  contactnumber: string;
  address: string;
  vehicletype: string;
  regno: string;
  vehiclemodel: string;
  query:string;
}

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.css']
})
export class ServicesComponent {

  title = 'customer_contact';
  
  form!: FormGroup;
  user: User;
  
  constructor(private fb: FormBuilder, private db: AngularFireDatabase) {
    this.user = {} as User;
    this.form = this.fb.group({
      firstname: [null, Validators.compose([Validators.pattern(/^(?:[a-zA-Z\s]+)?$/), Validators.required, Validators.minLength(6), Validators.maxLength(25)])],
      lastname: [null, Validators.compose([Validators.pattern(/^(?:[a-zA-Z\s]+)?$/), Validators.required, Validators.minLength(1), Validators.maxLength(1)])],
      contactnumber: new FormControl(null, Validators.compose([Validators.required, Validators.maxLength(10), Validators.pattern(/^[6-9]\d{9}$/)])),
      address: [null, Validators.compose([Validators.pattern(/^(?:[_a-zA-Z0-9\s]+)?$/), Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      regno: [null, Validators.compose([Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/), Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      vehiclemodel: [null, Validators.compose([Validators.pattern(/^(?:[a-zA-Z0-9\s]+)?$/), Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      query: [null, Validators.compose([Validators.pattern(/^(?:[_a-zA-Z0-9\s]+)?$/), Validators.required, Validators.minLength(10), Validators.maxLength(50)])],
      vehicletype:[null],
      country:[null]
    });
    this.user = this.form.value;
  }
  
  get f() {
    return this.form.controls;
  }
  
  get firstname() {
    return this.form.get('firstname')!;
  };
  
  get lastname() {
    return this.form.get('lastname')!;
  }
  
  get county() {
    return this.form.get('country')!;
  }
  
  get contactnumber() {
    return this.form.get('contactnumber')!;
  }
  
  get address() {
    return this.form.get('address')!;
  }
  
  get vehicletype() {
    return this.form.get('vehicletype')!;
  }
  
  get regno() {
    return this.form.get('regno')!;
  }
  
  get vehiclemodel() {
    return this.form.get('vehiclemodel')!;
  }
  
  get query() {
    return this.form.get('query')!;
  }
  
  onClickSubmit()
  {
    this.user = this.form.value;
    // console.log("this.user", this.user.firstname);
    
    var body = {
      "firstName": this.user.firstname,
      "lastName": this.user.lastname,
      "country": this.user.country,
      "contactNumber": this.user.contactnumber,
      "address": this.user.address,
      "vehicleType": this.user.vehicletype,
      "registrationNumber": this.user.regno,
      "vehicleModel": this.user.vehiclemodel,
      "query": this.user.query
    }
    
    console.log("Body", body);
    const ref = this.db.list("salesData");
    ref.push(body).then((response) =>{
      console.log("Response", response);
    }).catch((error)=>{
      console.log("Error", error);
    })
  }

}

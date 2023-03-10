import { DataListService } from './../data-list.service';
import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor(public alertCtrl: AlertController, public d: DataListService) { }

  // handing fields

  my_fields_list = '';

  // to show the fields or field
  count_fields = 0;
  show_field = '';

  massage = '';




  async showAlert() {
    // alert('massage')

    this.d.fields_of_interests.forEach(f => {
      if (f.checked == true) {
        this.my_fields_list += "<li> " + f.val + "</li>";
        this.d.my_fields.push(f.val);
        this.count_fields++;
      };
    });

    (this.count_fields > 1) ? this.show_field = 'Fields' : this.show_field = 'Field';
    // this.name != null ? this.massage += `Name: ${this.name}<br>` : this.massage += 'Please fill name'

    let x = await this.alertCtrl.create({
      header: 'Assignment 1',
      subHeader: 'The member of the following information:',
      message: `
      Name: ${this.d.name}<br>
      Age: ${this.d.age}<br>
      Gender: ${this.d.gender}<br>

      Contact information: <br>
      Phone: ${this.d.phone}<br>
      Email: ${this.d.email}<br>

      Membership Type: ${this.d.membership_type} <br>

      ${this.show_field} of interest:  ${this.my_fields_list} `
    });

    this.my_fields_list = '';
    this.count_fields = 0;
    x.present();
    this.d.list.push(
      {
        name: this.d.name,
        age: this.d.age,
        gender: this.d.gender,
        phone: this.d.phone,
        email: this.d.email,
        membership_type: this.d.membership_type,
        my_fields: this.d.my_fields,
      })
  }
}

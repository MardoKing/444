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

  name;
  age;
  gender;

  // contact information
  phone;
  email;

  // membership type
  membership_types = ['Weakly', 'Monthly', 'Free Time']
  membership_type;

  fields_of_interests = [
    { val: "Watercolor and gouache", checked: false },
    { val: "Sketching and drawing", checked: false },
    { val: "Mixed media", checked: false },
    { val: "Art journaling", checked: false }
  ]


  my_fields = '';

  // to show the fields or field
  count_fields = 0;
  show_field = '';

  massage = '';




  async showAlert() {
    // alert('massage')

    this.fields_of_interests.forEach(f => {
      if (f.checked == true) {
        this.my_fields += "<li> " + f.val + "</li>";
        this.count_fields++;
      };
    });

    (this.count_fields > 1) ? this.show_field = 'Fields' : this.show_field = 'Field';
    // this.name != null ? this.massage += `Name: ${this.name}<br>` : this.massage += 'Please fill name'

    let x = await this.alertCtrl.create({
      header: 'Assignment 1',
      subHeader: 'The member of the following information:',
      message: `
      Name: ${this.name}<br>
      Age: ${this.age}<br>
      Gender: ${this.gender}<br>

      Contact information: <br>
      Phone: ${this.phone}<br>
      Email: ${this.email}<br>

      Membership Type: ${this.membership_type} <br>

      ${this.show_field} of interest:  ${this.my_fields} `
    });

    this.my_fields = '';
    this.count_fields = 0;
    this.d.list.push(
      {
        name: this.name,
        age: this.age,
        gender: this.gender,
        phone: this.phone,
        email: this.email,
        membership_type: this.membership_type,
        my_fields: this.my_fields,
      })
    x.present();
  }
}

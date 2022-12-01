import { Injectable, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';

export interface Student {
  name: string,
  age: string,
  gender: string,
  phone: string,
  email: string,
  membership_type: string,
  my_fields: string[]
}


@Injectable({
  providedIn: 'root'
})
export class DataListService {

  constructor(public alertCtrl: AlertController) { }

  public current_student: Student = {
    name: '',
    age: '',
    gender: '',
    phone: '',
    email: '',
    membership_type: '',
    my_fields: []
  };

  // membership type
  public membership_types = ['Weekly', 'Monthly', 'Free Time']

  // fields of interest
  public fields_of_interests = [
    { val: "Watercolor and gouache", checked: false },
    { val: "Sketching and drawing", checked: false },
    { val: "Mixed media", checked: false },
    { val: "Art journaling", checked: false }
  ]

  public list: Student[] =
    [
      { name: "Ahmed", age: "20", gender: "Male", phone: "33334444", email: "example2.ex", membership_type: "Free Time", my_fields: ["Watercolor and gouache"] },
      { name: "Ali", age: "22", gender: "Male", phone: "35552223", email: "example3.ex", membership_type: "Weekly", my_fields: ["Mixed media", "Watercolor and gouache"] },
      { name: "Jojo", age: "24", gender: "Female", phone: "35566223", email: "example1.ex", membership_type: "Monthly", my_fields: ["Mixed media"] }
    ]

  // ------------ handing alert massage
  private my_fields_list = '';

  // to show the fields or field
  private count_fields = 0;
  private show_field = '';
  // ------------  end of handing alert massage

  // show alert when item clicked, used in tab1 (search member)
  async showAlert(member: Student) {

    // create field of interest HTML list
    member.my_fields.forEach(f => {
      this.my_fields_list += "<li> " + f + "</li>";
      this.count_fields++;
    });

    // single or pupilar
    (this.count_fields > 1) ? this.show_field = 'Fields' : this.show_field = 'Field';

    // alert massage
    let x = await this.alertCtrl.create({
      header: 'Assignment 1',
      subHeader: 'The member of the following information:',
      message: `
      Name: ${member.name}<br>
      Age: ${member.age}<br>
      Gender: ${member.gender}<br>

      Contact information: <br>
      Phone: ${member.phone}<br>
      Email: ${member.email}<br>

      Membership Type: ${member.membership_type} <br>

      ${this.show_field} of interest:  ${this.my_fields_list} `
    });

    this.my_fields_list = '';
    this.count_fields = 0;
    x.present();
  }

  async addWithAlert() {
    // add checked fields_of_interests to my_fields
    this.fields_of_interests.forEach(f => {
      if (f.checked == true) {
        this.current_student.my_fields.push(f.val);
      };
    });
    this.showAlert(this.current_student);
    this.list.push(this.current_student);
    // cleanup
    this.current_student = {
      name: '',
      age: '',
      gender: '',
      phone: '',
      email: '',
      membership_type: '',
      my_fields: []
    };
    this.fields_of_interests.forEach(f => {
      if (f.checked == true) {
        f.checked = false;
      };
    });
  }

}
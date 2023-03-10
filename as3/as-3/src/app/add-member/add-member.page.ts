import { DataListService } from './../data-list.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.page.html',
  styleUrls: ['./add-member.page.scss'],
})
export class AddMemberPage implements OnInit {

  constructor(public d: DataListService) { }

  addWithAlert() {
    this.d.addWithAlert();
  }
  ngOnInit() {
  }

}

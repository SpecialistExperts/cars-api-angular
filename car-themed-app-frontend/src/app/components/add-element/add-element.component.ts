import { OrdersService } from '@service/orders.service';
import { SharedDataService } from '@service/shared-data.service';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DealersService } from '@service/dealers.service';
import { Title } from '@model/title.enum';

@Component({
  selector: 'app-add-element',
  templateUrl: './add-element.component.html',
  styleUrls: ['./add-element.component.less'],
})
export class AddElementComponent implements OnInit {
  @Input('formsName') formsName;
  @Input('displayForms') displayForms;
  @Output() showForms = new EventEmitter();
  formGroup: FormGroup;
  title: string;

  constructor(
    private dealerService: DealersService,
    private sharedDataService: SharedDataService,
    private orderService: OrdersService
  ) {
    this.sharedDataService._title.subscribe((res: any) => {
      this.title = res;
    });
  }

  ngOnInit() {}

  public removeLastChar(title: string) {
    return title.slice(0, -1);
  }

  public checkError = (
    data: FormGroup,
    controlName: string,
    errorName: string
  ) => {
    return data.controls[controlName].hasError(errorName);
  };

  displayForm() {
    this.showForms.emit(true);
    switch (this.title) {
      case Title.Dealers:
        this.formGroup = new FormGroup({
          name: new FormControl('', [Validators.required]),
          address: new FormControl('', [Validators.required]),
          postalCode: new FormControl('', [Validators.required]),
          country: new FormControl('', [Validators.required]),
        });
        break;
      case Title.Orders:
        this.formGroup = new FormGroup({
          components: new FormControl('', [Validators.required]),
          orderDate: new FormControl('', [Validators.required]),
          dealerId: new FormControl('', [Validators.required]),
        });
        break;
    }
    this.displayForms = true;
  }

  hideForm() {
    this.showForms.emit(false);
    this.displayForms = false;
  }

  sendData(data: FormGroup) {
    const obj: { [k: string]: any } = {};
    for (var i = 0; i < this.formsName.length; i++) {
      obj[this.formsName[i]] = data.get(this.formsName[i]).value;
    }

    if (obj.dealerId) {
      obj.dealerId = parseInt(obj.dealerId);
    }

    switch (this.title) {
      case Title.Dealers:
        this.addDealer(obj);
        break;
      case Title.Orders:
        this.addOrder(obj);
        break;
    }
  }

  addDealer(dealer) {
    this.dealerService.add(dealer).subscribe(() => {});
  }

  addOrder(order) {
    this.orderService.add(order).subscribe(() => {});
  }
}

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the ReservationPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-reservation',
  templateUrl: 'reservation.html',
})
export class ReservationPage {

  	reservation: FormGroup;

  	constructor(public navCtrl: NavController,
  	            public navParams: NavParams,
  	            public viewCtrl: ViewController,
  	            private formBuilder: FormBuilder) {
  		this.reservation = this.formBuilder.group({
        	guests: 3,
        	smoking: false,
        	dateTime: ['', Validators.required],
      	});
  	}

  	ionViewDidLoad() {
    	console.log('ionViewDidLoad ReservationPage');
  	}

  	dismiss() {
  		this.viewCtrl.dismiss();
  	}
  	onSubmit() {
    	console.log(this.reservation.value);
    	this.viewCtrl.dismiss();
  	}


}

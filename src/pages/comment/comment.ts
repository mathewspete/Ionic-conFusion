import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

/**
 * Generated class for the CommentPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-comment',
  templateUrl: 'comment.html',
})
export class CommentPage {


  commentForm: FormGroup;

    constructor(public navCtrl: NavController,
                public navParams: NavParams,
                public viewCtrl: ViewController,
                private formBuilder: FormBuilder) {
      this.commentForm = this.formBuilder.group({
        author: ["", Validators.required],
        rating: [5, Validators.required],
        comment: ["", Validators.required],
        date: "",
        });
    }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CommentPage');
  }

  dismiss() {
    this.viewCtrl.dismiss();
  }

  onSubmit() {
    console.log(this.commentForm);
    this.commentForm.value.date = new Date().toISOString();
    console.log(this.commentForm);
    this.viewCtrl.dismiss(this.commentForm.value);
  }

}
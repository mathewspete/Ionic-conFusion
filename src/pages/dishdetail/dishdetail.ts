import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { CommentPage } from '../../pages/comment/comment';

/**
 * Generated class for the DishdetailPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-dishdetail',
  templateUrl: 'dishdetail.html',
})
export class DishdetailPage {
  dish: Dish;
  errMess: string;
  avgstars: string;
  numcomments: number;
  favorite: boolean = false;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private favoriteservice: FavoriteProvider,
              private toastCtrl: ToastController,
              private actionSheetCtrl: ActionSheetController,
              private modalCtrl: ModalController,
              @Inject('BaseURL') private BaseURL) {
    let total = 0;
    this.dish = this.navParams.get('dish');
    this.favorite = this.favoriteservice.isFavorite(this.dish.id);
    this.numcomments = this.dish.comments.length;
    //get total
    this.dish.comments.map((comment) => { total +=  comment.rating; });
    //get avg starts
    this.avgstars = (total/this.numcomments).toFixed(2);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad DishdetailPage');
  }

  addToFavorites() {
    console.log("adding to favorites", this.dish.id);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
        message: this.dish.name + " added as a favorite!",
        duration: 3000,
        position: 'middle',
      })
      .present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Available Actions',
      buttons: [
        {
          text: 'Add to Favorites',
          handler: () => addToFavorites()
        },
        {
          text: 'Add a Comment',
          handler: () => {
            console.log('Add a Comment clicked');
            let commentmodal = this.modalCtrl.create(CommentPage);
            commentmodal.present();
            commentmodal.onDidDismiss( data => {
              if (!data) return;
                this.dish.comments.push(data);
            });
          }

        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: () => {
            console.log('Cancel clicked');
          }
        }
      ]
    });

    actionSheet.present();
  } 

}
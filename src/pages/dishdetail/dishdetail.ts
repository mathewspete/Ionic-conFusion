import { Component, Inject } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController, ActionSheetController, ModalController } from 'ionic-angular';
import { FavoriteProvider } from '../../providers/favorite/favorite';
import { Dish } from '../../shared/dish';
import { Comment } from '../../shared/comment';
import { CommentPage } from '../../pages/comment/comment';
import { SocialSharing } from '@ionic-native/social-sharing';

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
              private socialSharing: SocialSharing,
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
    console.log("adding to favorites", this.dish.name);
    this.favorite = this.favoriteservice.addFavorite(this.dish.id);
    this.toastCtrl.create({
        message: this.dish.name + " added as a favorite!",
        duration: 3000,
        position: 'middle',
      })
      .present();
  }

  openComment() { let modal = this.modalCtrl.create(CommentPage);
    modal.onDidDismiss((item) => {
      if(item){
        this.dish.comments.push(item);
      }
    });
    modal.present();
  }

  presentActionSheet() {
    let actionSheet = this.actionSheetCtrl.create({
      title: 'Select Action',
      buttons: [
        {
          text: 'Share via Facebook',
          handler: () => {
            this.socialSharing.shareViaFacebook(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Facebook'))
              .catch(() => console.log('Failed to post to Facebook'));
          }
        },
        {
          text: 'Share via Twitter',
          handler: () => {
            this.socialSharing.shareViaTwitter(this.dish.name + ' -- ' + this.dish.description, this.BaseURL + this.dish.image, '')
              .then(() => console.log('Posted successfully to Twitter'))
              .catch(() => console.log('Failed to post to Twitter'));
          }
        },
        {
          text: 'Add to Favorites',
          handler: () => {this.addToFavorites();}
        },
        {
          text: 'Add a Comment',
          handler: () => {
            this.openComment();
            console.log('Add a Comment clicked');
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
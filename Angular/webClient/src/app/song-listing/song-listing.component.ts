import { Component, OnInit } from '@angular/core';
import { SongListingService } from '../song-listing.service';
import { AuthService } from '../auth.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-song-listing',
  templateUrl: './song-listing.component.html',
  styleUrls: ['./song-listing.component.css']
})
export class SongListingComponent implements OnInit {

  logo : string = "/assets/images/Music-design.jpg"
  songList: Array<any>;
  title; genre; song: any;
  newSongForm: FormGroup;
  show: any = 5;
  
  isSubmitted  =  false;

  constructor(public songListingService: SongListingService, public auth: AuthService, private formBuilder: FormBuilder, private router:Router) 
  {
    songListingService.retrieveAllSongs("","").subscribe((data: any) => this.songList = data);
   }

  ngOnInit(): void {
    this.newSongForm  =  this.formBuilder.group({
      user: this.auth.getUser(),
      genre: ['', Validators.required],
      coverArt: [''],
      title: ['', Validators.required],
      artiste: ['', Validators.required],
      lyrics: ['', Validators.required]
    });
  }


  public Filter(title, genre){
    if(this.title == "" && genre ==""){
      this.songListingService.retrieveAllSongs("","").subscribe((data:any) => this.songList = data);
    }
    else{
      this.songListingService.retrieveAllSongs(title, genre).subscribe((data: any) => this.songList = data);
    }
  }

  public Scroll(){
    var element = document.getElementById("songlist");
    element.scrollIntoView({behavior: "smooth"});
  }

  public showMoreItems()
   {
      this.show = Number(this.show) + 5;        
   }

  public onAdd(){
    this.songListingService.addNewSong(this.newSongForm.value).subscribe(res => {
      console.log('Song Created');
      location.reload();
    })
  }

  public unauthorisedText(){
    alert("Please log in or register first.");
  }

  public logout(){
    this.auth.logout();
  }

}

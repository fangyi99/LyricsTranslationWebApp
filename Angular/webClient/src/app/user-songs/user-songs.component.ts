import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { SongListingService } from '../song-listing.service';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-songs',
  templateUrl: './user-songs.component.html',
  styleUrls: ['./user-songs.component.css']
})
export class UserSongsComponent implements OnInit {

  logo : string = "/assets/images/Music-design.jpg"
  profilePic : string = "/assets/images/profile-pic.png"
  coverArt: string = "/assets/images/coverArt.jpg"
  songList: any;
  tempSong:any;
  newSongForm: FormGroup;
  updateSongForm: FormGroup;

  constructor(public songService: SongListingService, public auth: AuthService, private formBuilder: FormBuilder, private router: Router) { 
    songService.retrieveUserSongs().subscribe((data: any) => this.songList = data);
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

    this.updateSongForm = this.formBuilder.group({
      id: [''],
      user: this.auth.getUser(),
      genre: ['',Validators.required],
      coverArt: [''],
      title: ['', Validators.required],
      artiste: ['', Validators.required],
      lyrics: ['', Validators.required]
    });
  }

  public viewProfile()
  {
    console.log(this.auth.getUser());
    this.router.navigateByUrl('/44382/gateway/accounts/'+ this.auth.getUser());
  }

  public viewAllAccounts(){
    this.router.navigateByUrl('/44382/gateway/accounts');
  }

  public onAdd(){
    this.songService.addNewSong(this.newSongForm.value).subscribe(res => {
      console.log('Song Created');
      location.reload();
    })
  }

  public onDeleteModal(song){
    this.tempSong = song;
  }

  public onDelete(){
    this.songService.deleteSongById(this.tempSong).subscribe(res => {
      console.log('Song Deleted');
      location.reload();
    })
  }

  public onUpdateModal(song) {
    this.updateSongForm.patchValue(song);
  }

  public onUpdate(){
    this.songService.updateSongById(this.updateSongForm.value).subscribe(res => {
      console.log('Song Updated');
      location.reload();
    }) 
  }

  public logout(){
    this.auth.logout();
  }
}

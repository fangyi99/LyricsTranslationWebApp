import { Component, OnInit } from '@angular/core';
import { SongListingService } from '../song-listing.service';
import { FormBuilder, FormGroup, Validators } from  '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../auth.service'

@Component({
  selector: 'app-song-details',
  templateUrl: './song-details.component.html',
  styleUrls: ['./song-details.component.css']
})
export class SongDetailsComponent implements OnInit {

  logo : string = "/assets/images/Music-design.jpg"
  song: any;
  updateSongForm: FormGroup;
  outputLanguage: string;
  translatedText: string;

  constructor(public songListingService: SongListingService, private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router, public auth:AuthService) { 
    songListingService.retrieveSongById(this.route.snapshot.params.id).subscribe((data: any) => this.song = data);
  }

  ngOnInit(): void {

    this.updateSongForm = this.formBuilder.group({
      id: [''],
      user:[this.auth.getUser],
      coverArt: [''],
      title: ['', Validators.required],
      artiste: ['', Validators.required],
      lyrics: ['', Validators.required],
      genre: ['']
    });
  }

  public confirmUser(){
    if(this.auth.getUser() == this.song.user){
      return true;
    }
    else{
      return false;
    }
  }

  public unauthorisedText(){
    if(this.auth.getUser()!= null){
      console.log("No access");
      alert("Restricted! You are not the original creator of this song.");
    }
    else {
      console.log("Not logged in");
      alert("Please log in or register first.");
    }
  }

  public onDelete(){
    this.songListingService.deleteSongById(this.song).subscribe(res => {
      console.log('Song Deleted');
      this.router.navigate(['/']);
    })
  }

  public onUpdateModal(song) {
    this.updateSongForm.patchValue(song);
  }

  public onUpdate(){
    this.songListingService.updateSongById(this.updateSongForm.value).subscribe(res => {
      console.log('Song Updated');
      location.reload();
    }) 
  }

    public onTranslate(selectedItem){
      this.outputLanguage = selectedItem.target.value;
      this.songListingService.translateText(this.outputLanguage, [{"Text":this.song.lyrics}]).subscribe((res:any)=>{
      this.translatedText = res[0].translations[0].text;
      })
    }

    public logout(){
      this.auth.logout();
    }

}

import { Component, Inject, OnInit } from '@angular/core';
import { Cat } from '../shared/cat';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService } from '../services/cat.service';
import { HttpEventType, HttpResponse } from '@angular/common/http';
import { FileUploadService } from '../services/file-upload.service';


@Component({
  selector: 'app-edit-cat',
  templateUrl: './edit-cat.component.html',
  styleUrls: ['./edit-cat.component.css']
})
export class EditCatComponent implements OnInit{
  cat!: Cat;
  vaccinationsCat!: String;
  //Variable to track loading state
  isLoading: boolean = false;
 
  /* upload file*/
  selectedFiles?: FileList;
  currentFile?: File;
  progress = 0;
  message = '';
  constructor(
  private router: Router,
  private catService: CatService,
  private route: ActivatedRoute,
  private fileUploadService: FileUploadService,
  @Inject('BaseURL') public baseUrl: string) { }
ngOnInit(): void {
  this.route.paramMap.subscribe(
    result => {
      let id = result.get('id');
      if (id != "-1") this.initCat(id);
      else this.cat = new Cat(null,"","","",0,[],false);
    }
  )
}
initCat(id:any) {
   this.catService.getCatById(id).subscribe(cat => {
      this.cat = cat,
        this.vaccinationsCat = cat.vaccinations.join(",")
    });

}
onSubmit() {

  // Convertir vaccinationscat en tableau de chaine de caractères
  this.cat.vaccinations = this.vaccinationsCat.split(',').map(vaccination => vaccination.trim());
  this.isLoading = true; // Enable loading upon form submission
  if (this.cat.id == null) {
    this.catService.addCat(this.cat)
      .subscribe({
        next: (cat: Cat) => {
              
               this.upload(cat);
        },
        error: (err) => {
          
          this.isLoading = false; //Desactiver le spinner
        }
      })
  } else {
    this.catService.updateCat(this.cat)
      .subscribe({
        next: (cat: Cat) => {
        
          this.upload(cat);
        },
        error: (err) => {
          
          this.isLoading = false; //Desactiver le spinner
        }
      })
  };
  // this.router.navigateByUrl('/cats');
}
onCats() {
  this.router.navigateByUrl('/cats');
}

/*upload file*/
selectFile(event: any): void {
  // This function is called when a file is selected by the user
  // It assigns the selected file(s) to the selectedFiles property
  this.selectedFiles = event.target.files;
}

upload(cat: Cat): void {
  // This function uploads the selected file(s) to the server

  // Reset progress to 0 at the beginning of the upload
  this.progress = 0;

  // Check if there are selected files
  if (this.selectedFiles) {
    // Get the first selected file
    const file: File | null = this.selectedFiles.item(0);

    if (file) {
      // Assign the current file being uploaded
      this.currentFile = file;

      // Upload the file using the fileUploadService
      this.fileUploadService.upload(this.currentFile, cat.id).subscribe({
        next: (event: any) => {
          // Progress event: Update progress bar
          if (event.type === HttpEventType.UploadProgress) {
            this.progress = Math.round(100 * event.loaded / event.total);
          }
          // Response event: Handle successful upload
          else if (event instanceof HttpResponse) {
            this.message = event.body.message;
            // Redirect to cat details page after successful upload
            this.router.navigateByUrl('/cats/' + cat.id);
            this.isLoading = false; //Desactiver le spinner
          }
        },
        error: (err: any) => {
          // Handle error
          console.log(err);
          this.progress = 0;

          if (err.error && err.error.message) {
            this.message = err.error.message;
          } else {
            this.message = 'Could not upload the file!';
          }
          this.currentFile = undefined;
        }
      });
    } else {
      // Reset selectedFiles if no file is selected
      this.selectedFiles = undefined;
      // Redirect to cat details page
      this.router.navigateByUrl('/cats/' + cat.id);
      this.isLoading = false; //Desactiver le spinner
    }
  } else {
    // Redirect to cat details page 
    this.router.navigateByUrl('/cats/' + cat.id);
    this.isLoading = false; //Desactiver le spinner
  }
}

}

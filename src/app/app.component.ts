import { Component } from '@angular/core';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  progress: number = 0;
  file: File | undefined;

  constructor(private http: HttpClient) {}

  csvInputChange(fileInputEvent: any) {
    console.log(fileInputEvent.target.files[0]);
  }

  uploadFile(event: any) {
    this.file = event.target.files[0];
  }

  submit() {
    if (!this.file) {
      return;
    }

    const formData = new FormData();
    formData.append('file', this.file);

    this.http.post('/api/upload', formData, {
      reportProgress: true,
      observe: 'events',
    }).subscribe((event: any) => {
      if (event.type === HttpEventType.UploadProgress) {
        this.progress = Math.round((100 * event.loaded) / event.total);
      } else if (event.type === HttpEventType.Response) {
        console.log(event.body);
      }
    });
  }


  upload(event:Event){
    console.log(event)
 }
}

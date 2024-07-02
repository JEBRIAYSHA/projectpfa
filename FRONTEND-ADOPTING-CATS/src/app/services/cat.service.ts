import { Inject, Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { Cat } from '../shared/cat';

@Injectable({
  providedIn: 'root'
})
export class CatService {
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'}),
    withCredentials: true
  };
  constructor(private http: HttpClient, 
               @Inject('BaseURL')private baseUrl:string,
              private processHTTPMsgService : ProcessHttpmsgService ) { }
 
  getCats(): Observable<Cat[]> {
    //return this.cats;
  return  this.http.get<Cat[]>(this.baseUrl+"cats",{ withCredentials: true})
                  .pipe(catchError(this.processHTTPMsgService.handleError));
            
  }

  getCatById(id: number): Observable<Cat> {
   // return this.cats.find(cat => cat.id == id);
   return this.http.get<Cat>(this.baseUrl+"cats/"+id,{ withCredentials: true});
  }
  deleteCatById(id: number): Observable<void> {
     return this.http.delete<void>(this.baseUrl+"cats/"+id,{ withCredentials: true});

   /* let index = this.cats.findIndex(cat => cat.id == id)
    this.cats.splice(index, 1);*/
  }
  addCat(cat: Cat): Observable<Cat> {
  /*  cat.id = this.cats[this.cats.length - 1].id + 1;
    this.cats.push(cat);*/
   
    return this.http.post<Cat>(this.baseUrl+"cats",cat,this.httpOptions);
  }
  updateCat(cat: Cat):Observable<Cat>{
    return this.http.put<Cat>(this.baseUrl+"cats/"+cat.id,cat,this.httpOptions)
  }
}
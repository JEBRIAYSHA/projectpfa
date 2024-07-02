import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CatService } from '../services/cat.service';
import { Cat } from '../shared/cat';

@Component({
  selector: 'app-catdetail',
  templateUrl: './catdetails.component.html',
  styleUrls: ['./catdetails.component.css']
})
export class CatDetailsComponent implements OnInit {

  cat: Cat | undefined;
  idCat: any;
  constructor(private catService: CatService,
    private route: ActivatedRoute,
    private router: Router,
    @Inject('BaseURL') public baseURL:any) { }

  ngOnInit(): void {
    //snapshot
    //this.idCat=this.route.snapshot.params['id'];
    //Asynchrone avec RxJS
    this.route.paramMap.subscribe(
      res => {
        this.idCat = res.get('id');
        this.catService.getCatById(this.idCat).subscribe(
          (cat) => { this.cat = cat }
        );
      }
    )

  }

  onCats() {
    this.router.navigateByUrl("/cats")
  }


}
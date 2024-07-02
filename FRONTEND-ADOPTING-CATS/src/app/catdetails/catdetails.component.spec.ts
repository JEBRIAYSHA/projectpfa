import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CatdetailsComponent } from './catdetails.component';

describe('CatdetailsComponent', () => {
  let component: CatdetailsComponent;
  let fixture: ComponentFixture<CatdetailsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CatdetailsComponent]
    });
    fixture = TestBed.createComponent(CatdetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

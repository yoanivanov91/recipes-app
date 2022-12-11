import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyRecepiesComponent } from './my-recepies.component';

describe('MyRecepiesComponent', () => {
  let component: MyRecepiesComponent;
  let fixture: ComponentFixture<MyRecepiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyRecepiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MyRecepiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

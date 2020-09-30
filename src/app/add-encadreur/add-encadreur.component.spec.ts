import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEncadreurComponent } from './add-encadreur.component';

describe('AddEncadreurComponent', () => {
  let component: AddEncadreurComponent;
  let fixture: ComponentFixture<AddEncadreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddEncadreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEncadreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditEncadreurComponent } from './edit-encadreur.component';

describe('EditEncadreurComponent', () => {
  let component: EditEncadreurComponent;
  let fixture: ComponentFixture<EditEncadreurComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEncadreurComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEncadreurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

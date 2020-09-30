import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditBraceletComponent } from './edit-bracelet.component';

describe('EditBraceletComponent', () => {
  let component: EditBraceletComponent;
  let fixture: ComponentFixture<EditBraceletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditBraceletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditBraceletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

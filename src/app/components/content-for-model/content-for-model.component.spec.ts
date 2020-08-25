import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContentForModelComponent } from './content-for-model.component';

describe('ContentForModelComponent', () => {
  let component: ContentForModelComponent;
  let fixture: ComponentFixture<ContentForModelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContentForModelComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContentForModelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

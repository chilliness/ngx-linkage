import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkageBaseComponent } from './linkage-base.component';

describe('LinkageBaseComponent', () => {
  let component: LinkageBaseComponent;
  let fixture: ComponentFixture<LinkageBaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkageBaseComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkageBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

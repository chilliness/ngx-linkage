import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkageTimeComponent } from './linkage-time.component';

describe('LinkageTimeComponent', () => {
  let component: LinkageTimeComponent;
  let fixture: ComponentFixture<LinkageTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkageTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkageTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

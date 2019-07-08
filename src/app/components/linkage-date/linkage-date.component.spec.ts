import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LinkageDateComponent } from './linkage-date.component';

describe('LinkageDateComponent', () => {
  let component: LinkageDateComponent;
  let fixture: ComponentFixture<LinkageDateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LinkageDateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LinkageDateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

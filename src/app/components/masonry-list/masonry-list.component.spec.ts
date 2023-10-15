import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MasonryListComponent } from './masonry-list.component';

describe('MasonryListComponent', () => {
  let component: MasonryListComponent;
  let fixture: ComponentFixture<MasonryListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MasonryListComponent]
    });
    fixture = TestBed.createComponent(MasonryListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

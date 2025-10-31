import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApprovelList } from './approvel-list';

describe('ApprovelList', () => {
  let component: ApprovelList;
  let fixture: ComponentFixture<ApprovelList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ApprovelList]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApprovelList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import Bootstrap from 'bootstrap/dist/js/bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit {

  modalDirect: Bootstrap.Modal;
  @ViewChild('demoModal') input;

  constructor(
    // private modal: Modal
  ) {
    console.log('constructor: %o', this.input);

    // this.modalDirect = new bootstrap.Modal(this.input, {});
  }

  ngOnInit(): void {
    console.log('ngOnInit: %o', this.input);
  }

  open(element): void {
    this.modalDirect = new Bootstrap.Modal(element, {});
    // this.modalDirect.Modal.open(element);
    // this.modal.show();
  }

  ngAfterViewInit(): void {
    this.modalDirect = new Bootstrap.Modal(this.input.nativeElement, {});
    console.log('ngAfterViewInit: %o', this.input);
  }

}

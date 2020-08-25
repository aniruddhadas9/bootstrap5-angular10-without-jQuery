import {Component, OnInit} from '@angular/core';
import {
  AlertService,
  ChangeLocationModelComponent,
  DangerAlert,
  Footer,
  GoogleAnalyticsService,
  Header,
  HeaderService,
  Link,
  MapService,
  SuccessAlert,
  UserService
} from '@candiman/website';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router} from '@angular/router';
import {filter, tap} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'bootstrap5';
  coordinates: Coordinates;
  isLoading: boolean;

  header: Header;
  footer: Footer;
  rightMenuItem: Array<Link> = [];
  alive: any;

  modalRef;

  constructor(
    private httpClient: HttpClient,
    private mapService: MapService,
    private router: Router,
    private ga: GoogleAnalyticsService,
    public userService: UserService,
    private activatedRoute: ActivatedRoute,
    private alertService: AlertService,
    private headerService: HeaderService,
    // private googleApiService: GoogleApiService,
    // private googleAuthService: GoogleAuthService,
    // private authService: AuthService,
    // private nbAuthService: NbAuthService
  ) {

    // Subscribe to the login
    this.userService.userSubject.subscribe((user: any | Array<object>) => {
      console.log(user);
      if (user === null) {
        this.headerService.rightLinks.next([
          {label: 'Login', url: '/login'},
        ]);
        this.alertService.alert(new SuccessAlert('Logout success!', 'You are successfully loggedout.', user, 30));
      } else if (user.token.length > 0) {
        // Add right menu as per the allowed permission
        this.headerService.rightLinks.next(this.buildMenuItem(user.authorized));
      } else {
        this.alertService
          .alert(new DangerAlert('Login failure!', 'Unable to login! Please try again or contact support team.',
            user, 30));
      }
    });

    this.header = {
      brand: {
        label: '',
        url: '/',
        brandImage: {
          logo: {
            imageInAsset: 'test-logo.png',
            width: 330,
            height: 50,
            style: {
              width: '330px',
              height: '50px'
            }
          },
        },
        style: {
          color: '#f99d00',
          width: '300px',
          height: '50px',
          'text-decoration': 'none'
        }
      },
      links: {
        rightLinks: [
          {label: 'Login', url: '/login'},
        ],
        leftLinks: null,
        style: {
          'background-color': '#f4f4f4',
          color: '#f99d00',
          margin: '0 5px',
          'text-decoration': 'none',
          'a:link': {
            color: '#3eff77'
          },
          'a:visited': {
            color: '#f99d00'
          },
          'a:hover': {
            color: '#fe4d0e'
          },
          'a:active': {
            color: '#ec7a39'
          }
        }
      },
      middleButton: {
        display: false,
        label: 'Trying to get location from device...',
        loading: true,
        style: {
          'background-color': '#7a690b',
          color: '#f99d00'
        }
      },
      style: {
        'min-height': '50px',
        'background-color': '#f4f4f4'
      }
    };

    this.footer = {
      displayTopSection: true,
      social: {
        facebook: 'http://www.facebook.com',
        googlePlus: 'http://www.plus.google.com',
        twitter: 'http://www.twitter.com',
        linkedIn: 'http://www.linkedin.com',
      },
      copyright: {
        year: 2018,
        label: 'Aniruddha Das',
        url: 'team'
      },
      contact: {
        name: 'Aniruddha Das',
        email: 'aniruddhadas9@gmail.com',
        phone: '+x xxx xxx xxxx',
        fax: '+x xxx xxx xxxx'
      },
      message: {
        heading: 'Simple Boostrap 5 modal',
        desc: 'A simple bootstrap 5 modal demo without jQuery and other 3rd party library'
      },
      columnOneLinks: [
        {label: 'login', url: '/login', hidden: true},
        {label: 'Privacy', url: '/privacy', hidden: false}
      ],
      columnTwoLinks: [
        {label: 'profile', url: '/profile', hidden: false}
      ],
      style: {
        'background-color': '#f4f4f4',
        color: '#034da7',
        'a:link': {
          color: '#ffc11a'
        },
        'a:visited': {
          color: '#16d3ff'
        },
        'a:hover': {
          color: '#fbfe11'
        },
        'a:active': {
          color: '#d0eccb'
        }
      }
    };

  }

  ngOnInit(): void {

    // Show loading of the router are busy navigating.
    this.router.events.pipe(
      filter(event => event instanceof NavigationStart ||
        event instanceof NavigationEnd ||
        event instanceof NavigationCancel ||
        event instanceof NavigationError),
      tap(event => {
        this.isLoading = false;
        if (event instanceof NavigationEnd) {
          this.ga.sendPageViewData(event.urlAfterRedirects);
        }
      }),
    ).subscribe(event => {
      this.isLoading = true;
    });

    this.headerService.header.next(this.header);

    /*this.googleApiService.onLoad().subscribe((value) => {
      console.log(value);
    });*/

    /*this.authService.authState.subscribe((user) => {
      console.log('angularx-social-login|user:%o|loggedIn:%o', user, user != null);
    });*/
  }

  /*mapReady(map: GoogleMap): void {
    this.mapService.map = map;
    this.mapService.getBrowserCoordinates({}).subscribe((position: Position) => {
      this.coordinates = position && position.coords;
      this.mapService.getAddressFromCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      }).subscribe((location) => {
        console.log('location: %o', location);
      });
    });
  }*/

  openLocationChangeModel(event): void {
    this.modalRef = null; // this.ngbModal.open(ChangeLocationModelComponent, {windowClass: 'location-change-modal'});
    this.modalRef.componentInstance.output.subscribe((location) => {
      this.header.middleButton.label = location.formatted_address;
    });
  }

  public buildMenuItem(permission: string): Array<Link> {
    const rightMenuItem = [];

    // All authenticated used are allowed to see there profile
    rightMenuItem.push({label: 'Profile', url: '/profile'});

    // Event operator or holi event manager
    if (this.checkAvailability(permission, 'operator') || this.checkAvailability(permission, 'holi')) {
      rightMenuItem.push({label: 'Guest entry', url: '/holi'});
      rightMenuItem.push({label: 'Parking', url: '/parking'});
      rightMenuItem.push({label: 'Privacy', url: '/privacy'});
      rightMenuItem.push({label: 'Upload file', url: '/csv-upload'});
      rightMenuItem.push({label: 'Users', url: '/user-manage'});
      rightMenuItem.push({label: 'Event status', url: '/holi-statics'});
      rightMenuItem.push({label: 'search', url: '/holi-manage'});
      rightMenuItem.push({label: 'NH Family', url: '/nhfamily'});
    }

    // Teachers
    if (this.checkAvailability(permission, 'teacher')) {
      rightMenuItem.push({label: 'Teachers', url: '/teacher'});
    }

    // Students
    if (this.checkAvailability(permission, 'student')) {
      rightMenuItem.push({label: 'Students', url: '/student'});
    }

    // Admin
    if (this.checkAvailability(permission, 'admin')) {
      rightMenuItem.push({label: 'Admin', url: '/admin'});
      rightMenuItem.push({label: 'Add new user', url: '/user-manage'});
    }
    return rightMenuItem;
  }

  checkAvailability(arr, val): boolean {
    return arr.some((arrVal) => {
      return val === arrVal;
    });
  }


}

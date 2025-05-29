import { Component, ElementRef, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common'; 
import { WorldbankService } from '../worldbank.service';
import { WorldInfoComponent } from '../world-info/world-info.component';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

@Component({
  selector: 'app-world',
  standalone: true,
  imports: [CommonModule, WorldInfoComponent ], 
  providers: [HttpClient, WorldbankService],
  templateUrl: './world.component.html',
  styleUrls: ['./world.component.css']
})
export class WorldComponent implements OnInit {

  countryName: string | null = null;
  countryCapital: string | null = null;
  countryRegion: string | null = null;
  countryIncomeLevel: string | null = null;
  countryAbv: string | null = null;
  countryId: string | null = null;
  countryCode: string | null = null;
  countryLatitude: string | null = null;
  countryLongitude: string | null = null;

  constructor(private WorldbankService: WorldbankService, private http: HttpClient, private el: ElementRef) {}

  ngOnInit(): void {
    this.http.get('map-image.svg', { responseType: 'text' }).subscribe(svgContent => {
      const container = this.el.nativeElement.querySelector('.worldMap');
      container.innerHTML = svgContent;
      this.addEventListeners(container);
    });
  }

     

  private addEventListeners(container: HTMLElement): void {
    const paths = container.querySelectorAll('path');
    paths.forEach((path) => {
      path.addEventListener('click', (event) => this.onPathClick(event));
    });
  }

  onPathClick(event: Event): void {
    const paths = this.el.nativeElement.querySelectorAll('path');
      paths.forEach((path: any) => {
        path.style.fill = '';
    });

    const target = event.target as SVGPathElement;
    const clickedCountryId = target.getAttribute('id');

    this.countryName = target.getAttribute('name');
    this.countryId = target.getAttribute('id');
    if (this.countryId === clickedCountryId) {
      target.style.fill = 'rgb(34, 244, 252)';
    } 
    if (this.countryId) {
      this.fetchInfoAboutCountry(this.countryId)
    }
  }

  fetchInfoAboutCountry (countryCode: string): void {

    this.WorldbankService.getCountryProperties(countryCode).subscribe({
      next: (data:any) => {
          const allData = data[1][0];
          this.countryCode = allData.id
          this.countryCapital = allData.capitalCity;
          this.countryRegion = allData.region.value;
          this.countryIncomeLevel = allData.incomeLevel.value;
          this.countryLatitude = allData.latitude;;
          this.countryLongitude = allData.longitude;;
  
      },
      error: (error:any) => {
        console.error('Error:', error);
      },
      complete: () => {
        console.log('Completed.');
      }
    });
    if (this.countryId) {
          this.WorldbankService.getAdditionalInfo(this.countryId).subscribe({
            next: (data:any) => {
              const allData = data[1][0];
              this.countryAbv = allData.countryiso3code;
            }
          }) 
    }
  }
  
}

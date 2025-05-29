import { Component, Input} from '@angular/core';
import { WorldbankService } from '../worldbank.service';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-world-info',
  standalone: true,
  templateUrl: './world-info.component.html',
  styleUrls: ['./world-info.component.css'],
    imports: [CommonModule ], 
  providers: [WorldbankService]
})

export class WorldInfoComponent {
  @Input() countryName: string | null = null;
  @Input() countryCapital: string | null = null;
  @Input() countryRegion: string | null = null;
  @Input() countryIncomeLevel: string | null = null;
  @Input() countryAbv: string | null = null;
  @Input() countryId: string | null = null;
  @Input() countryLatitude: string | null = null;
  @Input() countryLongitude: string | null = null;

}
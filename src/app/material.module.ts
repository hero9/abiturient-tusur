import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { 	MatButtonModule, 
					MatSidenavModule, 
					MatListModule, 
					MatToolbarModule, 
					MatIconModule, 
					MatMenuModule,
					MatCardModule,
					MatTabsModule,
					MatFormFieldModule,
					MatSelectModule,
					MatInputModule 
				} from '@angular/material';

@NgModule({
	imports: [
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
		MatToolbarModule,
		MatIconModule,
		MatMenuModule,
		MatCardModule,
		MatTabsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule
	],
	exports: [
		MatButtonModule,
		MatSidenavModule,
		MatListModule,
		MatToolbarModule,
		MatIconModule,
		MatMenuModule,
		MatCardModule,
		MatTabsModule,
		MatFormFieldModule,
		MatSelectModule,
		MatInputModule
	],
})

export class MaterialModule { }
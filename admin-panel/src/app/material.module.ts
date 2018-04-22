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
					MatInputModule,
					MatTableModule
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
		MatInputModule,
		MatTableModule
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
		MatInputModule,
		MatTableModule
	],
})

export class MaterialModule { }
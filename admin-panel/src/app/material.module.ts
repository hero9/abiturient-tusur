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
					MatTableModule,
					MatCheckboxModule,
					MatDatepickerModule,
					MatNativeDateModule
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
		MatTableModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatNativeDateModule
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
		MatTableModule,
		MatCheckboxModule,
		MatDatepickerModule,
		MatNativeDateModule
	],
})

export class MaterialModule { }
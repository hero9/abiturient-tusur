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
					MatCheckboxModule
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
		MatCheckboxModule
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
		MatCheckboxModule
	],
})

export class MaterialModule { }
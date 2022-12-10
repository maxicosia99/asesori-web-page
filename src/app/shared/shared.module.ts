import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import * as components from './components';

@NgModule({
	imports: [FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, CommonModule],
	declarations: [...components.components],
	exports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule, RouterModule, ...components.components],
})
export class SharedModule {}

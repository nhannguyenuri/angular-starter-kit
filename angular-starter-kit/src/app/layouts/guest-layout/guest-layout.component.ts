import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-guest-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './guest-layout.component.html',
})
export class GuestLayoutComponent {}

import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { SideMenuComponents } from "./shared/components/side-menu/side-menu.components";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, SideMenuComponents],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('forms');
}

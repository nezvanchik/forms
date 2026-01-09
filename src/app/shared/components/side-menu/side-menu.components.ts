import { routes } from './../../../app.routes';
import { reactiveRoutes } from './../../../reactive/reactive.routes';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuItem {
    title: string;
    route: string;
}


const reactiveItems= reactiveRoutes[0].children ?? [];
@Component({
  selector: 'side-menu',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu.components.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SideMenuComponents {
  reactiveMenu: MenuItem[] = reactiveItems
  .filter(item => item.path && item.title)
  .map(item => ({
    route: `reactive/${item.path}`,
    title: `${item.title}`,
   
  }));

  authMenu: MenuItem[] = [
    {
      title: 'Registro',
      route: '/auth',
    },
  ];

  countryMenu: MenuItem[] = [
    {
      title: 'Paises',
      route: '/country',
    },
  ];
}

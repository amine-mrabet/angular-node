import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '@app/auth/services/auth.service';
import { LayoutsService } from '@app/layouts/services/layouts.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  openSideBarMenu = false;
  displayBarMenu = false;
  menu:Menu[] = [];
  Roles:any[] = []
  constructor(private layoutsService: LayoutsService, private router: Router,private authService:AuthService) { }


  ngOnInit() {
    this.getMenu()
  }
  getMenu() {
    this.layoutsService.getMenu().subscribe(data => {
      this.menu = data;
      this.menu.forEach(element => {
        if (!element.items.length) {
          delete element.items;
        }
        element = this.deleteItems(element);
      });
    }, (error) => {
    }, () => {

      this.menu = this.filterByRole(this.menu);
    })

  }
  deleteItems(element) {
    element.items.forEach(item => {
      if (!item.items.length) {
        delete item.items;
      }
      if (item.items) {
        item.items.forEach(subitem => {
          if(subitem.items.length){
            this.deleteItems(subitem)
          }else{
            subitem.command = (event) => this.open(subitem);
            if (!subitem.items.length) {
              delete subitem.items;
            }
          }

        });
      } else {
        item.command = (event) => this.open(item);
      }
    });
    return element;
  }
  open(menu: any) {
    const link = menu.link ? menu.link[0] : null;
    const externalLink = link ? link.startsWith('http') : link;
    if (link) {
      externalLink ? window.open(link, menu.openWindow ? '_blank' : '_self') : this.router.navigate(menu.link, { queryParams: menu.params });
    }
  }
  filterByRole(menu: any[]) {
      return menu.filter(item => {
        const hasRole = this.isUserRolesHas(new Set(item.roles));
        if (hasRole && item.items) {
          item.items = this.filterByRole(item.items);
        }
        return hasRole;
      });
  }
  isUserRolesHas(rolesBase: Set<String>,): boolean {
    console.log(this.authService.getRoles())
    return (
      this.authService.getRoles() &&
      this.authService.getRoles().filter((role) => rolesBase.has(role)).length > 0
    )
  }
  /**
   * Open the side bar region
   */
  openSidebar() {
    this.openSideBarMenu = true;
  }
  activeMenu(event) {
    let node;
    if (event.target.tagName === "A") {
      node = event.target;
    } else {
      node = event.target.parentNode;
    }
    let menuitem = null;
    menuitem = document.getElementsByClassName("ui-menuitem-link");
    for (let i = 0; i < menuitem.length; i++) {
      menuitem[i].classList.remove("menuitem-active");
    }
    node.classList.add("menuitem-active")
  }
}
export interface Menu {
  label: string;
  roles?: string[];
  styleName?: string;
  icon?: string;
  items?: Menu[];
  link?: string[];
  command?: any;
}
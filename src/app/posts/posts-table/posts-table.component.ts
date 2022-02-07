import { Component, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { PeriodicElement } from '../shared/models/shared.models';
import { Router } from '@angular/router';

const ELEMENT_DATA: PeriodicElement[] = [
  { id: 1, title: 'Hydrogen', description: 'H' },
  { id: 2, title: 'Helium', description: 'He' },
  { id: 3, title: 'Lithium', description: 'Li' },
  { id: 4, title: 'Beryllium', description: 'Be' },
  { id: 5, title: 'Boron', description: 'B' },
  { id: 6, title: 'Carbon', description: 'C' },
  { id: 7, title: 'Nitrogen', description: 'N' },
  { id: 8, title: 'Oxygen', description: 'O' },
  { id: 9, title: 'Fluorine', description: 'F' },
  { id: 10, title: 'Neon', description: 'Ne' },
  { id: 11, title: 'Sodium', description: 'Na' },
  { id: 12, title: 'Magnesium', description: 'Mg' },
  { id: 13, title: 'Aluminum', description: 'Al' },
  { id: 14, title: 'Silicon', description: 'Si' },
  { id: 15, title: 'Phosphorus', description: 'P' },
  { id: 16, title: 'Sulfur', description: 'S' },
  { id: 17, title: 'Chlorine', description: 'Cl' },
  { id: 18, title: 'Argon', description: 'Ar' },
  { id: 19, title: 'Potassium', description: 'K' },
  { id: 20, title: 'Calcium', description: 'Ca' },
];

@Component({
  selector: 'app-posts-table',
  templateUrl: './posts-table.component.html',
  styleUrls: ['./posts-table.component.scss'],
})
export class PostsTableComponent {
  public displayedColumns: string[] = ['id', 'title', 'description', 'actions'];
  public dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private router: Router) {}

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  goToPage(element: PeriodicElement, event: any): void {
    const action: string = event.target.innerText;

    switch (action) {
      case 'Edit':
        this.goToEditPage(element.id);
        break;
      case 'Delete':
        this.deleteItem(element.id);
        break;

      default:
        this.goToDetails(element.id);
        break;
    }
  }

  goToEditPage(id: number): void {
    this.router.navigateByUrl(`posts/edit/${id}`);
  }
  deleteItem(id: number): void {
    console.log('Im deleting');
  }
  goToDetails(id: number): void {
    this.router.navigateByUrl(`posts/${id}`);
  }
}

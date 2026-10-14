import { SECTORS } from './data/sectors.data';
import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Sector } from './models/sector.interface';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('ughg-info');

 readonly sectors: Sector[] = SECTORS;

  readonly currentYear = new Date().getFullYear();

  activeSectorId: string | null = null;
  searchQuery = '';
  mobileMenuOpen = false;

  get totalActivitiesCount(): number {
    return this.sectors.reduce(
      (total, sector) => total + sector.activities.length,
      0
    );
  }

  get filteredSectors(): Sector[] {
    const query = this.searchQuery.trim().toLocaleLowerCase('ar');

    if (!query) {
      return this.sectors;
    }

    return this.sectors.filter((sector) => {
      const searchableText = [
        sector.title,
        sector.description,
        ...sector.activities
      ]
        .join(' ')
        .toLocaleLowerCase('ar');

      return searchableText.includes(query);
    });
  }

  selectSector(id: string): void {
    if (this.activeSectorId === id) {
      this.activeSectorId = null;
      return;
    }

    this.activeSectorId = id;

    setTimeout(() => {
      document.getElementById('details')?.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    });
  }

  toggleMobileMenu(): void {
    this.mobileMenuOpen = !this.mobileMenuOpen;
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen = false;
  }

  resetFilters(): void {
    this.searchQuery = '';
    this.activeSectorId = null;
  }

  isSectorActive(id: string): boolean {
    return this.activeSectorId === id;
  }
}

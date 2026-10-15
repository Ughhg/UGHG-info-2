import { SECTORS } from './data/sectors.data';
import { COMPANY_FACTS } from './data/company.data';
import { Component, computed, signal } from '@angular/core';
import { CompanyFact, Sector } from './models/sector.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  readonly sectors: Sector[] = SECTORS;
  readonly companyFacts: CompanyFact[] = COMPANY_FACTS;

  readonly currentYear = new Date().getFullYear();

  // SVG path data for each sector icon name
  readonly iconPaths: Record<string, string> = {
    'building-2': 'M3 21h18M5 21V8l7-5 7 5v13M9 21v-6h6v6M9 10h.01M15 10h.01',
    cpu: 'M9 3v2M15 3v2M9 19v2M15 19v2M3 9h2M3 15h2M19 9h2M19 15h2M7 5h10a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2zM9 9h6v6H9z',
    megaphone: 'M3 11v2a1 1 0 0 0 1 1h2l5 4V6L6 10H4a1 1 0 0 0-1 1zM16 8a5 5 0 0 1 0 8M19 5a9 9 0 0 1 0 14',
    truck: 'M3 7l9-4 9 4-9 4-9-4zM3 7v10l9 4 9-4V7M12 11v10',
    headset: 'M4 14v-3a8 8 0 0 1 16 0v3M4 14a2 2 0 0 0 2 2h1v-5H6a2 2 0 0 0-2 2zM20 14a2 2 0 0 1-2 2h-1v-5h1a2 2 0 0 1 2 2zM17 16v1a3 3 0 0 1-3 3h-2'
  };

  readonly activeSectorId = signal(this.sectors[0].id);
  readonly searchQuery = signal('');
  readonly mobileMenuOpen = signal(false);

  readonly filteredSectors = computed(() => {
    const query = this.searchQuery().trim().toLocaleLowerCase('ar');

    if (!query) {
      return this.sectors;
    }

    return this.sectors.filter((sector) =>
      [
        sector.title,
        sector.description,
        ...sector.activities.flatMap((activity) => [activity.name, activity.description])
      ]
        .join(' ')
        .toLocaleLowerCase('ar')
        .includes(query)
    );
  });

  // Falls back to the first search result when the selected sector is filtered out
  readonly activeSector = computed((): Sector | undefined => {
    const visible = this.filteredSectors();
    return visible.find((sector) => sector.id === this.activeSectorId()) ?? visible[0];
  });

  readonly totalActivitiesCount = this.sectors.reduce(
    (total, sector) => total + sector.activities.length,
    0
  );

  toggleMobileMenu(): void {
    this.mobileMenuOpen.update((open) => !open);
  }

  closeMobileMenu(): void {
    this.mobileMenuOpen.set(false);
  }

  clearSearch(): void {
    this.searchQuery.set('');
  }

  selectSector(id: string): void {
    this.activeSectorId.set(id);
    document.getElementById('details')?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }
}

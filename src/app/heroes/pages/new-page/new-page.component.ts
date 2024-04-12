import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { filter, switchMap, tap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirmDialog/confirmDialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: '',
})
export class NewPageComponent implements OnInit {
  heroForm = new FormGroup({
    id: new FormControl(''),
    superhero: new FormControl('', {}),
    publisher: new FormControl<Publisher>(Publisher.DCComics),
    alter_ego: new FormControl(''),
    first_appearance: new FormControl(''),
    characters: new FormControl(''),
    alt_img: new FormControl(''),
  });

  publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    if (!this.router.url.includes('edit')) {
      return;
    }

    this.activatedRoute.params
      .pipe(switchMap(({ id }) => this.heroesService.getHeroById(id)))
      .subscribe(async (hero) => {
        if (!hero) {
          return this.router.navigateByUrl('/');
        }

        this.heroForm.reset(hero);
        return true;
      });
  }

  get currentHero(): Hero {
    return this.heroForm.value as Hero;
  }

  onSubmit(): void {
    if (this.heroForm.invalid) {
      this.heroForm.markAllAsTouched();
      return;
    }

    if (this.currentHero.id) {
      this.heroesService.updateHero(this.currentHero).subscribe((hero) => {
        this.showSnackBar(`${hero.superhero} Updated`);
      });
      return;
    }

    this.heroesService.addHero(this.currentHero).subscribe((hero) => {
      this.router.navigate(['/heroes/edit', hero.id]);
      this.showSnackBar(`${hero.superhero} Created`);
    });
  }

  onDeleteHero(): void {
    if (!this.currentHero.id) throw new Error('Hero id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.currentHero,
    });

    dialogRef
      .afterClosed()
      .pipe(
        filter((result: boolean) => result),
        switchMap(() => this.heroesService.deleteHeroById(this.currentHero.id)),
        filter((wasDeleted) => wasDeleted)
      )
      .subscribe(() => {
        this.showSnackBar('Hero Deleted');
        this.router.navigate(['/heroes']);
      });
  }

  showSnackBar(message: string): void {
    this.snackBar.open(message, 'vale', {
      duration: 2500,
    });
  }
}

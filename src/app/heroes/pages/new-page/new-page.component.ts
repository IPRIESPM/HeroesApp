import { Component } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service';


@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent {

  heroForm = new FormGroup({
    id:  new FormControl(''),
    superhero:  new FormControl('',{}),
    publisher:  new FormControl<Publisher>(Publisher.DCComics),
    alter_ego:  new FormControl(''),
    first_appearance:  new FormControl(''),
    characters:  new FormControl(''),
    alt_img: new FormControl('')
  });

  publishers = [
    {id: 'DC Comics', desc: 'DC - Comics'},
    {id: 'Marvel Comics', desc: 'Marvel - Comics'}
  ];

  constructor( private heroesService: HeroesService ) {}

  get currentHero():Hero{
    return this.heroForm.value as Hero;
  }

  onSubmit():void{
    if(this.heroForm.invalid){
      this.heroForm.markAllAsTouched();
      return;
    }

    // this.heroesService.addHero()
    //   .subscribe( hero => {
    //     console.log('Saved', hero);
    //   });
  }
}

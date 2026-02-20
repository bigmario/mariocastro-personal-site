import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { HeroComponent } from './components/hero/hero.component';
import { AboutComponent } from './components/about/about.component';
import { SkillsComponent } from './components/skills/skills.component';
import { ExperienceComponent } from './components/experience/experience.component';
import { FooterComponent } from './components/footer/footer.component';
import { ContactModalComponent } from './components/contact-modal/contact-modal.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    NavComponent, 
    HeroComponent, 
    AboutComponent, 
    SkillsComponent, 
    ExperienceComponent, 
    FooterComponent, 
    ContactModalComponent
  ],
  templateUrl: './app.component.html',
})
export class AppComponent {
  // Empty, acts as a layout shell.
}

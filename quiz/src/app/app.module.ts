import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component';
import { MenuComponent } from './components/menu/menu.component';
import { MainComponent } from './components/main/main.component';
import { PainelComponent } from './components/painel/painel.component';
import { QuestionComponent } from './components/question.component'
import { QuizComponent } from './components/quiz.component'
import { ResultsComponent } from './components/results.component'

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    ResultsComponent,
    MenuComponent,
    MainComponent,
    PainelComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

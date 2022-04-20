import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { QuestionComponent } from './components/question.component'
import { QuizComponent } from './components/quiz.component'
import { ResultsComponent } from './components/results.component'

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    ResultsComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

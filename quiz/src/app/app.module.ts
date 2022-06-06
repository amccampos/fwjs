import { NgModule } from '@angular/core'
import { FormsModule } from '@angular/forms'
import { BrowserModule } from '@angular/platform-browser'

import { AppComponent } from './app.component'
import { QuestionFormComponent } from './components/question-form/question-form.component'
import { QuestionListComponent } from './components/question-list.component'
import { QuestionComponent } from './components/question.component'
import { QuizComponent } from './components/quiz.component'
import { ResultsComponent } from './components/results.component'

@NgModule({
  declarations: [
    AppComponent,
    QuizComponent,
    QuestionComponent,
    ResultsComponent,
    QuestionFormComponent,
    QuestionListComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

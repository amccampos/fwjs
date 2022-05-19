import {Meta, Story} from "@storybook/angular/types-6-0";
import {MainComponent} from "../../app/components/main/main.component";
import {moduleMetadata} from "@storybook/angular";
import {MenuComponent} from "../../app/components/menu/menu.component";
import {PainelComponent} from "../../app/components/painel/painel.component";
import {CommonModule} from "@angular/common";
import {BrowserModule} from "@angular/platform-browser";

export default {
  title: 'Tab/Main',
  component: MainComponent,
  decorators: [
    moduleMetadata({
      declarations: [MenuComponent, PainelComponent],
      imports: [CommonModule, BrowserModule]
    }),
  ],
  argTypes: {
    abaSelecionada: {
      control: {
        type: 'radio',
        options: [0, 1, 2, 3]
      }
    }
  }
} as Meta

const Template: Story<MainComponent> = (args: MainComponent) => ({
  props: args
})

export const Main = Template.bind({})

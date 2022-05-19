import {PainelComponent} from "../../app/components/painel/painel.component";
import {Meta, Story} from "@storybook/angular/types-6-0";

export default {
  title: 'Tab/Painel',
  component: PainelComponent,
  argTypes: {
    aba: {
      control: {
        type: 'radio',
        options: [0, 1, 2, 3]
      }
    }
  }
} as Meta<PainelComponent>

const Template: Story<PainelComponent> = (args) => ({
  props: args
})

export const Painel = Template.bind({})
Painel.args = {
  aba: 0
}

import {MenuComponent} from "../../app/components/menu/menu.component";
import {Meta, Story} from "@storybook/angular/types-6-0";

export default {
  title: 'Tab/Menu',
  component: MenuComponent,
  argTypes: {
    selection: {
      action: 'clicou no botão: '
    },
    selected: {
      control: {
        type: 'radio',
        options: [0, 1, 2, 3]
      }
    }
  }
} as Meta<MenuComponent>

const Template: Story<MenuComponent> = (args) => ({
  props: args,
})

export const Menu = Template.bind({})



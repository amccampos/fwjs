import { ComponentStory, ComponentMeta } from '@storybook/react';
import { linkTo } from '@storybook/addon-links'

import { Button, ButtonProps } from './Button';

// More on default export: https://storybook.js.org/docs/react/writing-stories/introduction#default-export
export default {
  title: 'Outra/Button',
  component: Button,
  // More on argTypes: https://storybook.js.org/docs/react/api/argtypes
  argTypes: {
    backgroundColor: { control: 'color' },
  },
} as ComponentMeta<typeof Button>;

// More on component templates: https://storybook.js.org/docs/react/writing-stories/introduction#using-args
const Template: ComponentStory<typeof Button> = ({ ...args}) => <Button {...args} />;

export const first = () => <Button label="A" onClick={linkTo('Outra/Button', 'second')} />
export const second = () => <Button label="B" onClick={linkTo('Outra/Button', 'first')} />

export const Primary = Template.bind({});
// More on args: https://storybook.js.org/docs/react/writing-stories/args
Primary.args = {
  primary: true,
  label: 'Secondary',
};

export const Secondary = Template.bind({});
Secondary.args = {
  ...Primary.args,
  primary: false,
  label: 'Large',
};

export const Large = Template.bind({});
Large.args = {
  size: 'large',
  label: 'Button',
};

export const Small = Template.bind({});
Small.args = {
  size: 'small',
  label: 'Button',
};

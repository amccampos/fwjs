import { linkTo } from '@storybook/addon-links';
import { ComponentStory, ComponentMeta } from '@storybook/react'
import { screen, userEvent } from '@storybook/testing-library';
import { Question } from '../components/Question'

export default {
  title: 'Quiz/Question',
  component: Question,
} as ComponentMeta<typeof Question>

const Template: ComponentStory<typeof Question> = (args) => <Question {...args} />;

export const q1 = Template.bind({})
q1.args ={
  statement: "O que é isso?",
  options: ['Não sei', 'Sei lá', 'Algo'],
}

export const cde = Template.bind({})
cde.args ={
  statement: "O que é isso?",
  options: ['Não sei', 'Sei lá', 'Algo'],
  selection: 1
}

export const qst = () => (
  <Question
    statement="Questão 1"
    options={['opc1', 'opc2']}
    onSelection={linkTo('Outra/Button', 'Primary')}
  />
)

function delay(ms: number) {
  return new Promise(resolve => setTimeout(resolve, ms))
}

qst.play = async () => {
  await delay(1000)
  const button = screen.getByText('opc1', { selector: 'button' })
  userEvent.click(button)
}
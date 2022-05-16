import { ComponentMeta, ComponentStory } from "@storybook/react"
import { Quiz, QuizProps } from "../components/Quiz"

export default {
  title: 'Quiz/Quiz',
  component: Quiz
} as ComponentMeta<typeof Quiz>

const Template: ComponentStory<typeof Quiz> = (args: QuizProps) => <Quiz {...args} />

export const Q1 = Template.bind({})
Q1.args = {
  questions: [
    {
      statement: 'Enunciado da 1ª questão',
      options: ['Opção 1.1', 'Opção 1.2', 'Opção 1.3', 'Opção 1.4']
    },
    {
      statement: 'Enunciado da 2ª questão',
      options: ['Opção 2.1', 'Opção 2.2', 'Opção 2.3', 'Opção 2.4']
    },
  ]
}
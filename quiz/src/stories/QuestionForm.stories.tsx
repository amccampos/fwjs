import { QuestionForm } from "../components/QuestionForm";


export default {
  title: 'Quiz/QuestionForm',
  component: QuestionForm
}

const Template = (args: any) => <QuestionForm {...args} />

export const f1 = Template.bind({})
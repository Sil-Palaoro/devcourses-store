import type { Meta, StoryObj } from '@storybook/react-vite';
import CourseList from './CourseList.js';
import { dataCourses } from "../mocks/course-mock.js";


const meta = {
  title: 'Components/CourseList',
  component: CourseList,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CourseList>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        courses: dataCourses
    }
};
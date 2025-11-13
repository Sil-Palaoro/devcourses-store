import type { Meta, StoryObj } from '@storybook/react-vite';
import CourseCard from './CourseCard.js';

const meta = {
  title: 'Components/CourseCard',
  component: CourseCard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof CourseCard>;

export default meta;
type Story = StoryObj<typeof meta>;


export const Default: Story = {
    args: {
        course: {
            id: "1",
            title: "Javascript para principiantes",
            description: "Aprende Javascript desde 0 - Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit amet orci elementum tellus vulputate sodales. Cras ornare elementum ullamcorper. Etiam ligula elit, mollis vitae tempor ac, varius ullamcorper mauris. ",
            price: 30000,
            categoryId: "1",
            courseLevel: "beginner",
            published: true,
            instructorId: "1",
            tag: "javascript",
            createdAt: new Date(),
            updatedAt: new Date(),
        }
    }
};
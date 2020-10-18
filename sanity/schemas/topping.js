import { FaPepperHot as icon } from 'react-icons/fa';

export default {
    // Computer name
    name: 'topping',
    // visible title
    title: 'Toppings',
    type: 'document',
    icon,
    fields: [
        {
            name: 'name',
            title: 'Pizza name',
            type: 'string',
            description: 'What is the name of the topping?'
        },
        {
            name: 'vegeterian',
            title: 'Vegeterian',
            type: 'boolean',
            description: 'What is the name of the topping?',
            options: {
                layout: 'checkbox'
            }
        },
    ],
    preview: {
        select: {
            name: 'name',
            vegeterian: 'vegeterian'
        },
        prepare: ({ name, vegeterian }) => ({
            title: `${name}  ${vegeterian ? '🍃' : ''}`
        })
    }
}
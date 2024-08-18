import { test, expect } from '@playwright/test';

test.describe('Dummy group', () => {
    test('Login', {
        annotation: {
            type: "issue",
            description: "There is some issue"
        }
    }, async ({ page }) => {
        await page.goto("http://localhost:5173");
        await page.getByRole('textbox', { name: 'username' }).fill('user');
        await page.getByRole('textbox', { name: 'password' }).fill('password');
        await page.getByRole('button', { name: 'Login' }).click();
        await expect(page.getByRole('heading', { name: 'Todo list' })).toBeVisible();
    })

    test('Mock test', async ({ page }) => {
        await page.route('http://localhost:3000/todos', async route => {
            const json = {
                "status": "Success",
                "todos": [
                    {
                        "id": 1710481834003,
                        "value": "sdafwf"
                    },
                ]
            };
            await route.fulfill({ json });
        });

        await page.route('http://localhost:3000/addTodo', async route => {
            const json = {
                "status": "Success",
                "message": "Todo added",
                "todos": [
                    {
                        "id": 1710481834003,
                        "value": "sdafwf"
                    },
                    {
                        "id": 1710481834005,
                        "value": "task1"
                    },
                ]
            };
            await route.fulfill({ json });
        });
        await page.goto('http://localhost:5173/');
        await page.getByPlaceholder('Username').fill('user');
        await page.getByPlaceholder('Password').fill('password');
        await page.getByRole('button', { name: 'Login' }).click();
        await page.getByPlaceholder('Add todo').fill('task1');
        await page.getByRole('button', { name: 'Add todo' }).click();
        await expect(page.getByRole('list')).toContainText('task1');
    })

})

test.describe('API tests', () => {
    test('Get todos', async ({ request }) => {
        const todos = await request.get('http://localhost:3000/todos');
        expect(todos.ok()).toBeTruthy();
        const todosVal = await todos.json();
        expect(todosVal).toHaveProperty('todos');
        expect(todosVal.todos).toContainEqual(
            { "id": 47, "value": "Task 47" }
        )
    })

    test('Add todo', async ({ request }) => {
        const newTodo = await request.post('http://localhost:3000/addTodo', {
            data: {
                id: 1,
                value: 'Task 1'
            }
        })
        expect(newTodo.ok()).toBeTruthy();

        const todos = await request.get('http://localhost:3000/todos');
        expect(todos.ok()).toBeTruthy();

        const todosVal = await todos.json();
        expect(todosVal).toHaveProperty('todos');
        expect(todosVal.todos).toContainEqual(
            { "id": 1, "value": "Task 1" }
        )
    })
})
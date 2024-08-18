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

})
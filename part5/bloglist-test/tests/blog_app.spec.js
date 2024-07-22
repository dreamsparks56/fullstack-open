const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('http://localhost:3003/api/testing/reset')
    await request.post('http://localhost:3003/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'what'
      }
    })
  
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    await page.getByRole('button', { name: 'login' }).click()
    await expect(page.getByText('log in to application')).toBeVisible()
    await expect(page.getByText('username')).toBeVisible()
    await expect(page.getByText('password')).toBeVisible()
  })

  describe('Login', () => {
    test('succeeds with correct credentials', async ({ page }) => {
      await loginWith(page, 'root', 'what')
      await expect(page.getByText('Superuser logged in')).toBeVisible()
    })

    test('fails with wrong credentials', async ({ page }) => {
      await loginWith(page, 'root', 'wrong')
      const errorDiv = await page.locator('.error')      
      await expect(errorDiv).toContainText('Wrong credentials')
      await expect(errorDiv).toHaveCSS('border-style', 'solid')
      await expect(errorDiv).toHaveCSS('color', 'rgb(255, 0, 0)')
    })    
  })

  describe('When logged in', () => {
    beforeEach(async ({ page }) => {      
      await loginWith(page, 'root', 'what')
    })
  
    test('a new blog can be created', async ({ page }) => {
      
      await page.getByRole('button', { name: 'create new' }).click()    
      await page.getByTestId('title').fill('Title')
      await page.getByTestId('author').fill('Author')
      await page.getByTestId('url').fill('url.com')
      await page.getByRole('button', { name: 'save' }).click()

      await expect(page.getByText('Title Author')).toBeVisible()
    })
    
  })
})

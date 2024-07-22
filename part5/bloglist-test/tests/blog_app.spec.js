const { test, expect, beforeEach, describe } = require('@playwright/test')
const { loginWith, newForm } = require('./helper')

describe('Blog app', () => {
  beforeEach(async ({ page, request }) => {
    await request.post('/api/testing/reset')
    await request.post('/api/users', {
      data: {
        name: 'Superuser',
        username: 'root',
        password: 'what'
      }
    })
  
    await page.goto('/')
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
      await newForm(page, 'Title', 'Author', 'url.com')
      await expect(page.getByText('Title Author')).toBeVisible()
    })

    describe('and there is a blog', () => {
      beforeEach(async ({ page }) => {
        await newForm(page, 'Title', 'Author', 'url.com')
      })
    
      test.only('the existing blog can be deleted', async ({ page }) => {
        page.on('dialog', dialog => dialog.accept());
        const collapsedBlogElement =  await page.getByText('Title Author')
          .locator('..')
        await collapsedBlogElement.getByRole('button', { name: 'expand' }).click()
        const expandedBlogElement = await page.getByText('Title Author')
          .locator('..')
        await expandedBlogElement.getByRole('button', { name: 'remove' }).click()

        await expect(page.getByText('Title by Author was successfully deleted')).toBeVisible()
      })
    })
    
  })
})

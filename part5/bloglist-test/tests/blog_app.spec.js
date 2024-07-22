const { test, expect, beforeEach, describe } = require('@playwright/test')
const { newUser, loginWith, newBlog, expandBlog } = require('./helper')

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
      await newBlog(page, 'Title', 'Author', 'url.com')
      await expect(page.getByText('Title Author')).toBeVisible()
    })

    describe('and there is a blog', () => {
      beforeEach(async ({ page }) => {
        await newBlog(page, 'Title', 'Author', 'url.com')
      })

      describe('blog operations', () => {
        beforeEach(async ({ page }) => {
          await expandBlog(page, 'Title Author')
        })

        test('the existing blog can be liked', async ({ page }) => {
          page.on('dialog', dialog => dialog.accept());        
          const expandedBlogElement = await page.getByText('Title Author')
            .locator('..')
          await expandedBlogElement.getByRole('button', { name: 'like' }).click()
  
          await expect(page.getByTestId('likes')).toContainText('1')
        })

        test('the existing blog can be deleted', async ({ page }) => {
          page.on('dialog', dialog => dialog.accept());        
          const expandedBlogElement = await page.getByText('Title Author')
            .locator('..')
          await expandedBlogElement.getByRole('button', { name: 'remove' }).click()
  
          await expect(page.getByText('Title by Author was successfully deleted')).toBeVisible()
        })
      })

      test.only('the existing blog can only be deleted by its creator', async ({ page, request }) => {
        await page.getByRole('button', {name : 'logout'}).click() 
        await request.post('/api/users', {
          data: {
            name: 'Guest User',
            username: 'guest',
            password: '12345'
          }
        })
        await loginWith(page, 'guest', '12345')
        await expandBlog(page, 'Title Author')
        const expandedBlogElement = await page.getByText('Title Author')
            .locator('..')
          await expect(expandedBlogElement).not.toHaveText('remove')
      })
      
    })
    
  })
})

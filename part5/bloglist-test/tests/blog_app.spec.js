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
      await page.getByText('blogs').waitFor()

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

      test('the existing blog can only be deleted by its creator', async ({ page, request }) => {
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

    describe('and there are many blogs', () => {
      const maxBlogs = 5
      beforeEach(async ({ page }, testInfo) => {
        testInfo.setTimeout(testInfo.timeout + 7000)
        let blog = 1;
        while(blog <= maxBlogs) {
          await newBlog(page, `Title ${blog}`, 'Author', 'url.com')
          await page.getByText(`Title ${blog} Author`).waitFor()
          blog++
        }
      })

      test('the existing blogs can be sorted by likes', async ({ page }) => {
        for(let blog = maxBlogs; blog > 0; blog--) {
          const blogTitle = `Title ${blog} Author`;
          await expandBlog(page, blogTitle)
          const expandedBlogElement = await page.getByText(blogTitle)
            .locator('..')
            for(let i = 1; i <= blog; i++) {
              await expandedBlogElement.getByRole('button', { name: 'like' }).click()
              await expandedBlogElement.getByTestId('likes').getByText(i).waitFor()
            }
        }

        await page.getByRole('button', { name: 'sort by likes' }).click()

        const blogs = await page.getByText(/Title \d Author/)
          .locator('..')        
          .filter({ has: page.getByRole('button', { name: 'collapse' }) })
          .all()
        for(let i = 0; i < maxBlogs; i++) {
          await expect(blogs[i].getByTestId('likes')).toContainText(`${maxBlogs - i}`)          
        }
      })



    })
    
  })
})

const loginWith = async (page, username, password)  => {
    await page.getByRole('button', { name: 'login' }).click()
    await page.getByTestId('username').fill(username)
    await page.getByTestId('password').fill(password)
    await page.getByRole('button', { name: 'login' }).click()
  }

  const newBlog = async (page, title, author, url)  => {
    const createNew = page.getByRole('button', { name: 'create new' })
    if (await createNew.isVisible())
      await createNew.click()
    await page.getByTestId('title').fill(title)
    await page.getByTestId('author').fill(author)
    await page.getByTestId('url').fill(url)
    await page.getByRole('button', { name: 'save' }).click()
  }

  const expandBlog = async (page, text) => {
    const collapsedBlogElement = await page.getByText(text)
    .locator('..')
  .filter({ has: page.getByRole('button', { name: 'expand' }) })
    await collapsedBlogElement.getByRole('button', { name: 'expand' }).click()
  }
  
  export { loginWith, newBlog, expandBlog }
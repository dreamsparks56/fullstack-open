import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('Blog', () => {
  const blog = {
    title: 'New title',
    author: 'New author',
    url: 'www.url.com',
    likes: 0,
    user: {
      name: 'usw3rn4m3'
    }
  }

  test('renders content right initially', () => {
    const { container } = render(<Blog blog={blog} />)
    const div = container.querySelector('.blog')

    expect(div).toHaveTextContent(
      'New title'
    )
    expect(div).toHaveTextContent(
      'New author'
    )
    expect(div).not.toHaveTextContent(
      'www.url.com'
    )
    expect(div).not.toHaveTextContent(
      '0'
    )
  })

  test('renders content right after expanding', async () => {
    const { container } = render(<Blog blog={blog} verifyId={() => false} />)

    const div = container.querySelector('.blog')
    const toggler = screen.getByText('expand')

    await userEvent.click(toggler)
    screen.debug()

    expect(div).toHaveTextContent(
      'www.url.com'
    )
    expect(div).toHaveTextContent(
      '0'
    )
  })

  test('update calls are being handled', async () => {
    const mockUpdateHandler = vi.fn()
    const { container } = render(<Blog blog={blog} updateBlog={mockUpdateHandler} verifyId={() => false} />)

    const toggler = screen.getByText('expand')
    await userEvent.click(toggler)

    const likes = screen.getByText('like')
    await userEvent.click(likes)
    expect(mockUpdateHandler.mock.calls).toHaveLength(1)
    await userEvent.click(likes)
    expect(mockUpdateHandler.mock.calls).toHaveLength(2)


  })
})


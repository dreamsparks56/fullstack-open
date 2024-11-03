import { useState } from "react";
import { useDispatch } from "react-redux";
import { createBlog } from "../reducers/blogReducer";
import { setNotification } from "../reducers/notificationReducer";
import { Button, Card, Input, Stack } from "@chakra-ui/react";

const BlogForm = () => {
  const [newBlogTitle, setNewBlogTitle] = useState("");
  const [newBlogAuthor, setNewBlogAuthor] = useState("");
  const [newBlogURL, setNewBlogURL] = useState("");

  const dispatch = useDispatch();
  const addBlog = (event) => {
    event.preventDefault();

    const newBlog = {
      title: newBlogTitle,
      author: newBlogAuthor,
      url: newBlogURL,
    };

    dispatch(createBlog(newBlog));
    dispatch(
      setNotification(
        `a new blog ${newBlog.title} by ${newBlog.author} added`,
        true,
      ),
    );
    setNewBlogTitle("");
    setNewBlogAuthor("");
    setNewBlogURL("");
  };

  return (
    <Card.Root variant={"elevated"} m="4">
      <form onSubmit={addBlog}>
        <Card.Body>
          <h2>create new</h2>
          <Stack gap="4" align="flex-start" maxW="sm">
            <Input
              data-testid="title"
              value={newBlogTitle}
              onChange={(event) => setNewBlogTitle(event.target.value)}
              placeholder="insert a title..."
            />
            <Input
              data-testid="author"
              value={newBlogAuthor}
              onChange={(event) => setNewBlogAuthor(event.target.value)}
              placeholder="insert the author..."
            />
            <Input
              data-testid="url"
              value={newBlogURL}
              onChange={(event) => setNewBlogURL(event.target.value)}
              placeholder="insert the URL..."
            />
          </Stack>
        </Card.Body>
        <Card.Footer>
          <Button colorPalette="blue" type="submit">
            save
          </Button>
        </Card.Footer>
      </form>
    </Card.Root>
  );
};
export default BlogForm;

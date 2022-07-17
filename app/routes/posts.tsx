import type { LoaderFunction } from '@remix-run/node';
import { Outlet, useLoaderData } from '@remix-run/react';
import type { FC } from 'react';
import type { Post } from '../typings';
import { getPostBySlug } from '../post-manager';
import { Tag, Tags } from '../components/tags';

const P: FC = ({ children }) => <p className="mb-4">{children}</p>;

const Button: FC<{ href: string }> = (props) => (
  // eslint-disable-next-line jsx-a11y/anchor-has-content
  <a
    className="px-8 py-1 border-matze border-solid border-2 rounded-xl block w-60 text-center"
    {...props}
  />
);

export const loader: LoaderFunction = async ({ request }) => {
  // const slug = params.slug;
  const url = new URL(request.url);
  const slug = url.pathname.replace('/posts/', '');
  console.log(slug);
  const item = await getPostBySlug(slug);
  if (!item) {
    throw new Response('Not Found', {
      status: 404,
    });
  }
  return item;
};

export default function PostPage() {
  const post = useLoaderData<Post>();
  console.log(post);

  return (
    <div className="max-w-2xl">
      <div className="mt-10 mb-10">
        <p className="text-sm">
          <a href="/" className={`text-matze`}>
            {post.category}
          </a>
        </p>
        <h2 className="text-xl font-bold">{post.title}</h2>
      </div>
      <div className="font-light text-base">
        <Outlet />
      </div>
      <Tags>
        {(post.tags || []).map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </Tags>
      <div className="mt-8 text-right opacity-50">
        <p className="text-sm py-0">
          {post.chars} chars, {post.words} words
        </p>
        <p className="text-sm py-0">
          released: {new Date(post.date).toDateString()}
        </p>
      </div>
      <ul className="flex gap-4 justify-center mt-24">
        <li>
          <Button href="/">Previous</Button>
        </li>
        <li>
          <Button href="/">Next</Button>
        </li>
      </ul>
    </div>
  );
}

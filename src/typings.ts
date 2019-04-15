export interface ArticleEntity {
  fields: {
    slug: string;
  };
  frontmatter: {
    title: string;
    description: string;
    category?: string;
    date?: string;
    keywords?: string[];
    image: { childImageSharp: { fluid: any } };
  };
}

export interface ArticleNode {
  node: ArticleEntity;
}

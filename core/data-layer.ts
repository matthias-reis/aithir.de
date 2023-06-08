import { ItemMeta, PostMeta, StorylineMeta } from './types';
import metaData from './data-layer.json';

function isVisible(post: PostMeta) {
  return post.placeholder || new Date(post.date || 0) <= new Date();
}

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-');
}

function getMetaData(): Record<string, StorylineMeta> {
  return metaData as Record<string, StorylineMeta>;
}

export function getAllStorylines(): StorylineMeta[] {
  const metaData = getMetaData();
  return (
    Object.values(metaData)
      // remove posts and replace them with a count to optimize data
      .map(({ posts, ...rest }) => ({
        ...rest,
        posts: (posts || [])
          .filter(isVisible)
          .map((post, i) => ({ ...post, episode: i + 1 })),
      }))
      // sort by age and number of posts
      .sort((a, b) => {
        const aWeight = a.weight || 0;
        const bWeight = b.weight || 0;
        if (aWeight !== bWeight) {
          return bWeight - aWeight;
        }
        const aAgeIndicator = getAgeIndicator(a);
        const bAgeIndicator = getAgeIndicator(b);
        return bAgeIndicator + b.count - aAgeIndicator - a.count;
      })
      // remove storylines that are not yet published
      .filter((s) => s.count !== 0)
  );
}

export function getAllPosts(): PostMeta[] {
  const metaData = getMetaData();
  return Object.values(metaData)
    .map(({ posts }) => posts || [])
    .flat()
    .filter(Boolean)
    .sort((a, b) => (new Date(b.date || '') > new Date(a.date || '') ? 1 : -1));
}

export function getAllTags() {
  const posts = getAllPosts();
  const storylines = getAllStorylines();

  const tags = {} as Record<
    string,
    { storylines: StorylineMeta[]; posts: PostMeta[] }
  >;

  for (const post of posts) {
    if (new Date(post.date || Date.now()) <= new Date() && !post.placeholder) {
      for (const tag of post.tags ?? []) {
        if (!tags[tag]) {
          tags[tag] = { posts: [], storylines: [] };
        }
        tags[tag].posts.push(post);
      }
    }
  }
  for (const storyline of storylines) {
    for (const tag of storyline.tags ?? []) {
      if (!tags[tag]) {
        tags[tag] = { posts: [], storylines: [] };
      }
      tags[tag].storylines.push(storyline);
    }
  }
  return Object.entries(tags)
    .map(([name, entries]) => {
      const posts = entries.posts.map(getItemFromPost);
      const storylines = entries.storylines.map(getItemFromStoryline);
      return {
        name,
        slug: slugify(name),
        count: storylines.length + posts.length,
        posts,
        storylines,
      };
    })
    .sort((a, b) => b.count - a.count);
}

function getAgeIndicator(storyline: StorylineMeta) {
  const ages =
    storyline.posts
      ?.map((p) => {
        const ageInDays =
          (new Date().getTime() - new Date(p.date || '').getTime()) /
          (1000 * 60 * 60 * 24);
        return ageInDays;
      })
      .filter((age) => age > 0)
      .map((age) => 30 - age)
      .sort((a, b) => b - a)
      .filter((ageIndicator) => {
        return ageIndicator > 0;
      }) ?? [];
  const ageIndicator = ages.reduce((sum, next) => sum + next, 0);
  return ageIndicator;
}

export function getItemFromPost(p: PostMeta): ItemMeta {
  const item: ItemMeta = {
    path: `/storylines/${p.slug}`,
    title: p.name,
    superTitle: `${p.storyline.name}, pt. ${p.episode}`,
    date: p.date,
    type: 'post',
    image: `/strips/${p.storyline.slug}.jpg`,
    text: p.md.split(' ').slice(0, 20).join(' ') + ` ...`,
    seed: seed(p.name),
  };

  item.factors = factors(item);
  return item;
}

export function getItemFromStoryline(s: StorylineMeta): ItemMeta {
  const item: ItemMeta = {
    path: `/storylines/${s.slug}`,
    title: s.name,
    type: s.type || 'storyline',
    image: `/strips/${s.slug}.jpg`,
    text: s.description,
    seed: seed(s.name),
  };

  if (s.weight) {
    item.weight = s.weight.toString();
  }
  item.factors = factors(item);
  return item;
}

function seed(title: string) {
  const salt = new Date().toDateString();
  const buffer = Array.from(`${title} ${salt}`);
  const value = buffer.reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // we take the third decimal place and downwards
  const seed = Math.sin(value) * 1000;
  // const hash = seed;
  // const hash = seed - Math.floor(seed);
  const hash = seed - Math.floor(seed);

  return hash;
}

function factors(item: ItemMeta) {
  // that's the randomizer. It will create a fresh order every day (hopefully)
  const seedFactor = item.weight ? parseFloat(item.weight) : item.seed!;

  // posts have an age and posts older than 60 days are not shown
  // we consider storylines to be 7 days old
  const age = item.date
    ? (Date.now() - new Date(item.date).getTime()) / (1000 * 60 * 60 * 24)
    : 7;
  const ageFactor = age > 60 ? 0 : (60 - age) / 60;

  // if the type is storyline, it is assumed to be an overview page which
  // should weigh less than an art directed page.
  const storylineFactor = item.type === 'storyline' ? 0.7 : 1;

  return {
    product: Math.sqrt(seedFactor) * ageFactor * storylineFactor,
    factors: [seedFactor, ageFactor, storylineFactor],
  };
}

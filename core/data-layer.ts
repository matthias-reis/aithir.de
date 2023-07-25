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
  );
}

export const getStorylineDetailed = (slug: string) => {
  const metaData = getMetaData();
  const storyline = metaData[slug];
  const related = (storyline.related || []).map(getStoryline);

  return { storyline, related };
};

export const getStoryline = (slug: string) => {
  const metaData = getMetaData();
  return getItemFromStoryline(metaData[slug]);
};

export function getAllPosts(): PostMeta[] {
  const metaData = getMetaData();
  return Object.values(metaData)
    .map(({ posts }) => posts || [])
    .flat()
    .filter(Boolean)
    .sort((a, b) => (new Date(b.date || '') > new Date(a.date || '') ? 1 : -1));
}

export function getAllItems(): ItemMeta[] {
  const posts: ItemMeta[] = getAllPosts()
    .filter(
      (post) =>
        new Date(post.date || Date.now()) <= new Date() && !post.placeholder
    )
    .map(getItemFromPost);

  const storylines: ItemMeta[] = getAllStorylines()
    // only show english storylines
    .filter((s) => s.language !== 'de')
    .map(getItemFromStoryline);

  const items = [...posts, ...storylines]
    .filter((item) => item.factors!.product > 0)
    .sort((a, b) => b.factors!.product - a.factors!.product);

  return items;
}

export function getAllTags() {
  const items = getAllItems();
  const tags = {} as Record<string, ItemMeta[]>;

  for (const item of items) {
    for (const tag of item.tags ?? []) {
      if (!tags[tag]) {
        tags[tag] = [];
      }
      tags[tag].push(item);
    }
  }

  return Object.entries(tags)
    .map(([name, items]) => {
      return {
        name,
        slug: slugify(name),
        count: items.length,
        items,
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
    tags: [...(p.tags || []), ...(p.storylineTags || [])],
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
    tags: s.tags || [],
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
    factors: { seedFactor, ageFactor, storylineFactor },
  };
}

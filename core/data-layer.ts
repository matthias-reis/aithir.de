import { ItemMeta } from './types';
import rawMetaData from './data-layer.json';

const metaData = Object.fromEntries(
  Object.entries(rawMetaData as Record<string, ItemMeta>)
    .map(seed)
    .map(factors)
    .sort((a, b) => (b[1].factors?.overall ?? 1) - (a[1].factors?.overall ?? 1))
);

export function getAllItems() {
  return Object.values(metaData).sort(
    (a, b) => (b.factors?.overall ?? 1) - (a.factors?.overall ?? 1)
  );
}

export function getStories() {
  return getPublicItems().filter((i) => i.type === 'storyline');
}

export function getTextPosts() {
  return getPublicItems().filter((i) => i.type === 'storyline');
}

export function getPhotoPosts() {
  return getPublicItems().filter((i) => i.type === 'photo');
}

export function getVisibleItems() {
  return getPublicItems().filter((i) => i.factors?.overall ?? 0 > 0);
}

export function getPublicItems() {
  return getAllItems()
    .filter((i) => !i.hidden)
    .filter((i) => (i.language ?? 'en') !== 'de');
}

export function getPosts() {
  return getPublicItems()
    .filter((i) => i.type !== 'storyline')
    .sort(
      (a, b) =>
        new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
    );
}

export function getItem(slug: string) {
  return metaData[slug];
}

export const getItemsBySlugs = (slugs: string[]) =>
  slugs
    .map(getItem)
    .filter(Boolean)
    .sort(
      (a, b) =>
        new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
    );

export const getItemsByCategory = (category?: string) =>
  category
    ? getPublicItems()
        .filter((i) => i.category === category)
        .sort(
          (a, b) =>
            new Date(b.date ?? '').getTime() - new Date(a.date ?? '').getTime()
        )
    : [];

export function getTags() {
  const tags = {} as Record<string, ItemMeta[]>;

  for (const item of getPublicItems()) {
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

export function getTagByTagSlug(slug: string) {
  const tags = Object.fromEntries(getTags().map((t) => [t.slug, t]));
  return tags[slug];
}
export function getTagsByTagSlugs(tagNames: string[]) {
  const tags = Object.fromEntries(getTags().map((t) => [t.slug, t]));
  const slugs = tagNames.map(slugify);
  return slugs.map((slug) => tags[slug]).filter(Boolean);
}

function seed(entry: [string, ItemMeta]): [string, ItemMeta] {
  const salt = new Date().toDateString();
  const buffer = Array.from(`${entry[0]} ${salt}`);
  const value = buffer.reduce((acc, char) => acc + char.charCodeAt(0), 0);
  // we take the third decimal place and downwards
  const extraction = Math.sin(value) * 1000;
  // weight is a manual seed override
  const seed = entry[1].weight || extraction - Math.floor(extraction);

  return [entry[0], { ...entry[1], seed }];
}

function factors(entry: [string, ItemMeta]): [string, ItemMeta] {
  const seedFactor = entry[1].seed || 0;

  const progressFactor = entry[1].unfinished === true ? 0.5 : 1;

  // posts have an age and posts older than 60 days are not shown
  // we consider storylines to be 7 days old
  const age = entry[1].date
    ? (Date.now() - new Date(entry[1].date).getTime()) / (1000 * 60 * 60 * 24)
    : 7;
  let ageFactor = 0.95 * Math.pow(Math.E, -0.05 * age) + 0.05;

  // certain types are not supposed to be shown at all, others have certain penalties
  let typeFactor = 0.7;

  if (entry[1].type === 'storyline') {
    ageFactor = 53 / 60;
    typeFactor = 0.85;
  }
  if (entry[1].type === 'magazine') {
    ageFactor = 53 / 60;
    typeFactor = 1;
  }
  if (entry[1].type === 'addenum') {
    typeFactor = 0;
  }
  const overall =
    Math.sqrt(seedFactor) * ageFactor * typeFactor * progressFactor;

  return [
    entry[0],
    {
      ...entry[1],
      factors: { overall, seedFactor, ageFactor, typeFactor, progressFactor },
    },
  ];
}

function slugify(s: string) {
  return s.toLowerCase().replace(/ /g, '-');
}

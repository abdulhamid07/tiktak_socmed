import sanityClient from '@sanity/client';

export const client = sanityClient({
  projectId: 'lznxkvgl',
  dataset: 'production',
  apiVersion: '2022-11-19',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

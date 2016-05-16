import makeFinalStore from 'alt-utils/lib/makeFinalStore';

/* eslint-disable no-console */

export default function (alt, storage, storeName) {
  const finalStore = makeFinalStore(alt);

  try {
    alt.bootstrap(storage.get(storeName));
  } catch (e) {
    console.error('Failed to bootstrap data', e);
  }

  finalStore.listen(() => {
    storage.set(storeName, alt.takeSnapshot());
  });
}

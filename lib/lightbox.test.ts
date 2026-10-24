import test from 'node:test';
import assert from 'node:assert/strict';
import { getNextIndex, getPrevIndex, getHighResImageUrl } from './lightbox.ts';

test('getNextIndex advances correctly and wraps around', () => {
  assert.equal(getNextIndex(0, 4), 1);
  assert.equal(getNextIndex(1, 4), 2);
  assert.equal(getNextIndex(3, 4), 0); // wrap around
  assert.equal(getNextIndex(0, 0), 0);
});

test('getPrevIndex moves backward correctly and wraps around', () => {
  assert.equal(getPrevIndex(2, 4), 1);
  assert.equal(getPrevIndex(1, 4), 0);
  assert.equal(getPrevIndex(0, 4), 3); // wrap around
  assert.equal(getPrevIndex(0, 0), 0);
});

test('getHighResImageUrl upgrades Unsplash width and quality parameters', () => {
  const lowRes = 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?auto=format&fit=crop&w=900&q=85';
  const highRes = getHighResImageUrl(lowRes);
  assert.ok(highRes.includes('w=2400'));
  assert.ok(highRes.includes('q=95'));
  assert.ok(highRes.includes('auto=format'));

  // Non-unsplash URLs pass through safely
  const normalUrl = 'https://example.com/image.jpg';
  assert.equal(getHighResImageUrl(normalUrl), normalUrl);
  assert.equal(getHighResImageUrl(''), '');
});

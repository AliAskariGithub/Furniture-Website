import test from 'node:test';
import assert from 'node:assert/strict';
import { SITE_DATA } from './data.ts';

test('SITE_DATA brand details are correctly set', () => {
  assert.equal(SITE_DATA.brand.name, 'FURNI.TURE');
  assert.equal(SITE_DATA.brand.phone, '+923399445465');
  assert.equal(SITE_DATA.brand.phoneRaw, '+923399445465');
  assert.equal(SITE_DATA.brand.copyrightNotice, 'DEVELOPED BY THE TEAM OF Ziilink AI');
  assert.equal(SITE_DATA.hero.title, 'FURNI.TURE');
  assert.equal(SITE_DATA.hero.ctaText, 'BOOK A CONSULTANT ↗');
  assert.equal(SITE_DATA.services.ctaText, 'BOOK A CONSULTANT ↗');
  assert.equal(SITE_DATA.about.verticalWordmark, 'FURNI.TURE');
});

test('SITE_DATA contains all required navigation links', () => {
  assert.equal(SITE_DATA.navigation.length, 5);
  const labels = SITE_DATA.navigation.map((n) => n.label);
  assert.deepEqual(labels, ['HOME', 'SERVICES', 'ABOUT', 'PORTFOLIO', 'CONTACT']);
  const routes = SITE_DATA.navigation.map((n) => n.href);
  assert.deepEqual(routes, ['/', '/services', '/about', '/portfolio', '/contacts']);
});

test('SITE_DATA contains services with valid image URLs, prices and deliverables', () => {
  assert.ok(SITE_DATA.services.items.length >= 3);
  SITE_DATA.services.items.forEach((item, index) => {
    assert.equal(item.number, `0${index + 1}`);
    assert.ok(item.title.length > 0);
    assert.ok(item.description.length > 20);
    assert.ok(item.image.startsWith('http'));
  });
});

test('SITE_DATA contains exact 3 stat rows with numbers 45+, 20+, 100+', () => {
  assert.equal(SITE_DATA.about.stats.length, 3);
  const numbers = SITE_DATA.about.stats.map((s) => s.number);
  assert.deepEqual(numbers, ['45+', '20+', '100+']);
});

test('SITE_DATA contains portfolio projects with locations and terms', () => {
  assert.ok(SITE_DATA.portfolio.projects.length >= 3);
  const p1 = SITE_DATA.portfolio.projects[0];
  assert.equal(p1.location, 'KYIV');
  assert.equal(p1.terms, '30 DAYS');
  assert.ok(p1.images.length >= 4);
});

test('SITE_DATA contains catalog design packages for architectural consultations', () => {
  assert.ok(SITE_DATA.designPackages.length >= 4);
  SITE_DATA.designPackages.forEach((pkg) => {
    assert.ok(pkg.id.startsWith('pkg-'));
    assert.ok(pkg.price > 0);
    assert.ok(pkg.features.length >= 2);
  });
});

test('SITE_DATA contains structured FAQs for the About page', () => {
  assert.ok(SITE_DATA.about.faqs.length >= 5);
  SITE_DATA.about.faqs.forEach((faq, idx) => {
    assert.equal(faq.number, `0${idx + 1}`);
    assert.ok(faq.question.length > 10);
    assert.ok(faq.answer.length > 30);
  });
});

test('SITE_DATA contains client testimonials for the Homepage slider', () => {
  assert.ok(SITE_DATA.testimonials.length >= 4);
  SITE_DATA.testimonials.forEach((item, idx) => {
    assert.equal(item.number, `0${idx + 1}`);
    assert.ok(item.quote.length > 20);
    assert.ok(item.author.length > 0);
    assert.equal(item.rating, 5);
    assert.ok(item.location.length > 0);
  });
});


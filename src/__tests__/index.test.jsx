import { beforeEach, expect, test } from 'vitest';
import { render, screen } from '@testing-library/react';
import App from '../App';
import fs from 'fs';
import path from 'path';

let dom;
let document;

const app = fs
  .readFileSync(path.resolve(__dirname, '../App.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

const karakter = fs
  .readFileSync(path.resolve(__dirname, '../components/Karakter.jsx'), 'utf8')
  .replaceAll(/(?:\r\n|\r|\n| )/g, '');

beforeEach(() => {
  dom = render(<App />);
  document = dom.container;
});

// TASK 1 TESTLERİ

test('Program hatasız bir şekilde çalışıyor', () => {
  screen.getByText(/Karakterler/i);
});

test("1.1 App.jsx'de useEffect kullanılmış ve sayfa mount olduğunda karakterler yükleniyor.", () => {
  expect(app.includes('useEffect(')).toBe(true);
  expect(app.includes(',[])')).toBe(true);
});

test("1.2 useEffect'de axios import edilmiş ve kullanılmış.", () => {
  const part = app.split('useEffect(')[1];
  expect(app.includes('importaxiosfrom')).toBe(true);
  expect(part.includes('axios.get(')).toBe(true);
  expect(
    part.includes('https://workintech-fe-ecommerce.onrender.com/characters')
  ).toBe(true);
});

test("1.3 useEffect'de axios get isteği atıyor.", () => {
  const part = app.split('useEffect(')[1];
  expect(part.includes('axios.get(')).toBe(true);
  expect(
    part.includes('https://workintech-fe-ecommerce.onrender.com/characters')
  ).toBe(true);
});

test('1.4 Başlangıç değeri boş array olan 2 tane state tanımlanmış', () => {
  const parts = app.split('useState([])');
  expect(parts).toHaveLength(3);
});

test("2.1 Karakter'in filmleri için .map kullanılmış.", () => {
  expect(karakter.includes('.films.map(')).toBe(true);
});

test("2.2 Karakter'in film bilgileri .find metodu ile filmler datasından bulunuyor.", () => {
  expect(karakter.includes('.find(')).toBe(true);
});

test("2.3 Karakter'in film bilgileri için Film component'i kullanılmış", () => {
  expect(karakter.includes('<Film')).toBe(true);
});

test('3.1 Karakter sayfasında styled-components import edilmiş.', () => {
  expect(karakter.includes('importstyledfrom')).toBe(true);
});

test('3.2 Karakter sayfasında styled-component olarak KarakterCard oluşturulmuş ve kullanılmış.', () => {
  expect(karakter.includes('constKarakterCard')).toBe(true);
  expect(karakter.includes('<KarakterCard>')).toBe(true);
  expect(karakter.includes('</KarakterCard>')).toBe(true);
});

test("3.3 Karakter sayfasında styled-component olarak Paragraf component'i p tagi için oluşturulmuş ve kullanılmış.", () => {
  expect(karakter.includes('constParagraf')).toBe(true);
  expect(karakter.includes('<Paragraf>')).toBe(true);
  expect(karakter.includes('</Paragraf>')).toBe(true);
});

test("3.4 Karakter sayfasında .label class'ı için styled-component olarak Label oluşturulmuş ve kullanılmış.", () => {
  expect(karakter.includes('constLabel')).toBe(true);
  expect(karakter.includes('<Label>')).toBe(true);
  expect(karakter.includes('</Label>')).toBe(true);
});

test("3.5 Karakter sayfasında .value class'ı için styled-component olarak Value oluşturulmuş ve kullanılmış.", () => {
  expect(karakter.includes('constValue')).toBe(true);
  expect(karakter.includes('<Value>')).toBe(true);
  expect(karakter.includes('</Value>')).toBe(true);
});

-- ГЛИБОКО — переорієнтація каталогу послуг під новий мокап клієнта.
--
-- Озонування переходить з об'єктної категоризації (квартири/авто/офіси/...)
-- на проблемно-орієнтовану (після пожежі/потопу/запахи тварин/...) — старі
-- об'єктні категорії лишаються на сторінці як легкий список "Де
-- використовується озонування" (статичний контент, не в БД).
-- Хімчистка отримує розширений перелік (10 замість 6).
--
-- Ціна 3000 грн — тимчасовий плейсхолдер (клієнт надасть реальні ціни
-- пізніше), фото — тимчасове перевикористання наявних Unsplash-заглушок
-- (підбір фінальних фото — окремий наступний захід).

delete from services;

insert into services (category, slug, title, description, price_from, icon, image_url, sort_order) values
  ('ozone', 'pislya-pozhezhi', 'Після пожежі', 'Усуває запах диму та гару, очищує повітря та поверхні від токсичних речовин.', 3000, 'flame', 'https://images.unsplash.com/photo-1754613389131-ea9b5f234cda?fm=jpg&q=80&w=700&auto=format&fit=crop', 1),
  ('ozone', 'pislya-potopu', 'Після потопу', 'Прибирає запах вологи, затхлості, запобігає появі плісняви та грибка.', 3000, 'droplets', 'https://images.unsplash.com/photo-1758228655476-6b51e2303a0e?fm=jpg&q=80&w=700&auto=format&fit=crop', 2),
  ('ozone', 'plisnyava-ta-grybok', 'Пліснява та грибок', 'Знищує спори плісняви, усуває причину запаху та перешкоджає повторній появі.', 3000, 'shield-alert', 'https://images.unsplash.com/photo-1746021535489-00edc5efb203?fm=jpg&q=80&w=700&auto=format&fit=crop', 3),
  ('ozone', 'zapah-tyutyunu', 'Запах тютюну', 'Повністю нейтралізує запах тютюнового диму, повертає свіжість повітрю та текстилю.', 3000, 'cigarette', 'https://images.unsplash.com/photo-1668089677938-b52086753f77?fm=jpg&q=80&w=700&auto=format&fit=crop', 4),
  ('ozone', 'zapahy-tvaryn', 'Запахи тварин', 'Ефективно усуває стійкі запахи сечі, шерсті та інших органічних забруднень.', 3000, 'paw-print', 'https://images.unsplash.com/photo-1672552226380-486fe900b322?fm=jpg&q=80&w=700&auto=format&fit=crop', 5),
  ('ozone', 'dezinfekciya-prymischen', 'Дезінфекція приміщень', 'Знищує бактерії, віруси, мікроби та алергени. Рекомендовано під час епідемій та сезонних захворювань.', 3000, 'spray-can', 'https://images.unsplash.com/photo-1754613389131-ea9b5f234cda?fm=jpg&q=80&w=700&auto=format&fit=crop', 6),
  ('ozone', 'vid-parazytiv-u-domi', 'Від паразитів у домі', 'Озон ефективно знищує кліщів, бліх, тарганів та їхні яйця без застосування хімії.', 3000, 'bug', 'https://images.unsplash.com/photo-1758228655476-6b51e2303a0e?fm=jpg&q=80&w=700&auto=format&fit=crop', 7),
  ('ozone', 'pidgotovka-dlya-novonarodzhenyh', 'Підготовка для новонароджених', 'Безпечне озонування дитячих кімнат та речей. Без хімії, гіпоалергенно.', 3000, 'baby', 'https://images.unsplash.com/photo-1746021535489-00edc5efb203?fm=jpg&q=80&w=700&auto=format&fit=crop', 8),
  ('ozone', 'zapah-yizhi-ta-kuhni', 'Запах їжі та кухні', 'Усуває запахи приготування їжі, жиру та гару, освіжає повітря на кухнях та в закладах.', 3000, 'utensils', 'https://images.unsplash.com/photo-1668089677938-b52086753f77?fm=jpg&q=80&w=700&auto=format&fit=crop', 9),
  ('ozone', 'pered-prodazhem-orendoyu', 'Перед продажем/орендою', 'Професійне озонування допоможе швидко підготувати приміщення без сторонніх запахів.', 3000, 'tag', 'https://images.unsplash.com/photo-1672552226380-486fe900b322?fm=jpg&q=80&w=700&auto=format&fit=crop', 10),
  ('ozone', 'usunennya-alergeniv', 'Усунення алергенів', 'Озон знищує пилових кліщів, пилок, грибок та інші алергени у повітрі та на поверхнях.', 3000, 'wind', 'https://images.unsplash.com/photo-1754613389131-ea9b5f234cda?fm=jpg&q=80&w=700&auto=format&fit=crop', 11),
  ('ozone', 'dezinfekciya-avto', 'Дезінфекція авто', 'Усуває запахи, бактерії, віруси в салоні авто, кондиціонерах та системі вентиляції.', 3000, 'car', 'https://images.unsplash.com/photo-1758228655476-6b51e2303a0e?fm=jpg&q=80&w=700&auto=format&fit=crop', 12),

  ('dry_cleaning', 'dyvany', 'Дивани', 'Професійна чистка тканинних, велюрових та шкіряних диванів.', 3000, 'sofa', 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?fm=jpg&q=80&w=700&auto=format&fit=crop', 1),
  ('dry_cleaning', 'matratsy', 'Матраци', 'Глибоке очищення від пилу, плям, кліщів та бактерій. Турбота про ваш здоровий сон.', 3000, 'bed-double', 'https://images.unsplash.com/photo-1759176170879-6bd7073ab4f4?fm=jpg&q=80&w=700&auto=format&fit=crop', 2),
  ('dry_cleaning', 'lizhka-ta-stinovi-paneli', 'Ліжка та стінові панелі', 'Делікатне очищення оббивки ліжок та декоративних панелей.', 3000, 'bed', 'https://images.unsplash.com/photo-1618480633001-b81e7ce07f71?fm=jpg&q=80&w=700&auto=format&fit=crop', 3),
  ('dry_cleaning', 'krisla', 'Крісла', 'Видаляємо забруднення та неприємні запахи, відновлюємо зовнішній вигляд.', 3000, 'armchair', 'https://images.unsplash.com/photo-1619719287848-883c8f26efbc?fm=jpg&q=80&w=700&auto=format&fit=crop', 4),
  ('dry_cleaning', 'stiltsi', 'Стільці', 'Чистимо обідні, офісні та барні стільці будь-якої тканини та оббивки.', 3000, 'armchair', 'https://images.unsplash.com/photo-1567538096621-38d2284b23ff?fm=jpg&q=80&w=700&auto=format&fit=crop', 5),
  ('dry_cleaning', 'kylymy', 'Килими', 'Глибоке очищення килимів від пилу, плям та запахів. Повертаємо яскравість кольорів.', 3000, 'layout-grid', 'https://images.unsplash.com/photo-1690268798551-90e0fa935c4d?fm=jpg&q=80&w=700&auto=format&fit=crop', 6),
  ('dry_cleaning', 'shtory', 'Штори', 'Професійна чистка штор, тюлю та портьєр. Без зняття карнизів.', 3000, 'blinds', 'https://images.unsplash.com/photo-1686178827149-6d55c72d81df?fm=jpg&q=80&w=700&auto=format&fit=crop', 7),
  ('dry_cleaning', 'dytyachi-avtokrisla', 'Дитячі автокрісла', 'Безпечне очищення автокрісел від забруднень, плям, бактерій та неприємних запахів.', 3000, 'baby', 'https://images.unsplash.com/photo-1759176170879-6bd7073ab4f4?fm=jpg&q=80&w=700&auto=format&fit=crop', 8),
  ('dry_cleaning', 'vizochky', 'Візочки', 'Чистимо тканинні частини візочків від плям, пилу та бактерій.', 3000, 'baby', 'https://images.unsplash.com/photo-1618480633001-b81e7ce07f71?fm=jpg&q=80&w=700&auto=format&fit=crop', 9),
  ('dry_cleaning', 'deteyling-avto', 'Детейлінг авто', 'Чистка сидінь, стелі, килимків та багажника. Видалення плям і запахів.', 3000, 'car-front', 'https://images.unsplash.com/photo-1619719287848-883c8f26efbc?fm=jpg&q=80&w=700&auto=format&fit=crop', 10);

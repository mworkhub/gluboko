# Фото від клієнта

Зараз картки послуг використовують іконки-плейсхолдери замість фото. Коли клієнт
надасть фотографії, покласти їх сюди під точними іменами нижче (рекомендований
розмір ~800×600, .jpg) і замінити плейсхолдер-блок у
`components/service/ServiceTypeCard.tsx` на `next/image`, що читає поле `image`
з `content/services.ts` — інші файли чіпати не потрібно, шлях уже прописаний.

## ozone/
- apartments.jpg — квартири та будинки
- cars.jpg — автомобілі
- offices.jpg — офіси та кабінети
- hotels.jpg — готелі та номери
- warehouses.jpg — складські приміщення

## dry-cleaning/
- upholstery.jpg — м'які меблі
- carpets.jpg — килими та килимові покриття
- car-seats.jpg — дитячі крісла
- cribs.jpg — дитячі ліжечка
- mattresses.jpg — матраци
- chairs.jpg — стільці

## shared/
- hero.jpg — фото для hero-блоку головної сторінки (опційно)

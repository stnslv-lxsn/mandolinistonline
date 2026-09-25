"""
Ретушь кожи для фото первого экрана: assets/hero-original.jpg → assets/hero.jpg.

Запуск (нужны opencv-python-headless и numpy): python3 scripts/retouch-hero.py
После — npm run images, чтобы пересобрать картинки сайта.

Как устроено:
- маска кожи: цвет кожи в YCrCb ∩ области лица, шеи и руки, заданные вручную под
  этот кадр; глаза, брови, губы и кольцо вырезаны, волосы и одежда в маску не попадают;
- мелкие детали (поры, мелкие морщины, вены на руке) гладит двухпроходный
  bilateral-фильтр — он держит контуры носа, скул, пальцев;
- крупные складки (носогубные, под глазами) смягчает широкий bilateral, подмешанный
  на MID долю — лицо моложе, но не «плоское»;
- на кожу возвращается TEXTURE доля исходной мелкой фактуры, чтобы не было пластика;
- край маски растушёван.
Координаты — для кадра 1331x2000. Другое фото — другие координаты.
"""
import cv2
import numpy as np

SRC, OUT = 'assets/hero-original.jpg', 'assets/hero.jpg'
TEXTURE = 0.30   # сколько исходной мелкой фактуры вернуть
MID = 0.55       # насколько смягчать крупные складки
FEATHER = 61     # растушёвка края маски, px

img = cv2.imread(SRC)
H, W = img.shape[:2]
ycc = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb).astype(np.int16)
Y, Cr, Cb = ycc[..., 0], ycc[..., 1], ycc[..., 2]
skin = (Cr >= 135) & (Cr <= 175) & (Cb >= 85) & (Cb <= 128) & (Y >= 50)

def poly(points):
    return np.array([(x * 2, y * 2) for x, y in points], np.int32)

region = np.zeros((H, W), np.uint8)
cv2.fillPoly(region, [
    poly([(175, 140), (230, 115), (282, 114), (290, 126), (333, 175), (366, 228), (398, 300), (403, 400),
          (395, 470), (365, 505), (300, 535), (245, 530), (200, 505), (160, 460), (140, 380),
          (140, 300), (150, 220)]),  # лицо; правый верх обрезан по пряди волос через лоб
    poly([(215, 505), (300, 535), (295, 575), (230, 570), (200, 540)]),                 # шея
    poly([(300, 520), (395, 475), (402, 500), (410, 570), (420, 620), (405, 680), (370, 740),
          (355, 800), (345, 870), (240, 840), (250, 760), (265, 680), (270, 600), (275, 550)]),  # рука
], 255)

exclude = np.zeros((H, W), np.uint8)
for cx, cy, rx, ry in [(210, 300, 36, 16), (340, 300, 36, 16),   # глаза
                       (205, 265, 50, 14), (340, 265, 50, 14),   # брови
                       (275, 440, 62, 26),                       # губы
                       (380, 575, 24, 16)]:                      # кольцо
    cv2.ellipse(exclude, (cx * 2, cy * 2), (rx * 2, ry * 2), 0, 0, 360, 255, -1)

mask = (skin & (region > 0) & (exclude == 0)).astype(np.uint8) * 255
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((25, 25), np.uint8))
alpha = cv2.GaussianBlur(mask, (FEATHER, FEATHER), 0).astype(np.float32)[..., None] / 255

f = img.astype(np.float32)
fine = cv2.bilateralFilter(img, 0, 36, 10)
fine = cv2.bilateralFilter(fine, 0, 24, 7).astype(np.float32)
wide = cv2.bilateralFilter(img, 0, 22, 28).astype(np.float32)
smooth = fine * (1 - MID) + wide * MID
texture = f - cv2.GaussianBlur(f, (0, 0), 1.2)
skin_out = smooth + TEXTURE * texture
out = f * (1 - alpha) + skin_out * alpha
cv2.imwrite(OUT, np.clip(out, 0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 95])

print(f'{OUT}: маска {float((mask > 0).mean()) * 100:.1f}% кадра')

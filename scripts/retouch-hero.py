"""
Ретушь кожи для фото первого экрана: assets/hero-original.jpg → assets/hero.jpg.

Запуск (нужны opencv-python-headless и numpy): python3 scripts/retouch-hero.py
После — npm run images, чтобы пересобрать картинки сайта.

Как устроено:
- маска кожи: цвет кожи в YCrCb ∩ овал лица и шея, заданные вручную под этот кадр;
  глаза, брови и губы вырезаны из маски, волосы и одежда в неё не попадают;
- сглаживание: двухпроходный мягкий bilateral-фильтр (гладит мелкие неровности, но держит
  контуры носа, скул, подбородка) + 45 % исходной мелкой фактуры, чтобы кожа не стала
  пластиковой;
- край маски растушёван, переход незаметен.
Координаты ниже — для кадра 1706x2560. Другое фото — другие координаты.
"""
import cv2
import numpy as np

SRC, OUT = 'assets/hero-original.jpg', 'assets/hero.jpg'
TEXTURE = 0.45   # сколько исходной мелкой фактуры вернуть на кожу
FEATHER = 81     # растушёвка края маски, px

img = cv2.imread(SRC)
H, W = img.shape[:2]
ycc = cv2.cvtColor(img, cv2.COLOR_BGR2YCrCb).astype(np.int16)
Y, Cr, Cb = ycc[..., 0], ycc[..., 1], ycc[..., 2]
skin = (Cr >= 138) & (Cr <= 172) & (Cb >= 90) & (Cb <= 125) & (Y >= 55)

region = np.zeros((H, W), np.uint8)
cv2.ellipse(region, (944, 620), (216, 320), 0, 0, 360, 255, -1)          # лицо
neck = np.array([(760, 780), (1150, 780), (1130, 960), (1150, 1180), (740, 1180), (760, 960)], np.int32)
cv2.fillPoly(region, [neck], 255)                                          # шея

exclude = np.zeros((H, W), np.uint8)
for cx, cy, rx, ry in [(894, 520, 64, 32), (1096, 544, 64, 32),           # глаза
                       (880, 460, 84, 24), (1104, 480, 84, 24),           # брови
                       (990, 770, 76, 40)]:                               # губы
    cv2.ellipse(exclude, (cx, cy), (rx, ry), 0, 0, 360, 255, -1)

mask = (skin & (region > 0) & (exclude == 0)).astype(np.uint8) * 255
mask = cv2.morphologyEx(mask, cv2.MORPH_OPEN, np.ones((5, 5), np.uint8))
mask = cv2.morphologyEx(mask, cv2.MORPH_CLOSE, np.ones((21, 21), np.uint8))
alpha = cv2.GaussianBlur(mask, (FEATHER, FEATHER), 0).astype(np.float32)[..., None] / 255

smooth = cv2.bilateralFilter(img, 0, 24, 9)
smooth = cv2.bilateralFilter(smooth, 0, 16, 6).astype(np.float32)
f = img.astype(np.float32)
texture = f - cv2.GaussianBlur(f, (0, 0), 1.2)
skin_out = smooth + TEXTURE * texture
out = f * (1 - alpha) + skin_out * alpha
cv2.imwrite(OUT, np.clip(out, 0, 255).astype(np.uint8), [cv2.IMWRITE_JPEG_QUALITY, 95])
print(f'{OUT}: маска {float((mask > 0).mean()) * 100:.1f}% кадра')

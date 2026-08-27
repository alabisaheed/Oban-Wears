// Persistent Cloud Database Bridge for Oban Wears Products Catalog
const defaultInventory = [
  {
    "code": "OB-KF01",
    "featured": true,
    "name": "OB-KF01",
    "category": "Kaftans",
    "price": 160000,
    "discount": 0,
    "desc": "Tailored in premium teal cotton linen featuring an intricate four-leaf geometric chest embroidery panel, structured mandarin collar, and tailored cuffs.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF01/2e4fa091-9a55-499d-aaad-66c90e652aeb.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF01/4e3fda67-bced-4916-8505-b8d5954c1973.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF01/e0922109-3caa-4ef1-bf67-c79691b5a532.jpg"
    ]
  },
  {
    "code": "OB-KF02",
    "featured": true,
    "name": "OB-KF02",
    "category": "Kaftans",
    "price": 175000,
    "discount": 0,
    "desc": "Crafted from structured forest green polished cotton showcasing rich gold and olive placket embroidery with refined long sleeve detailing.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF02/1b71c951-01b5-4c7f-a672-1b00d782aa30.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/31bc0719-5c8b-462e-a291-c711d05d21de.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/597541f6-28e0-4b8b-856b-bc6af056d525.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/7f7f657a-ac0e-417f-947e-2a4c2c85b2db.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/a7fade79-8a88-457f-8a82-dbd4ab668340.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/b9a4e88e-f011-4bf8-b609-358dc8907255.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/eaa23aae-ddcd-43a0-a4cc-07a97a6319ad.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/Photo from Oban Wears(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF02/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF03",
    "name": "OB-KF03",
    "category": "Kaftans",
    "price": 190000,
    "discount": 0,
    "desc": "Vibrant royal blue kaftan styled with delicate vertical chest pintucks and a light blue checkered accent placket.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF03/3fe6999b-4bea-4155-928e-6589c4a19927.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF03/BD13EEE8-ED97-4557-8EE0-074027278FDE.png",
      "assets/products/KAFTAN COLLECTION/OB-KF03/d69bd6ae-292c-485c-a065-b77e61f76628.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF03/ea605811-fb3f-4fc6-807e-8a616830ed60.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF03/Photo from Oban Wears(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF03/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF04",
    "name": "OB-KF04",
    "category": "Kaftans",
    "price": 205000,
    "discount": 0,
    "desc": "Bold navy and royal blue checkered kaftan accented with subtle white pinstriping and a coordinating pocket accent.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF04/b08721c2-b48d-4c1a-9873-dde7badac924.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF04/dff06004-cd10-482e-aa0a-7646f32e482a.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF04/e1837a1e-b1d2-4689-a4f9-4ce074bd16c6.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF04/ede74950-fd4c-4a78-ae4a-587f23e20b6d.JPG",
      "assets/products/KAFTAN COLLECTION/OB-KF04/fc433454-bcf0-44ae-89df-9523cf69800e.jpg"
    ]
  },
  {
    "code": "OB-KF05",
    "name": "OB-KF05",
    "category": "Kaftans",
    "price": 220000,
    "discount": 0,
    "desc": "Dark chocolate brown and burgundy checker weave linen styled with cream topstitching and a clean round neckline.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF05/323edbbf-f326-45b0-8746-deba6fb185c8.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF05/41117C10-A2AB-474F-B94B-905B1F0A5136.png",
      "assets/products/KAFTAN COLLECTION/OB-KF05/52649ef0-75ab-4dbc-8237-27a90b0b36a2.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF05/close up powder blue.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF05/fcf698e1-6026-4b1c-bbe6-923950f08e27.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF05/Full yellow.jpg"
    ]
  },
  {
    "code": "OB-KF06",
    "name": "OB-KF06",
    "category": "Kaftans",
    "price": 235000,
    "discount": 0,
    "desc": "Rich solid black kaftan decorated with intricate gold geometric diamond embroidery along the placket, pocket, and cuffs.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF06/39b3f68e-ba04-4a7a-8efd-95f31fa30eb5.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF06/f030bc10-7f83-4cc8-9e04-ee840127129b(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF06/f030bc10-7f83-4cc8-9e04-ee840127129b.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF06/Photo from Oban Wears(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF06/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF07",
    "name": "OB-KF07",
    "category": "Kaftans",
    "price": 250000,
    "discount": 0,
    "desc": "Soft dusty rose pink kaftan featuring detailed crimson and gold starburst embroidery on the placket and pocket.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF07/3706cdb3-c3f3-4472-9496-69f4f8916f60.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF07/9d25b6a1-d636-43b4-8165-2306609973f7.jpg"
    ]
  },
  {
    "code": "OB-KF08",
    "name": "OB-KF08",
    "category": "Kaftans",
    "price": 145000,
    "discount": 0,
    "desc": "Lightweight khaki brown cotton linen with clean vertical white pinstripes and detailed geometric pocket embroidery.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF08/3b298ac8-4853-4f82-84eb-f9383f6f078b.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF08/c65ebca0-3c4c-44c4-baab-7383ca0280df.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF08/e5924d38-93d7-4d6a-9107-85a6be350d2d.jpg"
    ]
  },
  {
    "code": "OB-KF09",
    "name": "OB-KF09",
    "category": "Kaftans",
    "price": 160000,
    "discount": 0,
    "desc": "Deep navy blue polished cotton adorned with gold pinstripe embroidery and contrasting brown piping on the mandarin collar.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF09/021a42c3-085a-4a04-87f3-e2b2e30c8797.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF09/f800b928-eda1-4a69-9df5-5d49153ac2c4.jpg"
    ]
  },
  {
    "code": "OB-KF10",
    "name": "OB-KF10",
    "category": "Kaftans",
    "price": 175000,
    "discount": 0,
    "desc": "Royal blue executive kaftan showcasing vibrant golden yellow diamond embroidery on the placket and chest pocket.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF10/a2d5c5c7-b275-4cd0-b2fc-8dc9b245e25f.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF10/d1125222-38f3-4e07-8056-24eb98281347.jpg"
    ]
  },
  {
    "code": "OB-KF11",
    "name": "OB-KF11",
    "category": "Kaftans",
    "price": 190000,
    "discount": 0,
    "desc": "Soothing sky blue kaftan featuring hand-braided light blue geometric embroidery panels along the front button line.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF11/1ceb61e0-9640-4e27-b233-a0ecb28a45a0.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF11/2d1afe7c-2580-4d0b-b106-c27b0ebca248.jpg"
    ]
  },
  {
    "code": "OB-KF12",
    "name": "OB-KF12",
    "category": "Kaftans",
    "price": 205000,
    "discount": 0,
    "desc": "Silver-grey cotton silk blend kaftan highlighting structured charcoal and slate block embroidery.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF12/0bc6bda1-d5e7-4a6d-9c10-bf2bb6a72649.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF12/35955e65-c413-40a6-a815-25c36276a312.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears(2).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears(3).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF12/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF13",
    "name": "OB-KF13",
    "category": "Kaftans",
    "price": 220000,
    "discount": 0,
    "desc": "Sage green linen kaftan designed with modern white and emerald green cross-and-square embroidery motifs.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF13/6BCAD435-5A45-4A23-954C-B8BE1E19764F.png",
      "assets/products/KAFTAN COLLECTION/OB-KF13/F6E70A07-9BE2-4814-B34A-D57A0F755735.png",
      "assets/products/KAFTAN COLLECTION/OB-KF13/Photo from Oban Wears(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF13/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF14",
    "name": "OB-KF14",
    "category": "Kaftans",
    "price": 235000,
    "discount": 0,
    "desc": "Breathable self-striped white linen featuring multi-tone black, brown, and navy geometric chest stitching.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF14/01caa88b-08c3-45a3-a56f-800dbb6ba70f.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF14/9289e721-f021-4169-a7ee-651e7d9a02b0.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF14/fc748e78-29ed-4bc6-a27e-be1eedda5122.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF14/Photo from Oban Wears(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF14/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF15",
    "name": "OB-KF15",
    "category": "Kaftans",
    "price": 250000,
    "discount": 0,
    "desc": "Mustard gold ceremonial kaftan showcasing a dramatic black and gold scallop scale embroidery pattern.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF15/13598872-75af-4156-8239-8d9d5cea4999.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF15/883c1f95-5fd6-4ea7-aa37-91ea45498fb6(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF15/Photo from Oban Wears(1).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF15/Photo from Oban Wears(2).jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF15/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF16",
    "name": "OB-KF16",
    "category": "Kaftans",
    "price": 145000,
    "discount": 0,
    "desc": "Clean ivory white kaftan featuring minimal obsidian black button accents and structured shoulder seams.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF16/2.png",
      "assets/products/KAFTAN COLLECTION/OB-KF16/9bac4745-4b3f-4847-a474-e010910cdddd.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF16/b188ff0d-aeda-40c6-bfef-3375db704f7d.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF16/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-KF17",
    "name": "OB-KF17",
    "category": "Kaftans",
    "price": 160000,
    "discount": 0,
    "desc": "Dusty mauve lilac kaftan displaying elegant black rope-knot embroidery on the chest pocket with black button detailing.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF17/Oban Set 13 e - 1.PNG",
      "assets/products/KAFTAN COLLECTION/OB-KF17/Oban Set 13 e - 3.PNG"
    ]
  },
  {
    "code": "OB-KF18",
    "name": "OB-KF18",
    "category": "Kaftans",
    "price": 175000,
    "discount": 0,
    "desc": "Chocolate brown micro-check kaftan detailed with black collar piping and an understated paisley placket inlay.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF18/IMG-20240626-WA0013.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF18/IMG-20240626-WA0017.jpg"
    ]
  },
  {
    "code": "OB-KF19",
    "name": "OB-KF19",
    "category": "Kaftans",
    "price": 190000,
    "discount": 0,
    "desc": "Charcoal grey pinstripe kaftan featuring structured shoulders, silver collar piping, and geometric chest trim.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF19/IMG-20240626-WA0027.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF19/IMG-20240626-WA0029.jpg"
    ]
  },
  {
    "code": "OB-KF20",
    "name": "OB-KF20",
    "category": "Kaftans",
    "price": 205000,
    "discount": 0,
    "desc": "Terracotta orange kaftan highlighted by dark brown crescent arch embroidery on the pocket and coordinating button accents.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0013.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0015.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0017.jpg"
    ]
  },
  {
    "code": "OB-AG01",
    "featured": true,
    "name": "OB-AG01",
    "category": "Agbada",
    "price": 300000,
    "discount": 0,
    "desc": "Ceremonial turquoise blue Agbada featuring a bold black geometric weave embroidery motif across the chest and matching Fila cap.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG01/23.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG01/24.jpg"
    ]
  },
  {
    "code": "OB-AG02",
    "featured": true,
    "name": "OB-AG02",
    "category": "Agbada",
    "price": 320000,
    "discount": 0,
    "desc": "Mint green traditional Agbada detailed with dark green and mint abstract geometric embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG02/1475af46-42d8-434a-9a91-abf10d6ca14a.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG02/413330bb-2813-4d0f-aa6b-1a684794b574.jpg"
    ]
  },
  {
    "code": "OB-AG03",
    "name": "OB-AG03",
    "category": "Agbada",
    "price": 340000,
    "discount": 0,
    "desc": "Premium light grey Agbada showcasing multi-color light blue, bronze, and navy geometric cross embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG03/36bebf71-b1c9-40b1-a460-4ae3d2f1d1b4.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG03/b8f2f6e9-f79f-44da-b6fe-d1be4d608688.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG03/c7a342ab-1b63-4c88-ba20-09c9042ea1eb.jpg"
    ]
  },
  {
    "code": "OB-AG04",
    "name": "OB-AG04",
    "category": "Agbada",
    "price": 360000,
    "discount": 0,
    "desc": "Charcoal black wool blend Agbada styled with an asymmetrical lavender grey textured chest panel and striped cap.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG04/acd55403-4172-4053-bf49-b7eb28716245.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG04/c88c32e3-66b3-4da0-8416-4737a493ba84(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG04/c88c32e3-66b3-4da0-8416-4737a493ba84.jpg"
    ]
  },
  {
    "code": "OB-AG05",
    "name": "OB-AG05",
    "category": "Agbada",
    "price": 380000,
    "discount": 0,
    "desc": "Slate steel blue Agbada featuring dense light blue interlocking circle embroidery across the chest yoke.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG05/2e3cd6bc-c913-4001-b506-09a221878f93.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG05/75db1649-75b0-401c-a15b-996d8f5264a0.jpg"
    ]
  },
  {
    "code": "OB-AG06",
    "name": "OB-AG06",
    "category": "Agbada",
    "price": 400000,
    "discount": 0,
    "desc": "Striking wine red Agbada featuring raised burgundy floral cord embroidery and a matching traditional cap.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG06/14baeca3-4bfc-4307-a5cd-c393bfbe1c61.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG06/67f26742-6f9f-4e6c-ae1f-9159ab2dc1df.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG06/cefdbe25-f7ed-4e2b-91af-01b2171dcc9a.jpg"
    ]
  },
  {
    "code": "OB-AG07",
    "name": "OB-AG07",
    "category": "Agbada",
    "price": 420000,
    "discount": 0,
    "desc": "Dusty rose pink Agbada presenting a deep maroon and pink geometric abstract chest embroidery pattern.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG07/3a38a622-1dba-47f5-b2cf-b23ae6abb6e9.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG07/54e8c6b7-845c-459b-9fad-b5c094375a4b.jpg"
    ]
  },
  {
    "code": "OB-AG08",
    "name": "OB-AG08",
    "category": "Agbada",
    "price": 440000,
    "discount": 0,
    "desc": "Midnight navy cashmere Agbada showcasing traditional gold and beige geometric floral chest embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG08/6cf35e87-9a05-48c8-ac73-12ef7be0e33b.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG08/fb08062e-b441-4035-809a-5716358a1998(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG08/fb08062e-b441-4035-809a-5716358a1998.jpg"
    ]
  },
  {
    "code": "OB-AG09",
    "name": "OB-AG09",
    "category": "Agbada",
    "price": 460000,
    "discount": 0,
    "desc": "Rich sky blue ceremonial Agbada displaying tone-on-tone blue geometric chest embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG09/IMG-20240506-WA0057(0).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG09/IMG-20240506-WA0057(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG09/IMG-20240506-WA0057.jpg"
    ]
  },
  {
    "code": "OB-AG10",
    "name": "OB-AG10",
    "category": "Agbada",
    "price": 280000,
    "discount": 0,
    "desc": "Dark brown and navy plaid Agbada featuring a navy chest piece with copper and gold diamond grid stitching.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG10/IMG-20240913-WA0014.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG10/IMG-20240913-WA0016(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG10/IMG-20240913-WA0016.jpg"
    ]
  },
  {
    "code": "OB-AG11",
    "name": "OB-AG11",
    "category": "Agbada",
    "price": 300000,
    "discount": 0,
    "desc": "Deep brick red Agbada adorned with a black chest piece featuring white and red traditional star embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG11/IMG-20240911-WA0031.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG11/IMG-20240911-WA0033.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG11/IMG-20240911-WA0035.jpg"
    ]
  },
  {
    "code": "OB-AG12",
    "name": "OB-AG12",
    "category": "Agbada",
    "price": 320000,
    "discount": 0,
    "desc": "Warm light cream linen Agbada featuring large circular geometric lines embroidery in chocolate and cream.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG12/IMG-20240911-WA0029(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG12/IMG-20240911-WA0029.jpg"
    ]
  },
  {
    "code": "OB-AG13",
    "name": "OB-AG13",
    "category": "Agbada",
    "price": 340000,
    "discount": 0,
    "desc": "Rich chocolate brown Agbada featuring golden and bronze chest embroidery and a matching embroidered cap.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG13/IMG-20240502-WA0007.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG13/IMG-20240502-WA0011.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG13/Oban wear set 14 b-1.jpg"
    ]
  },
  {
    "code": "OB-AG14",
    "name": "OB-AG14",
    "category": "Agbada",
    "price": 360000,
    "discount": 0,
    "desc": "Regal royal purple Agbada showing tone-on-tone purple geometric chest embroidery with a raised knot emblem.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG14/Photo from Oban Wears(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG14/Photo from Oban Wears(2).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG14/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-AG15",
    "name": "OB-AG15",
    "category": "Agbada",
    "price": 380000,
    "discount": 0,
    "desc": "Off-white cream polished cotton Agbada featuring modern cross-shaped fan segment embroidery in brown, navy, and gold.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG15/041a78a6-574a-4c73-b813-5985b6884833.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG15/acb415fe-8a56-4bb7-8387-b65df9393aff.jpg"
    ]
  },
  {
    "code": "OB-AG16",
    "name": "OB-AG16",
    "category": "Agbada",
    "price": 400000,
    "discount": 0,
    "desc": "White self-striped linen Agbada displaying vibrant geometric embroidery and a coordinating white and gold striped cap.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG16/IMG_3328.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG16/IMG_3329.jpg"
    ]
  },
  {
    "code": "OB-AG17",
    "name": "OB-AG17",
    "category": "Agbada",
    "price": 420000,
    "discount": 0,
    "desc": "Asymmetrical charcoal black Agbada with a textured lavender grey chest panel and matching accessories.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG17/9fe7b431-7590-4721-a671-cbaad357a6d8.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG17/IMG_3832.jpg"
    ]
  },
  {
    "code": "OB-AG18",
    "name": "OB-AG18",
    "category": "Agbada",
    "price": 440000,
    "discount": 0,
    "desc": "Sky blue ceremonial Agbada combining traditional volume with gold and navy blue floral diamond chest embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG18/IMG_8997.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG18/IMG_8999.jpg"
    ]
  },
  {
    "code": "OB-AG19",
    "name": "OB-AG19",
    "category": "Agbada",
    "price": 460000,
    "discount": 0,
    "desc": "Deep navy blue self-striped Agbada decorated with a traditional chest panel featuring white, green, and orange embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG19/Photo from Oban Wears(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG19/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-AG20",
    "name": "OB-AG20",
    "category": "Agbada",
    "price": 280000,
    "discount": 0,
    "desc": "Royal purple Agbada featuring a dense chest panel embroidered with magenta, gold, and white geometric diamond patterns.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG20/Oban Set 14 - 10.PNG",
      "assets/products/AGBADA COLLECTION/OB-AG20/Oban Set 14 - 11.PNG"
    ]
  },
  {
    "code": "OB-AG21",
    "name": "OB-AG21",
    "category": "Agbada",
    "price": 300000,
    "discount": 0,
    "desc": "Bright turquoise blue Agbada decorated with a rich royal blue abstract embroidery design featuring teardrop textures.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG21/9442fe47-6be0-4640-a467-eac3f2870a6e.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG21/d43a8b19-fbfb-4395-b4b5-00fda299241c.jpg"
    ]
  },
  {
    "code": "OB-AG22",
    "name": "OB-AG22",
    "category": "Agbada",
    "price": 320000,
    "discount": 0,
    "desc": "Classic charcoal black self-striped Agbada adorned with traditional geometric chest embroidery in yellow gold and light blue.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG22/IMG-20240707-WA0030.jpg",
      "assets/products/AGBADA COLLECTION/OB-AG22/IMG-20240707-WA0032.jpg"
    ]
  },
  {
    "code": "OB-AG23",
    "name": "OB-AG23",
    "category": "Agbada",
    "price": 340000,
    "discount": 0,
    "desc": "Clean off-white cream Agbada styled with a vertical chest panel featuring light blue, grey, and brown geometric embroidery.",
    "images": [
      "assets/products/AGBADA COLLECTION/OB-AG23/Photo from Oban Wears(1).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG23/Photo from Oban Wears(2).jpg",
      "assets/products/AGBADA COLLECTION/OB-AG23/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-FS01",
    "featured": true,
    "name": "OB-FS01",
    "category": "Father & Son",
    "price": 345000,
    "discount": 0,
    "desc": "Coordinated Father & Son Agbada set in charcoal black, featuring traditional chest panels with gold and beige geometric embroidery.",
    "images": [
      "assets/products/FATHER AND SONS/OB-FS01/IMG-20240913-WA0022.jpg",
      "assets/products/FATHER AND SONS/OB-FS01/IMG-20240913-WA0026.jpg"
    ]
  },
  {
    "code": "OB-FS02",
    "name": "OB-FS02",
    "category": "Father & Son",
    "price": 370000,
    "discount": 0,
    "desc": "Matching Father & Son Agbada set in clean off-white fabric, showcasing grey chest panels with black spiral dotted embroidery.",
    "images": [
      "assets/products/FATHER AND SONS/OB-FS02/IMG_3143.JPG"
    ]
  },
  {
    "code": "OB-FS03",
    "name": "OB-FS03",
    "category": "Father & Son",
    "price": 395000,
    "discount": 0,
    "desc": "Matching Father & Son Agbada set in rich caramel brown, featuring light brown chest panels with dark brown spiral embroidery.",
    "images": [
      "assets/products/FATHER AND SONS/OB-FS03/IMG_3142.JPG"
    ]
  },
  {
    "code": "OB-FS04",
    "name": "OB-FS04",
    "category": "Father & Son",
    "price": 420000,
    "discount": 0,
    "desc": "Coordinated Father & Son set in emerald green, decorated with gold and olive chest panels showcasing green spiral embroidery.",
    "images": [
      "assets/products/FATHER AND SONS/OB-FS04/IMG-20251216-WA0063.jpg"
    ]
  },
  {
    "code": "OB-FS05",
    "name": "OB-FS05",
    "category": "Father & Son",
    "price": 320000,
    "discount": 0,
    "desc": "Off-white cream Father & Son Agbada matching set featuring intricate navy and bronze geometric chest stitching.",
    "images": [
      "assets/products/FATHER AND SONS/OB-FS05/Photo from Oban Wears(1).jpg",
      "assets/products/FATHER AND SONS/OB-FS05/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-SP01",
    "featured": true,
    "name": "OB-SP01",
    "category": "Suits & Pants",
    "price": 245000,
    "discount": 0,
    "desc": "Bespoke mustard orange mandarin collar suit jacket featuring fabric-covered buttons and sharp modern tailoring.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP01/7ccef707-f56f-4a48-8fb6-8f365cda42b7.jpg",
      "assets/products/SUITS AND PANTS/OB-SP01/7e07ec58-8305-4807-8a44-47ccd17da0b1(1).JPG",
      "assets/products/SUITS AND PANTS/OB-SP01/7e07ec58-8305-4807-8a44-47ccd17da0b1.jpg",
      "assets/products/SUITS AND PANTS/OB-SP01/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-SP02",
    "name": "OB-SP02",
    "category": "Suits & Pants",
    "price": 270000,
    "discount": 0,
    "desc": "Royal blue checkered three-piece suit featuring a structured jacket, matching vest, white shirt, and striped tie.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP02/IMG-20240526-WA0019.jpg",
      "assets/products/SUITS AND PANTS/OB-SP02/IMG-20240526-WA0021(1).jpg"
    ]
  },
  {
    "code": "OB-SP03",
    "name": "OB-SP03",
    "category": "Suits & Pants",
    "price": 295000,
    "discount": 0,
    "desc": "Classic navy blue two-piece corporate suit tailored from lightweight wool with a sharp single-button closure.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP03/IMG-20240913-WA0018.jpg",
      "assets/products/SUITS AND PANTS/OB-SP03/IMG-20240913-WA0020.jpg"
    ]
  },
  {
    "code": "OB-SP04",
    "name": "OB-SP04",
    "category": "Suits & Pants",
    "price": 320000,
    "discount": 0,
    "desc": "Premium light grey double-breasted suit jacket featuring dark contrast buttons and peak lapels.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP04/b2580288-d320-441c-aae5-dcdd7fe3c133.jpg",
      "assets/products/SUITS AND PANTS/OB-SP04/d6ab4941-9d14-47a3-9401-2dbb725cd55b.jpg"
    ]
  },
  {
    "code": "OB-SP05",
    "name": "OB-SP05",
    "category": "Suits & Pants",
    "price": 345000,
    "discount": 0,
    "desc": "Tailored executive suit set featuring sharp modern shoulders, custom trousers, and structured lapel detailing.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP05/IMG_0486.jpg",
      "assets/products/SUITS AND PANTS/OB-SP05/IMG_0490.jpg"
    ]
  },
  {
    "code": "OB-SP06",
    "name": "OB-SP06",
    "category": "Suits & Pants",
    "price": 220000,
    "discount": 0,
    "desc": "Dark grey waistcoat and trousers set highlighting a double-breasted vest with fine pinstripe inner lining.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP06/IMG_0473.jpg",
      "assets/products/SUITS AND PANTS/OB-SP06/IMG_0476.jpg"
    ]
  },
  {
    "code": "OB-SP07",
    "name": "OB-SP07",
    "category": "Suits & Pants",
    "price": 245000,
    "discount": 0,
    "desc": "Sophisticated solid black tuxedo jacket featuring black satin shawl lapels and a matching black vest.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP07/3b7b692e-e2d3-4647-8b1e-ac1191c22e6f.jpg"
    ]
  },
  {
    "code": "OB-SP08",
    "name": "OB-SP08",
    "category": "Suits & Pants",
    "price": 270000,
    "discount": 0,
    "desc": "Forest green double-breasted suit jacket styled with polished gold buttons and an elegant lapel chain pin.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP08/498921890_18330200977167858_2899624696774555259_n.jpg"
    ]
  },
  {
    "code": "OB-SP09",
    "name": "OB-SP09",
    "category": "Suits & Pants",
    "price": 295000,
    "discount": 0,
    "desc": "Three-piece tailored executive suit in deep navy blue featuring a structured vest and flat-front trousers.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP09/Photo from Oban Wears(1).jpg",
      "assets/products/SUITS AND PANTS/OB-SP09/Photo from Oban Wears(2).jpg",
      "assets/products/SUITS AND PANTS/OB-SP09/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-SP10",
    "name": "OB-SP10",
    "category": "Suits & Pants",
    "price": 320000,
    "discount": 0,
    "desc": "Modern slim-fit double-breasted suit in charcoal grey featuring peak lapels and horn buttons.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears(1).jpg",
      "assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears(2).jpg",
      "assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears(3).jpg",
      "assets/products/SUITS AND PANTS/OB-SP10/Photo from Oban Wears.jpg"
    ]
  },
  {
    "code": "OB-SP11",
    "name": "OB-SP11",
    "category": "Suits & Pants",
    "price": 250000,
    "discount": 0,
    "featured": true,
    "desc": "Bespoke executive tailored two-piece suit crafted in premium Italian wool blend, featuring structured peak lapels, hand-finished pick stitching, custom horn buttons, and tailored slim-fit trousers.",
    "images": [
      "assets/products/SUITS AND PANTS/OB-SP11/Photo from Oban Wears.jpg",
      "assets/products/SUITS AND PANTS/OB-SP11/Photo from Oban Wears(1).jpg"
    ]
  }
];

const FIREBASE_DB = "https://oban-wears-default-rtdb.firebaseio.com/oban-products.json";

module.exports = async (req, res) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type, X-Admin-Email, X-Admin-Password");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, OPTIONS");

  if (req.method === "OPTIONS") {
    return res.status(200).end();
  }

  if (req.method === "GET") {
    try {
      const response = await fetch(FIREBASE_DB);
      if (response.ok) {
        const cloudData = await response.json();
        if (cloudData && Array.isArray(cloudData) && cloudData.length > 0) {
          return res.status(200).json(cloudData);
        }
      }
    } catch (e) {
      console.warn("Cloud DB fetch error, serving default inventory:", e);
    }
    return res.status(200).json(defaultInventory);
  }

  if (req.method === "POST") {
    try {
      const data = typeof req.body === "string" ? JSON.parse(req.body) : req.body;
      if (data && Array.isArray(data)) {
        await fetch(FIREBASE_DB, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data)
        });
      }
      return res.status(200).json({ success: true });
    } catch (err) {
      return res.status(400).json({ error: "Invalid payload or cloud sync failed" });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
};

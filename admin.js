


const menuButton = document.querySelector("#menuButton");
const mobileNav = document.querySelector("#mobileNav");
if (menuButton && mobileNav) {
  menuButton.onclick = () => mobileNav.classList.toggle("open");
}

// ---- Demo orders cleared. Admin starts with a clean database. ----
const initialOrders = [];

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
  },
  {
    "code": "OB-KF29",
    "name": "OB-KF29",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "featured": true,
    "desc": "Bespoke executive Kaftan in structured polished cotton featuring refined chest placket embroidery, mandarin collar, and tailored cuffs.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF29/Photo from Oban Wears.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF29/Photo from Oban Wears(1).jpg"
    ]
  },
  {
    "code": "OB-KF30",
    "name": "OB-KF30",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "featured": true,
    "desc": "Premium modern Kaftan crafted from high-grade cotton linen with geometric chest panel detailing and tailored long sleeves.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF30/Photo from Oban Wears.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF30/Photo from Oban Wears(1).jpg"
    ]
  },
  {
    "code": "OB-KF31",
    "name": "OB-KF31",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "featured": true,
    "desc": "Signature luxury Kaftan featuring intricate tone-on-tone embroidery, structured shoulder line, and refined ceremonial finish.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF31/Photo from Oban Wears.jpg",
      "assets/products/KAFTAN COLLECTION/OB-KF31/Photo from Oban Wears(1).jpg"
    ]
  },
  {
    "code": "OB-KF21",
    "featured": true,
    "name": "OB-KF21",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Tailored in premium cotton linen featuring intricate chest embroidery panel, structured mandarin collar, and tailored cuffs.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0013.jpg"
    ]
  },
  {
    "code": "OB-KF22",
    "featured": true,
    "name": "OB-KF22",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Crafted from structured polished cotton showcasing rich placket embroidery with refined long sleeve detailing.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0015.jpg"
    ]
  },
  {
    "code": "OB-KF23",
    "featured": true,
    "name": "OB-KF23",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Executive Kaftan styled with delicate vertical chest pintucks and coordinating accent placket.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0017.jpg"
    ]
  },
  {
    "code": "OB-KF24",
    "featured": true,
    "name": "OB-KF24",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Modern ceremonial Kaftan with geometric chest panel detailing and tailored long sleeves.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0013.jpg"
    ]
  },
  {
    "code": "OB-KF25",
    "featured": true,
    "name": "OB-KF25",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Bespoke linen Kaftan styled with clean topstitching and mandarin collar.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0015.jpg"
    ]
  },
  {
    "code": "OB-KF26",
    "featured": true,
    "name": "OB-KF26",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Executive Kaftan featuring geometric diamond embroidery along the placket and pocket.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0017.jpg"
    ]
  },
  {
    "code": "OB-KF27",
    "featured": true,
    "name": "OB-KF27",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Signature Kaftan featuring detailed starburst embroidery on the placket and pocket.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0013.jpg"
    ]
  },
  {
    "code": "OB-KF28",
    "featured": true,
    "name": "OB-KF28",
    "category": "Kaftans",
    "price": 120000,
    "discount": 0,
    "desc": "Lightweight luxury cotton Kaftan with clean vertical pinstripes and detailed pocket embroidery.",
    "images": [
      "assets/products/KAFTAN COLLECTION/OB-KF20/IMG-20241102-WA0015.jpg"
    ]
  }
];

const initialBlogArticles = [
  {
    id: "art-001",
    title: "The Timeless Elegance of Agbada",
    category: "Heritage & Culture",
    excerpt: "Agbada is more than just clothing, it is a symbol of tradition, culture, and elegance. Reimagining its majestic aura for the modern gentleman.",
    author: "Babatunde Oban",
    date: "June 21 2026",
    filename: "agbada-elegance.html",
    content: "Agbada is more than just clothing, it is a symbol of tradition, culture, and elegance. Originating from West Africa, this majestic robe has been worn by leaders, kings, and nobility for centuries.\n\nToday, the contemporary designer focuses on refining the fit, using high-quality wools and cashmeres, and applying minimal, hand-crafted geometric embroidery. This results in a garment that respects its historical ancestry while fitting seamlessly into the wardrobe of the modern, international gentleman."
  },
  {
    id: "art-002",
    title: "Why Every Man Needs a Kaftan in His Wardrobe",
    category: "Heritage & Culture",
    excerpt: "Discover the ultimate blend of tradition, comfort, and versatility. Why this breathable classic is a must have for every contemporary wardrobe.",
    author: "Babatunde Oban",
    date: "June 20 2026",
    filename: "why-kaftan.html",
    content: "The kaftan is one of the most versatile and comfortable garments in menswear history.\n\nCrafted from breathable linens and cottons, it offers an elegant, relaxed silhouette that keeps you cool under tropical weather while maintaining a refined posture. Whether styled for a casual weekend, a business meeting, or an evening celebration, the kaftan strikes the perfect balance between culture and contemporary styling."
  },
  {
    id: "art-003",
    title: "How to Choose the Right Outfit for Any Occasion",
    category: "Style Guides",
    excerpt: "In a world of fast first impressions, your clothing speaks before you do. Build your personal signature brand through thoughtful style.",
    author: "Babatunde Oban",
    date: "June 19 2026",
    filename: "choosing-right-outfit.html",
    content: "First impressions are made in seconds, and your wardrobe is your silent spokesperson.\n\nWhen dressing, consider the venue, climate, and cultural context of the occasion. For formal corporate boardrooms, structured dark-colored suits or corporate kaftans work best. For traditional celebrations, ceremonial Agbadas or embroidered kaftans offer unmatched prestige. Always prioritize fit, fabric quality, and restraint in accessorizing."
  },
  {
    id: "art-004",
    title: "The Modern Groom: How to Style a Wedding Agbada",
    category: "Style Guides",
    excerpt: "A comprehensive guide for the Yoruba groom. Balancing cultural heritage with clean geometric embroidery, fine fabrics, and minimal accessorizing.",
    author: "Babatunde Oban",
    date: "June 18 2026",
    filename: "modern-groom-agbada.html",
    content: "Your wedding day demands the highest expression of elegance. For the modern groom, a bespoke Agbada is the gold standard.\n\nChoose premium fabrics like luxury cashmere or soft polished cotton in colors that complement the bride. Focus on minimal, high-contrast geometric embroidery rather than overly busy patterns. Pair it with a hand-woven Fila cap, high-quality leather loafers, and an understated watch."
  },
  {
    id: "art-005",
    title: "Fabric Selection: Choosing between Linen Cashmere and Cotton",
    category: "Fabrics & Craft",
    excerpt: "Linen, cashmere, or cotton? How to choose the perfect material for your kaftan based on tropical Lagos weather, drape, and occasion.",
    author: "Babatunde Oban",
    date: "June 17 2026",
    filename: "fabric-selection-kaftans.html",
    content: "The fabric you choose defines the character and lifespan of your bespoke garment.\n\nLinen is highly breathable and perfect for daytime casual elegance, though it creases easily. Polished cotton offers a clean, crisp finish that holds geometric embroidery beautifully. For evening wear or high-prestige events, fine cashmere blends provide a superior drape and luxurious weight."
  },
  {
    id: "art-006",
    title: "The Rise of Contemporary Nigerian Menswear in Global Fashion",
    category: "Heritage & Culture",
    excerpt: "How a new generation of designers is taking traditional garments like the Kaftan and Agbada and commanding international runways from Paris to New York.",
    author: "Babatunde Oban",
    date: "June 16 2026",
    filename: "contemporary-menswear-global.html",
    content: "Nigerian fashion is commanding international attention. From Paris to New York, designers are redefining traditional wear.\n\nTraditional silhouettes like the Kaftan and Agbada are being elevated with modern tailoring techniques, structured shoulders, and minimalist aesthetics. This has created a new global category of luxury luxury menswear that is both culturally authentic and globally appealing."
  },
  {
    id: "art-007",
    title: "How to Style Father and Son Matching Outfits",
    category: "Family",
    excerpt: "Celebrate family bonds and pass down cultural legacy. Heartwarming styling guidelines for coordinating fabrics and ensuring kid friendly comfort.",
    author: "Babatunde Oban",
    date: "June 15 2026",
    filename: "father-son-matching.html",
    content: "Matching father and son outfits are a beautiful celebration of family heritage.\n\nWhen styling, choose matching fabrics but adapt the cut to suit each age. For sons, prioritize lightweight, kid-friendly fabrics that allow ease of movement. Keep the embroidery minimal and avoid overly complex silhouettes. It's about passing down the legacy of style with absolute comfort."
  },
  {
    id: "art-008",
    title: "The Art of Bespoke Tailoring: What to Expect",
    category: "Fabrics & Craft",
    excerpt: "Invest in a garment made specifically for your body. What happens during your consultation, precise measurements, and first canvas fitting.",
    author: "Babatunde Oban",
    date: "June 14 2026",
    filename: "art-of-bespoke-tailoring.html",
    content: "Bespoke tailoring is a collaborative art form between the tailor and the client.\n\nIt begins with a detailed style consultation, followed by taking over 20 precise body measurements. A unique paper pattern is then drafted from scratch. During the canvas fitting, we adjust the drape, shoulder slope, and alignment to ensure a flawless fit designed exclusively for your posture."
  },
  {
    id: "art-009",
    title: "Corporate Kaftans: Redefining Office Wear",
    category: "Style Guides",
    excerpt: "Redefine the boardroom. How structured shoulders, clean lines, and deep conservative colors are replacing the classic Western executive suit.",
    author: "Babatunde Oban",
    date: "June 13 2026",
    filename: "corporate-kaftans-executive.html",
    content: "The corporate kaftan has officially entered the boardroom.\n\nBy incorporating structured shoulders, clean lines, and conservative colors (navy, charcoal, forest green), the corporate kaftan offers a powerful alternative to the Western suit. It projects cultural pride and executive authority while providing exceptional comfort in tropical climates."
  },
  {
    id: "art-010",
    title: "Caring for Velvet and Brocade: Maintaining Luxury Fabrics",
    category: "Garment Care",
    excerpt: "Velvet and brocade are the fabrics of royalty. Maintain their rich texture, color, and luster with these dry cleaning and storage rules.",
    author: "Babatunde Oban",
    date: "June 12 2026",
    filename: "caring-velvet-brocade.html",
    content: "Velvet and brocade are premium fabrics that require intentional care to preserve their texture.\n\nNever iron velvet directly as it crushes the pile; always steam it from the reverse side or hang it in a steamy bathroom. Brocade should always be dry cleaned to protect the delicate metallic threads. Store both fabrics in breathable cotton garment bags, never plastic."
  },
  {
    id: "art-011",
    title: "Accessorizing Traditional Wear: Shoes Caps and Watches",
    category: "Style Guides",
    excerpt: "Complete your look. Master the art of selecting hand woven Fila caps, polished leather loafers, and classic timepieces.",
    author: "Babatunde Oban",
    date: "June 11 2026",
    filename: "accessorizing-traditional-wear.html",
    content: "Accessories can make or break a traditional outfit.\n\nPair your Kaftan or Agbada with a hand-woven Fila cap in a matching or complementary shade. Choose clean, polished leather loafers or slip-ons instead of sneakers or overly casual sandals. Finish the look with a minimalist timepiece and understated cufflinks."
  },
  {
    id: "art-012",
    title: "Suits vs Kaftans: When to Wear What",
    category: "Style Guides",
    excerpt: "Deciding between structured Western authority and comfortable traditional prestige for corporate settings and Nigerian cultural celebrations.",
    author: "Babatunde Oban",
    date: "June 10 2026",
    filename: "suits-vs-kaftans.html",
    content: "Navigating between Western formal suits and traditional kaftans depends entirely on the event.\n\nWestern suits project structured corporate authority and are ideal for formal international business settings. Kaftans project relaxed prestige and cultural pride, making them the preferred choice for family events, weekend meetings, and tropical executive settings."
  }
];

const initialVendors = [];

const initialPurchaseOrders = [];

const initialBills = [];

const initialPayments = [];


// Initialize databases
const getOrSetDB = (key, defaultVal) => {
  let val = localStorage.getItem(key);
  if (!val) {
    localStorage.setItem(key, JSON.stringify(defaultVal));
    return defaultVal;
  }
  return JSON.parse(val);
};

let db = getOrSetDB("oban-orders", initialOrders);
function normalizeCategory(cat) {
  if (!cat) return "";
  const c = cat.toString().trim().toLowerCase();
  if (c === "kaftan" || c === "kaftans") return "Kaftans";
  if (c === "agbada" || c === "agbadas") return "Agbada";
  if (c === "suit" || c === "suits" || c.includes("suit")) return "Suits & Pants";
  if (c.includes("father") || c.includes("son")) return "Father & Son";
  return cat;
}

function sortCatalog(list) {
  if (!list || !list.length) return list || [];
  list.forEach(item => { if (item) item.category = normalizeCategory(item.category); });
  const categoryOrder = { "Kaftans": 1, "Agbada": 2, "Father & Son": 3, "Suits & Pants": 4 };
  return list.sort((a, b) => {
    const catA = categoryOrder[a.category] || 99;
    const catB = categoryOrder[b.category] || 99;
    if (catA !== catB) return catA - catB;
    const posA = typeof a.position === "number" ? a.position : 999;
    const posB = typeof b.position === "number" ? b.position : 999;
    if (posA !== posB) return posA - posB;
    const codeA = (a.code || "").toUpperCase();
    const codeB = (b.code || "").toUpperCase();
    return codeA.localeCompare(codeB, undefined, { numeric: true, sensitivity: 'base' });
  });
}

// The server is the source of truth; defaults only fill an empty first load
// until the first sync replaces them.
const getOrSetCatalogDB = (key, defaultVal) => {
  const list = JSON.parse(localStorage.getItem(key) || "[]");
  return list && list.length ? list : JSON.parse(JSON.stringify(defaultVal));
};

let inventoryDb = sortCatalog(getOrSetCatalogDB("oban-products", defaultInventory));
let blogDb = getOrSetDB("oban-blog-articles", initialBlogArticles);
let vendorsDb = getOrSetDB("oban-vendors", initialVendors);
let poDb = getOrSetDB("oban-purchase-orders", initialPurchaseOrders);
let billsDb = getOrSetDB("oban-bills", initialBills);
let paymentsDb = getOrSetDB("oban-payments", initialPayments);

const metricSales = document.querySelector("#metricSales");
const metricOrders = document.querySelector("#metricOrders");
const metricActive = document.querySelector("#metricActive");
const metricDispatched = document.querySelector("#metricDispatched");

const ordersTableBody = document.querySelector("#ordersTableBody");
const offlineOrderForm = document.querySelector("#offlineOrderForm");
const orderSearchInput = document.querySelector("#orderSearchInput");

// Stage labels mapping
const stageLabels = {
  1: "Waiting for Payment",
  2: "Payment Acknowledged",
  3: "Fabric Sourced",
  4: "Cutting",
  5: "Stitching",
  6: "Embroidery",
  7: "Quality Check",
  8: "Dispatched",
  9: "Cancelled"
};

const badgeClasses = {
  1: "badge-waiting",
  2: "badge-acknowledged",
  3: "badge-sourced",
  4: "badge-cutting",
  5: "badge-stitching",
  6: "badge-embroidery",
  7: "badge-quality",
  8: "badge-dispatched",
  9: "badge-cancelled"
};

// Formatter helper
const formatNaira = (n) => {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 0
  }).format(n);
};

// Date range filter, counted back from today.
function isDateInRange(dateStr, period) {
  if (!period || period === "all") return true;
  const orderDate = new Date(Date.parse(dateStr));
  if (Number.isNaN(orderDate.getTime())) return false;
  const now = new Date();
  const startOfToday = new Date(now.getFullYear(), now.getMonth(), now.getDate());
  if (period === "today") return orderDate >= startOfToday;
  if (period === "month") return orderDate.getMonth() === now.getMonth() && orderDate.getFullYear() === now.getFullYear();
  const monthsBack = { "2months": 2, "6months": 6, year: 12 }[period];
  if (!monthsBack) return true;
  const limit = new Date(startOfToday);
  limit.setMonth(limit.getMonth() - monthsBack);
  return orderDate >= limit;
}

// Section switching lives in admin-ui.js (sidebar, titles, purchases pills).

// Dashboard rendering
// New reference in the usual OB1234K shape that no loaded order already uses.
function newOrderRef(existing) {
  const taken = new Set((existing || []).map(o => String(o.ref || "").toUpperCase()));
  const letters = "ABCDEFGHJKLMNPQRSTUVWXYZ";
  let ref;
  do {
    ref = "OB" + Math.floor(1000 + Math.random() * 9000) + letters[Math.floor(Math.random() * letters.length)];
  } while (taken.has(ref));
  return ref;
}

const ICON = (name) => `<svg class="ic"><use href="#i-${name}"/></svg>`;

function measurementLine(m, saved) {
  if (!m || !m.neck) return "";
  const parts = [["N", m.neck], ["C", m.chest], ["Sh", m.shoulder], ["Sl", m.sleeve], ["W", m.waist], ["L", m.length]]
    .filter(([, v]) => v !== undefined && v !== "")
    .map(([k, v]) => `${k} ${escapeHtml(v)}"`).join(" · ");
  return `<span class="specs">${ICON("ruler")}${saved ? "Saved: " : ""}${parts}</span>`;
}

function renderDashboard() {
  const allOrders = JSON.parse(localStorage.getItem("oban-orders")) || [];
  const periodSelect = document.querySelector("#dateFilter");
  const period = periodSelect ? periodSelect.value : "all";

  // Metrics follow the period only; the table also follows search and status.
  const inPeriod = allOrders.filter((order) => isDateInRange(order.createdAt || order.date, period));
  let filtered = inPeriod;

  const q = orderSearchInput ? orderSearchInput.value.trim().toLowerCase() : "";
  if (q) {
    filtered = filtered.filter(o =>
      String(o.ref || "").toLowerCase().includes(q) ||
      String(o.name || "").toLowerCase().includes(q) ||
      String(o.email || "").toLowerCase().includes(q) ||
      String(o.piece || "").toLowerCase().includes(q)
    );
  }
  const stageFilter = document.querySelector("#orderStageFilter");
  const stageWanted = stageFilter ? Number(stageFilter.value) : 0;
  if (stageWanted) filtered = filtered.filter(o => Number(o.currentStage) === stageWanted);

  db = filtered;

  let totalRevenue = 0;
  let activeCount = 0;
  let dispatchedCount = 0;
  inPeriod.forEach((order) => {
    const stage = Number(order.currentStage);
    if (stage !== 9) totalRevenue += Number(order.total) || 0;
    if (stage === 8) dispatchedCount++;
    else if (stage !== 9 && stage !== 1) activeCount++;
  });

  if (metricSales) metricSales.textContent = formatNaira(totalRevenue);
  if (metricOrders) metricOrders.textContent = inPeriod.length;
  if (metricActive) metricActive.textContent = activeCount;
  if (metricDispatched) metricDispatched.textContent = dispatchedCount;

  if (!ordersTableBody) return;
  const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
  const canDelete = ["admin", "manager"].includes(window.obanStaffRole ? window.obanStaffRole() : "");

  if (!db.length) {
    ordersTableBody.innerHTML = `<tr><td colspan="7" class="empty">${allOrders.length ? "No orders match these filters." : "No orders yet. Website orders appear here automatically."}</td></tr>`;
    return;
  }

  ordersTableBody.innerHTML = db.map((order) => {
    const stage = Number(order.currentStage) || 1;
    const ref = escapeHtml(order.ref);
    const stageOptions = Object.keys(stageLabels).map(s => `<option value="${s}" ${stage === Number(s) ? "selected" : ""}>${stageLabels[s]}</option>`).join("");

    let specs = measurementLine(order.measurements, false);
    if (!specs && order.email) {
      const p = profiles[String(order.email).trim().toLowerCase()];
      specs = measurementLine(p && p.measurements, true);
    }

    const pct = typeof order.paymentPercentage === "number" ? order.paymentPercentage : 100;
    const payment = stage === 1
      ? `<span class="pay pay-part">Not paid yet</span>`
      : `<span class="pay ${pct === 100 ? "" : "pay-part"}">${pct === 100 ? "Paid in full" : `Instalment ${pct}%`}</span>`;
    const pctOptions = [100, 90, 80, 70, 60, 50].map(p => `<option value="${p}" ${pct === p ? "selected" : ""}>${p === 100 ? "Paid 100%" : `Paid ${p}%`}</option>`).join("");

    // "OB-KF03 (Size L, Quantity 2)" reads as "OB-KF03 × 2"
    const cleanPiece = String(order.piece || "")
      .replace(/\s*\(\s*Size\s+[^,)]*,\s*Quantity\s+(\d+)\s*\)/gi, " × $1")
      .replace(/\s*\(\s*Size\s+[^,)]*\)/gi, "")
      .replace(/\(\s*Quantity\s+(\d+)\s*\)/gi, "× $1")
      .trim();
    const fabric = order.fabricSource === "client" ? `<span class="chip-fabric">Client fabric</span>` : "";

    return `
      <tr>
        <td><span class="ref">${ref}</span>${order.orderType ? `<span class="cell-sub">${escapeHtml(order.orderType)}</span>` : ""}</td>
        <td><span class="cell-main">${escapeHtml(order.name)}</span>${order.whatsapp ? `<span class="cell-sub">${escapeHtml(order.whatsapp)}</span>` : ""}</td>
        <td><div class="clip" title="${escapeHtml(cleanPiece)}">${escapeHtml(cleanPiece)}${fabric}</div>${specs}</td>
        <td class="nowrap">${escapeHtml(order.date)}</td>
        <td class="num"><strong>${formatNaira(Number(order.total) || 0)}</strong></td>
        <td><span class="badge st-${stage}">${stageLabels[stage] || "Unknown"}</span>${payment}</td>
        <td>
          <div class="row-controls">
            <select class="sel-sm stage-select" data-ref="${ref}" aria-label="Status for ${ref}">${stageOptions}</select>
            <select class="sel-sm payment-pct-select" data-ref="${ref}" aria-label="Payment for ${ref}">${pctOptions}</select>
            <div class="acts">
              <button type="button" class="act act-text print-invoice-btn" data-ref="${ref}" title="Print invoice">${ICON("print")}Invoice</button>
              <button type="button" class="act act-text print-receipt-btn" data-ref="${ref}" title="Print receipt">${ICON("orders")}Receipt</button>
              ${canDelete ? `<button type="button" class="act act-danger delete-order-btn" data-ref="${ref}" title="Delete order" aria-label="Delete order ${ref}">${ICON("trash")}</button>` : ""}
            </div>
          </div>
        </td>
      </tr>`;
  }).join("");

  const findOrder = (ref) => allOrders.find(x => x.ref === ref);

  ordersTableBody.querySelectorAll(".stage-select").forEach((select) => {
    select.onchange = (e) => {
      const order = findOrder(e.currentTarget.dataset.ref);
      const newStage = +e.currentTarget.value;
      if (!order || Number(order.currentStage) === newStage) return;
      order.currentStage = newStage;
      localStorage.setItem("oban-orders", JSON.stringify(allOrders));
      renderDashboard();
    };
  });

  ordersTableBody.querySelectorAll(".payment-pct-select").forEach((select) => {
    select.onchange = (e) => {
      const order = findOrder(e.currentTarget.dataset.ref);
      const newPct = +e.currentTarget.value;
      if (!order || order.paymentPercentage === newPct) return;
      order.paymentPercentage = newPct;
      localStorage.setItem("oban-orders", JSON.stringify(allOrders));
      renderDashboard();
    };
  });

  ordersTableBody.querySelectorAll(".print-invoice-btn, .print-receipt-btn").forEach((btn) => {
    btn.onclick = () => {
      const order = findOrder(btn.dataset.ref);
      if (order && window.generateDocumentPrint) {
        window.generateDocumentPrint(order, btn.classList.contains("print-invoice-btn") ? "invoice" : "receipt");
      }
    };
  });

  ordersTableBody.querySelectorAll(".delete-order-btn").forEach((btn) => {
    btn.onclick = () => {
      const ref = btn.dataset.ref;
      if (!confirm(`Permanently delete order ${ref}? This cannot be undone.`)) return;
      const allOrdersList = (JSON.parse(localStorage.getItem("oban-orders")) || []).filter(x => x.ref !== ref);
      localStorage.setItem("oban-orders", JSON.stringify(allOrdersList));
      renderDashboard();
    };
  });
}

// Search and filters
if (orderSearchInput) orderSearchInput.oninput = () => renderDashboard();
const orderStageFilter = document.querySelector("#orderStageFilter");
if (orderStageFilter) orderStageFilter.onchange = () => renderDashboard();

// Bind filter drop down selection event
const dateFilter = document.querySelector("#dateFilter");
if (dateFilter) {
  dateFilter.onchange = () => {
    renderDashboard();
  };
}

// Bind export button action handler
const exportBtn = document.querySelector("#exportBtn");
if (exportBtn) {
  exportBtn.onclick = () => {
    const periodSelect = document.querySelector("#dateFilter");
    const period = periodSelect ? periodSelect.value : "all";
    
    let csvContent = "Order Reference,Date,Customer Name,Garment Details,Total Price,Status\n";
    db.forEach((order) => {
      const cleanPiece = `"${String(order.piece || "").replace(/"/g, '""')}"`;
      const cleanName = `"${String(order.name || "").replace(/"/g, '""')}"`;
      const statusText = stageLabels[order.currentStage];
      csvContent += `${order.ref},${order.date},${cleanName},${cleanPiece},${order.total},${statusText}\n`;
    });
    
    try {
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.setAttribute("href", url);
      link.setAttribute("download", `oban_sales_report_${period}.csv`);
      link.style.visibility = "hidden";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (err) {
      alert("Failed to export report: " + err.message);
    }
  };
}

// Form Submission: Add Offline Order
if (offlineOrderForm) {
  offlineOrderForm.onsubmit = (e) => {
    e.preventDefault();
    const allOrders = JSON.parse(localStorage.getItem("oban-orders")) || [];
    
    const name = document.querySelector("#custName").value.trim();
    const email = document.querySelector("#custEmail").value.trim();
    const whatsapp = document.querySelector("#custWhatsApp").value.trim();
    const garment = document.querySelector("#garmentName").value.trim();
    const total = +document.querySelector("#orderTotal").value;
    const stage = +document.querySelector("#orderStatus").value;
    
    const ref = newOrderRef(allOrders);
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateStr = `${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
    
    const payPctSelect = document.querySelector("#orderPaymentPercentage");
    const paymentPercentage = payPctSelect ? +payPctSelect.value : 100;

    const newOrder = {
      ref: ref,
      name: name,
      email: email,
      whatsapp: whatsapp,
      piece: garment,
      total: total,
      currentStage: stage,
      paymentPercentage: paymentPercentage,
      date: dateStr,
      notes: "Location: Offline Walk-In registry"
    };
    
    allOrders.unshift(newOrder);
    localStorage.setItem("oban-orders", JSON.stringify(allOrders));
    
    // Auto register or update customer spend profile
    const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
    if (!profiles[email.toLowerCase()]) {
      profiles[email.toLowerCase()] = {
        email: email,
        name: name,
        whatsapp: whatsapp
      };
      localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
    }
    
    offlineOrderForm.reset();
    renderDashboard();
    alert(`Order ${ref} has been added successfully!`);
  };
}

// -------------------------------------------------------------
// CUSTOMERS TAB
// -------------------------------------------------------------
const customersTableBody = document.querySelector("#customersTableBody");
function customerList() {
  const allOrders = JSON.parse(localStorage.getItem("oban-orders")) || [];
  const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
  const map = {};
  allOrders.forEach(o => {
    if (!o.email) return;
    const key = String(o.email).trim().toLowerCase();
    if (!map[key]) map[key] = { name: o.name || "", email: key, whatsapp: o.whatsapp || "", totalSpend: 0, ordersCount: 0, lastOrder: "" };
    if (Number(o.currentStage) !== 9) map[key].totalSpend += Number(o.total) || 0;
    map[key].ordersCount++;
    if (!map[key].lastOrder || Date.parse(o.date) > Date.parse(map[key].lastOrder)) map[key].lastOrder = o.date;
  });
  Object.entries(profiles).forEach(([key, p]) => {
    const k = String(key).trim().toLowerCase();
    if (!map[k]) map[k] = { name: (p && p.name) || "", email: k, whatsapp: (p && p.whatsapp) || "", totalSpend: 0, ordersCount: 0, lastOrder: "" };
    else {
      if (p && p.name) map[k].name = map[k].name || p.name;
      if (p && p.whatsapp) map[k].whatsapp = map[k].whatsapp || p.whatsapp;
    }
    map[k].profile = p;
  });
  return Object.values(map).sort((a, b) => b.totalSpend - a.totalSpend || String(a.name).localeCompare(String(b.name)));
}

function renderCustomers() {
  if (!customersTableBody) return;
  const all = customerList();
  const q = (document.querySelector("#customerSearchInput")?.value || "").trim().toLowerCase();
  const list = q ? all.filter(c => `${c.name} ${c.email} ${c.whatsapp}`.toLowerCase().includes(q)) : all;

  if (!list.length) {
    customersTableBody.innerHTML = `<tr><td colspan="6" class="empty">${all.length ? "No customers match your search." : "No customers yet. They appear after their first order or profile sign-in."}</td></tr>`;
    return;
  }

  customersTableBody.innerHTML = list.map(c => {
    const m = c.profile && c.profile.measurements;
    const measured = m && Object.values(m).some(v => v);
    return `
      <tr>
        <td><span class="cell-main">${escapeHtml(c.name || "Unnamed customer")}</span><span class="cell-sub">${escapeHtml(c.email)}</span></td>
        <td class="nowrap">${escapeHtml(c.whatsapp) || '<span class="muted">Not given</span>'}</td>
        <td>${measured ? `<span class="badge badge-ok">Saved</span>` : `<span class="badge badge-off">None</span>`}</td>
        <td class="num"><strong>${formatNaira(c.totalSpend)}</strong></td>
        <td class="num">${c.ordersCount}${c.lastOrder ? `<span class="cell-sub">Last: ${escapeHtml(c.lastOrder)}</span>` : ""}</td>
        <td>
          <div class="acts">
            <button type="button" class="act act-text reset-pin-btn" data-email="${escapeHtml(c.email)}" title="Set a new profile PIN">${ICON("key")}Reset PIN</button>
          </div>
        </td>
      </tr>`;
  }).join("");

  customersTableBody.querySelectorAll(".reset-pin-btn").forEach(btn => {
    btn.onclick = () => {
      const email = String(btn.dataset.email || "").toLowerCase();
      const newPin = prompt(`New 4-digit profile PIN for ${email}`);
      if (newPin === null) return;
      if (!/^\d{4}$/.test(newPin.trim())) {
        alert("The PIN must be exactly 4 digits.");
        return;
      }
      const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
      const c = all.find(x => x.email === email) || {};
      profiles[email] = { ...(profiles[email] || { email, name: c.name || "", whatsapp: c.whatsapp || "" }), newPin: newPin.trim() };
      localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
      renderCustomers();
      if (window.obanToast) window.obanToast(`PIN updated for ${email}. Share it with the customer directly.`);
    };
  });
}

const customerSearchInput = document.querySelector("#customerSearchInput");
if (customerSearchInput) customerSearchInput.oninput = () => renderCustomers();

// CSV helpers shared by the exports and the customer import.
function csvCell(value) {
  const s = String(value === undefined || value === null ? "" : value);
  return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s;
}

function downloadCsv(filename, rows) {
  const csv = rows.map(r => r.map(csvCell).join(",")).join("\n");
  const blob = new Blob(["﻿" + csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(url), 1000);
}

// Parses CSV text, including quoted fields with commas, quotes and line breaks.
function parseCsv(text) {
  const rows = [];
  let row = [];
  let cell = "";
  let quoted = false;
  const src = String(text || "").replace(/^﻿/, "");
  for (let i = 0; i < src.length; i++) {
    const ch = src[i];
    if (quoted) {
      if (ch === '"' && src[i + 1] === '"') { cell += '"'; i++; }
      else if (ch === '"') quoted = false;
      else cell += ch;
    } else if (ch === '"') quoted = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") {
      if (ch === "\r" && src[i + 1] === "\n") i++;
      row.push(cell); rows.push(row); row = []; cell = "";
    } else cell += ch;
  }
  if (cell || row.length) { row.push(cell); rows.push(row); }
  return rows.filter(r => r.some(c => String(c).trim()));
}

const exportCustomersBtn = document.querySelector("#exportCustomersBtn");
if (exportCustomersBtn) {
  exportCustomersBtn.onclick = () => {
    const rows = [["Name", "Email", "WhatsApp", "Saved Measurements", "Total Spend", "Orders"]];
    customerList().forEach(c => {
      const m = c.profile && c.profile.measurements;
      rows.push([c.name, c.email, c.whatsapp, m && Object.values(m).some(v => v) ? "Yes" : "No", c.totalSpend, c.ordersCount]);
    });
    downloadCsv(`oban_customers_${new Date().toISOString().slice(0, 10)}.csv`, rows);
  };
}

// Import: header row with Name, Email and WhatsApp (any order, any case).
// Existing customers are never changed; only new emails are added.
const importCustomersBtn = document.querySelector("#importCustomersBtn");
const importCustomersInput = document.querySelector("#importCustomersInput");
if (importCustomersBtn && importCustomersInput) {
  importCustomersBtn.onclick = () => importCustomersInput.click();
  importCustomersInput.onchange = (e) => {
    const file = e.target.files[0];
    importCustomersInput.value = "";
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (evt) => {
      const rows = parseCsv(evt.target.result);
      if (rows.length < 2) {
        alert("That file has no customer rows.");
        return;
      }
      const header = rows[0].map(h => String(h).trim().toLowerCase());
      const col = (...names) => header.findIndex(h => names.some(n => h === n || h.includes(n)));
      const iName = col("name", "customer");
      const iEmail = col("email");
      const iPhone = col("whatsapp", "phone", "mobile");
      if (iEmail < 0) {
        alert('The first row must be a header with an "Email" column (plus "Name" and "WhatsApp").');
        return;
      }
      const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
      const known = new Set([...Object.keys(profiles).map(k => k.toLowerCase()), ...customerList().map(c => c.email)]);
      let added = 0;
      let skipped = 0;
      rows.slice(1).forEach(r => {
        const email = String(r[iEmail] || "").trim().toLowerCase();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { skipped++; return; }
        if (known.has(email)) { skipped++; return; }
        profiles[email] = {
          email,
          name: iName >= 0 ? String(r[iName] || "").trim() : "",
          whatsapp: iPhone >= 0 ? String(r[iPhone] || "").trim() : "",
          importedAt: new Date().toISOString()
        };
        known.add(email);
        added++;
      });
      if (added) localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
      renderCustomers();
      alert(`Imported ${added} new customer${added === 1 ? "" : "s"}.${skipped ? ` ${skipped} row${skipped === 1 ? " was" : "s were"} skipped (already a customer or no valid email).` : ""}`);
    };
    reader.readAsText(file);
  };
}

// -------------------------------------------------------------
// INVENTORY TAB
// -------------------------------------------------------------
const inventoryTableBody = document.querySelector("#inventoryTableBody");
const editInventoryDialog = document.querySelector("#editInventoryDialog");
const addInventoryDialog = document.querySelector("#addInventoryDialog");
const editInventoryForm = document.querySelector("#editInventoryForm");
const addInventoryForm = document.querySelector("#addInventoryForm");
const inventorySearchInput = document.querySelector("#inventorySearchInput");
const addImagesInput = document.querySelector("#addImagesInput");

let currentEditingImages = [];
let currentAddingImages = [];
let pendingEditImageUpload = Promise.resolve();
let pendingAddImageUpload = Promise.resolve();

function renderImagePreview(container, images, onRemove, onMakeMain) {
  if (!container) return;
  if (!images || !images.length) {
    container.innerHTML = '<span class="hint">No photos yet.</span>';
    return;
  }
  container.innerHTML = images.map((imgUrl, imgIdx) => imgUrl ? `
    <div class="thumb-card">
      <img src="${escapeHtml(imgUrl)}" alt="Photo ${imgIdx + 1}" loading="lazy">
      <button type="button" class="thumb-remove" data-img-idx="${imgIdx}" title="Remove photo" aria-label="Remove photo ${imgIdx + 1}">${ICON("close")}</button>
      ${imgIdx === 0 ? `<span class="thumb-main">Main photo</span>` : `<button type="button" class="thumb-set" data-img-idx="${imgIdx}">Make main</button>`}
    </div>` : "").join("");

  container.querySelectorAll(".thumb-remove").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      onRemove(+btn.dataset.imgIdx);
    };
  });
  container.querySelectorAll(".thumb-set").forEach(btn => {
    btn.onclick = (e) => {
      e.stopPropagation();
      if (onMakeMain) onMakeMain(+btn.dataset.imgIdx);
    };
  });
}

function moveToFront(list, idx) {
  const [item] = list.splice(idx, 1);
  list.unshift(item);
}

function renderEditImagePreview() {
  renderImagePreview(document.querySelector("#editImagePreviewContainer"), currentEditingImages, (imgIdx) => {
    currentEditingImages.splice(imgIdx, 1);
    renderEditImagePreview();
  }, (imgIdx) => {
    moveToFront(currentEditingImages, imgIdx);
    renderEditImagePreview();
  });
}

function renderAddImagePreview() {
  renderImagePreview(document.querySelector("#addImagePreviewContainer"), currentAddingImages, (imgIdx) => {
    currentAddingImages.splice(imgIdx, 1);
    renderAddImagePreview();
  }, (imgIdx) => {
    moveToFront(currentAddingImages, imgIdx);
    renderAddImagePreview();
  });
}

function isImageUpload(file) {
  if (file.type && file.type.startsWith("image/")) return true;
  return /\.(jpe?g|png|webp|gif)$/i.test(file.name || "");
}

function compressImageFile(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(new Error("Unable to read selected image."));
    reader.onload = () => {
      const img = new Image();
      img.onerror = () => reject(new Error("Unable to process selected image."));
      img.onload = () => {
        const maxSize = 1200;
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height));
        const width = Math.max(1, Math.round(img.width * scale));
        const height = Math.max(1, Math.round(img.height * scale));
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.76));
      };
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  });
}

async function appendUploadedImages(input, targetImages, renderPreview) {
  const files = Array.from(input.files || []);
  if (!files.length) return;
  const imageFiles = files.filter(isImageUpload);
  if (!imageFiles.length) {
    alert("Please choose valid image files only.");
    input.value = "";
    return;
  }

  const maxFileLimit = 15 * 1024 * 1024; // 15MB limit
  for (const file of imageFiles) {
    if (file.size > maxFileLimit) {
      alert(`File "${file.name}" is too large. Maximum size is 15MB.`);
      continue;
    }
    try {
      // Stored once on the server; the garment keeps only the image URL.
      const dataUrl = await compressImageFile(file);
      targetImages.push(window.obanUploadImage ? await window.obanUploadImage(dataUrl) : dataUrl);
      renderPreview();
    } catch (err) {
      alert(`Could not upload ${file.name}. Please try another image.`);
    }
  }
  input.value = "";
}

const editImagesInput = document.querySelector("#editImagesInput");
if (editImagesInput) {
  editImagesInput.onchange = () => {
    pendingEditImageUpload = appendUploadedImages(editImagesInput, currentEditingImages, renderEditImagePreview);
  };
}
if (addImagesInput) {
  addImagesInput.onchange = () => {
    pendingAddImageUpload = appendUploadedImages(addImagesInput, currentAddingImages, renderAddImagePreview);
  };
}

function renderInventory() {
  if (!inventoryTableBody) return;
  const allItems = sortCatalog(JSON.parse(localStorage.getItem("oban-products")) || []);
  const query = (inventorySearchInput?.value || "").trim().toLowerCase();
  const category = document.querySelector("#inventoryCategoryFilter")?.value || "";
  const indexedList = allItems
    .map((item, originalIndex) => ({ item, originalIndex }))
    .filter(({ item }) => !category || item.category === category)
    .filter(({ item }) => !query || `${item.name || ""} ${item.code || ""}`.toLowerCase().includes(query));

  if (typeof window.renderInventoryStats === "function") window.renderInventoryStats(allItems);

  if (!indexedList.length) {
    inventoryTableBody.innerHTML = `<tr><td colspan="7" class="empty">${allItems.length ? "No garments match these filters." : "No garments in the catalogue yet."}</td></tr>`;
    return;
  }

  const canDelete = ["admin", "manager"].includes(window.obanStaffRole ? window.obanStaffRole() : "");
  // Position within its collection, as shown on the website.
  const positions = {};
  allItems.forEach(item => {
    positions[item.category] = (positions[item.category] || 0) + 1;
    item._pos = positions[item.category];
  });

  inventoryTableBody.innerHTML = indexedList.map(({ item, originalIndex }) => {
    const isFeatured = !!item.featured;
    const mainImg = (item.images && item.images.length > 0) ? item.images[0] : "";
    const code = escapeHtml(item.code || "");
    const price = Number(item.price) || 0;
    const discount = Number(item.discount) || 0;
    const photo = mainImg
      ? `<img class="thumb" src="${escapeHtml(mainImg)}" alt="${escapeHtml(item.name || item.code)}" loading="lazy">`
      : `<span class="thumb thumb-empty">${ICON("image")}</span>`;
    const priceCell = discount > 0
      ? `<strong>${formatNaira(Math.round(price * (1 - discount / 100)))}</strong><span class="cell-sub">${formatNaira(price)} less ${discount}%</span>`
      : `<strong>${formatNaira(price)}</strong>`;

    return `
    <tr>
      <td>${photo}</td>
      <td><span class="ref">${code}</span><span class="cell-sub">${escapeHtml(item.name && item.name !== item.code ? item.name : "")}${(item.images || []).length ? `${item.name && item.name !== item.code ? " · " : ""}${item.images.length} photo${item.images.length === 1 ? "" : "s"}` : ""}</span></td>
      <td><span class="badge badge-plain">${escapeHtml(item.category || "Uncategorised")}</span><span class="cell-sub">Position ${item._pos}</span></td>
      <td class="num">${priceCell}</td>
      <td><div class="clip muted" title="${escapeHtml(item.desc || item.description)}">${escapeHtml(item.desc || item.description)}</div></td>
      <td>
        <button type="button" class="act act-text toggle-featured-btn ${isFeatured ? "act-on" : ""}" data-code="${code}" data-index="${originalIndex}" title="${isFeatured ? "Shown in featured sections. Click to make standard." : "Click to feature on the home page"}">
          <svg class="ic ${isFeatured ? "ic-fill" : ""}"><use href="#i-star"/></svg>${isFeatured ? "Featured" : "Standard"}
        </button>
      </td>
      <td>
        <div class="acts">
          <button type="button" class="act edit-inv-btn" data-code="${code}" data-index="${originalIndex}" title="Edit garment" aria-label="Edit ${code}">${ICON("edit")}</button>
          ${canDelete ? `<button type="button" class="act act-danger delete-inv-btn" data-code="${code}" data-index="${originalIndex}" title="Delete garment" aria-label="Delete ${code}">${ICON("trash")}</button>` : ""}
        </div>
      </td>
    </tr>`;
  }).join("");

  inventoryTableBody.querySelectorAll(".toggle-featured-btn").forEach(btn => {
    btn.onclick = (e) => {
      const code = (e.currentTarget.dataset.code || "").toUpperCase();
      const list = JSON.parse(localStorage.getItem("oban-products")) || [];
      const item = list.find(p => (p.code || "").toUpperCase() === code);
      if (item) {
        item.featured = !item.featured;
        localStorage.setItem("oban-products", JSON.stringify(list));
        renderInventory();
      }
    };
  });

  inventoryTableBody.querySelectorAll(".edit-inv-btn").forEach(btn => {
    btn.onclick = (e) => {
      const code = (e.currentTarget.dataset.code || "").toUpperCase();
      const list = JSON.parse(localStorage.getItem("oban-products")) || [];
      const item = list.find(p => (p.code || "").toUpperCase() === code);
      if (!item) return;
      
      document.querySelector("#editIndex").value = item.code || idx;
      document.querySelector("#editCode").value = item.code || "";
      document.querySelector("#editName").value = item.name || "";
      document.querySelector("#editPrice").value = item.price || 0;
      document.querySelector("#editDesc").value = item.desc || item.description || "";
      document.querySelector("#editDiscount").value = item.discount || 0;
      
      // Populate Header Preview Card in Edit Modal
      const previewHeader = document.querySelector("#editProductHeaderPreview");
      const allImgs = item.images ? [...item.images] : [];
      const firstImg = allImgs.length > 0 ? allImgs[0] : "";
      if (previewHeader) {
        previewHeader.innerHTML = `
          ${firstImg ? `<img src="${escapeHtml(firstImg)}" alt="">` : `<span class="thumb-empty">${ICON("image")}</span>`}
          <div>
            <h4>${escapeHtml(item.name || item.code || "Garment")}</h4>
            <p>${escapeHtml(item.code || "")} · ${formatNaira(item.price || 0)}</p>
            <span class="cell-sub">${escapeHtml(item.category || "")}</span>
          </div>
        `;
      }
      const editUrlInput = document.querySelector("#editImagesUrlInput");
      if (editUrlInput) {
        editUrlInput.value = "";
      }
      currentEditingImages = [...allImgs];
      renderEditImagePreview();
      
      // Always clear position field when dialog opens
      const posField = document.querySelector("#editMovePosition");
      if (posField) posField.value = "";
      
      if (editInventoryDialog) editInventoryDialog.showModal();
    };
  });

  inventoryTableBody.querySelectorAll(".delete-inv-btn").forEach(btn => {
    btn.onclick = (e) => {
      const code = (e.currentTarget.dataset.code || "").toUpperCase();
      const list = JSON.parse(localStorage.getItem("oban-products")) || [];
      const itemIdx = list.findIndex(p => (p.code || "").toUpperCase() === code);
      if (itemIdx !== -1 && confirm(`Are you sure you want to delete garment listing (${code}) from the catalog?`)) {
        list.splice(itemIdx, 1);
        localStorage.setItem("oban-products", JSON.stringify(list));
        renderInventory();
      }
    };
  });
}

const addInventoryBtn = document.querySelector("#addInventoryBtn");
if (addInventoryBtn && addInventoryDialog) {
  addInventoryBtn.onclick = () => {
    currentAddingImages = [];
    renderAddImagePreview();
    addInventoryDialog.showModal();
  };
}
const closeAddBtn = document.querySelector("#closeAddBtn");
if (closeAddBtn && addInventoryDialog) {
  closeAddBtn.onclick = () => {
    currentAddingImages = [];
    renderAddImagePreview();
    addInventoryDialog.close();
  };
}
const closeEditBtn = document.querySelector("#closeEditBtn");
if (closeEditBtn && editInventoryDialog) {
  closeEditBtn.onclick = () => editInventoryDialog.close();
}

if (addInventoryForm) {
  addInventoryForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = addInventoryForm.querySelector("button[type='submit']");
    const originalText = "Add garment";
    const addImgInput = document.querySelector("#addImagesInput");
    const isUploading = addImgInput && addImgInput.files && addImgInput.files.length > 0;
    
    if (submitBtn) {
      submitBtn.textContent = isUploading ? "Uploading Images..." : "Saving Changes...";
      submitBtn.disabled = true;
    }
    
    try {
      if (pendingAddImageUpload) {
        await pendingAddImageUpload.catch(() => {});
      }
      
      const list = JSON.parse(localStorage.getItem("oban-products")) || [];
      
      const code = document.querySelector("#addCode").value.trim().toUpperCase();
      const name = document.querySelector("#addName").value.trim();
      const category = document.querySelector("#addCategory").value;
      const price = +document.querySelector("#addPrice").value;
      const desc = document.querySelector("#addDesc").value.trim();
      const discount = +document.querySelector("#addDiscount").value;

      if (list.some(item => (item.code || "").toUpperCase() === code)) {
        alert("A garment with this code already exists. Please use a unique garment code.");
        return;
      }
      
      const urlInput = document.querySelector("#addImagesUrlInput");
      const urlVal = urlInput ? urlInput.value.trim() : "";
      let imagesList = [...currentAddingImages];
      if (urlVal) {
        const splitUrls = urlVal.split(",").map(u => u.trim()).filter(u => u.length > 0);
        imagesList = [...imagesList, ...splitUrls];
      }

      const newItem = {
        id: Date.now(),
        code,
        name,
        category,
        price,
        desc,
        description: desc,
        discount,
        images: imagesList,
        bg: "#eee5d5",
        color: "#8c867c",
        tag: "New",
        featured: true,
        date: Date.now()
      };

      list.push(newItem);
      const sortedList = sortCatalog(list);
      localStorage.setItem("oban-products", JSON.stringify(sortedList));
      
      addInventoryForm.reset();
      currentAddingImages = [];
      renderAddImagePreview();
      if (addInventoryDialog) addInventoryDialog.close();
      renderInventory();
      alert("Garment added successfully.");
    } catch (err) {
      console.error("Add inventory error:", err);
      alert("An error occurred while adding garment: " + err.message);
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  };
}

if (editInventoryForm) {
  editInventoryForm.onsubmit = async (e) => {
    e.preventDefault();
    const submitBtn = editInventoryForm.querySelector("button[type='submit']");
    const originalText = "Save changes";
    const editImgInput = document.querySelector("#editImagesInput");
    const isUploading = editImgInput && editImgInput.files && editImgInput.files.length > 0;
    
    if (submitBtn) {
      submitBtn.textContent = isUploading ? "Uploading Images..." : "Saving Changes...";
      submitBtn.disabled = true;
    }
    
    try {
      if (pendingEditImageUpload) {
        await pendingEditImageUpload.catch(() => {});
      }
      
      const list = JSON.parse(localStorage.getItem("oban-products")) || [];
      const editIdxRaw = document.querySelector("#editIndex").value;
      // Find by code first (robust), fall back to numeric index for legacy
      let itemRef = list.find(p => (p.code || "").toUpperCase() === String(editIdxRaw).toUpperCase());
      let idx = itemRef ? list.indexOf(itemRef) : +editIdxRaw;
      if (!list[idx]) {
        alert("This garment could not be found. Please refresh inventory and try again.");
        return;
      }
      itemRef = list[idx];
      
      const codeVal = document.querySelector("#editCode").value.trim().toUpperCase();
      if (list.some((item, itemIdx) => itemIdx !== idx && (item.code || "").toUpperCase() === codeVal)) {
        alert("A garment with this code already exists. Please use a unique garment code.");
        return;
      }
      
      const urlInput = document.querySelector("#editImagesUrlInput");
      const urlVal = urlInput ? urlInput.value.trim() : "";
      let imagesList = [...currentEditingImages];
      if (urlVal) {
        const splitUrls = urlVal.split(",").map(u => u.trim()).filter(u => u.length > 0);
        imagesList = [...imagesList, ...splitUrls];
      }
      
      // Update product fields
      itemRef.code = codeVal;
      itemRef.name = document.querySelector("#editName").value.trim();
      itemRef.price = +document.querySelector("#editPrice").value;
      itemRef.desc = document.querySelector("#editDesc").value.trim();
      itemRef.description = itemRef.desc;
      itemRef.discount = +document.querySelector("#editDiscount").value;
      itemRef.images = imagesList;
      
      // ---- Position Reorder Logic ----
      const positionInput = document.querySelector("#editMovePosition");
      const targetPos = positionInput ? parseInt(positionInput.value.trim(), 10) : NaN;
      if (!isNaN(targetPos) && targetPos >= 1) {
        const category = itemRef.category || "";
        const catItems = list.filter(p => (p.category || "") === category);
        const catIdx = catItems.findIndex(p => (p.code || "").toUpperCase() === codeVal);
        if (catIdx !== -1) {
          const [garment] = catItems.splice(catIdx, 1);
          const insertAt = Math.min(targetPos - 1, catItems.length);
          catItems.splice(insertAt, 0, garment);
        }
        catItems.forEach((p, posIdx) => {
          p.position = posIdx + 1;
        });
      }
      
      localStorage.setItem("oban-products", JSON.stringify(list));
      
      if (editInventoryDialog) editInventoryDialog.close();
      renderInventory();
      alert("Garment changes saved successfully.");
    } catch (err) {
      console.error("Save inventory error:", err);
      alert("An error occurred while saving: " + err.message);
    } finally {
      if (submitBtn) {
        submitBtn.textContent = originalText;
        submitBtn.disabled = false;
      }
    }
  };
}

if (inventorySearchInput) {
  inventorySearchInput.oninput = () => renderInventory();
}
const inventoryCategoryFilter = document.querySelector("#inventoryCategoryFilter");
if (inventoryCategoryFilter) {
  inventoryCategoryFilter.onchange = () => renderInventory();
}
// -------------------------------------------------------------
// BLOG EDITOR TAB
// -------------------------------------------------------------
const blogArticleForm = document.querySelector("#blogArticleForm");
const articlesTableBody = document.querySelector("#articlesTableBody");
const cancelBlogEditBtn = document.querySelector("#cancelBlogEditBtn");
const blogFormTitle = document.querySelector("#blogFormTitle");
const artImageFile = document.querySelector("#artImageFile");
const artImageBase64 = document.querySelector("#artImageBase64");

if (artImageFile && artImageBase64) {
  artImageFile.onchange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    // Resized and stored on the server once; the article keeps only the URL.
    const submit = blogArticleForm && blogArticleForm.querySelector("button[type=submit]");
    if (submit) submit.disabled = true;
    compressImageFile(file)
      .then(dataUrl => (window.obanUploadImage ? window.obanUploadImage(dataUrl) : dataUrl))
      .then(url => { artImageBase64.value = url; })
      .catch(() => alert("That image could not be used. Please try a JPG or PNG."))
      .finally(() => { if (submit) submit.disabled = false; });
  };
}

function renderBlogFeed() {
  if (!articlesTableBody) return;
  const list = JSON.parse(localStorage.getItem("oban-blog-articles")) || [];
  
  if (!list.length) {
    articlesTableBody.innerHTML = `<tr><td colspan="5" class="empty">No articles yet. Write one with the form.</td></tr>`;
    return;
  }

  articlesTableBody.innerHTML = list.map((art, idx) => {
    const thumb = art.image
      ? `<img class="thumb" src="${escapeHtml(art.image)}" alt="" loading="lazy">`
      : `<span class="thumb thumb-empty">${ICON("image")}</span>`;
    return `
      <tr>
        <td><div class="art-cell">${thumb}<div><span class="cell-main">${escapeHtml(art.title)}</span><span class="cell-sub clip">${escapeHtml(art.excerpt || "")}</span></div></div></td>
        <td><span class="badge badge-plain">${escapeHtml(art.category || "General")}</span></td>
        <td class="nowrap">${escapeHtml(art.date)}</td>
        <td class="nowrap">${escapeHtml(art.author)}</td>
        <td>
          <div class="acts">
            <button type="button" class="act edit-art-btn" data-index="${idx}" title="Edit article" aria-label="Edit article">${ICON("edit")}</button>
            <button type="button" class="act copy-art-link-btn" data-filename="${escapeHtml(art.filename || "")}" data-id="${escapeHtml(art.id || "")}" data-title="${escapeHtml(art.title)}" title="Copy link to this article" aria-label="Copy link">${ICON("link")}</button>
            <button type="button" class="act act-danger delete-art-btn" data-index="${idx}" title="Delete article" aria-label="Delete article">${ICON("trash")}</button>
          </div>
        </td>
      </tr>`;
  }).join("");

  // Bind Edit buttons
  articlesTableBody.querySelectorAll(".edit-art-btn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = +e.currentTarget.dataset.index;
      const list = JSON.parse(localStorage.getItem("oban-blog-articles")) || [];
      const art = list[idx];
      
      document.querySelector("#articleEditId").value = idx;
      document.querySelector("#artTitle").value = art.title;
      document.querySelector("#artCategory").value = art.category;
      document.querySelector("#artExcerpt").value = art.excerpt;
      document.querySelector("#artAuthor").value = art.author;
      document.querySelector("#artContent").value = art.content;
      document.querySelector("#artImageBase64").value = art.image || "";
      
      if (blogFormTitle) blogFormTitle.textContent = "Edit Article Post";
      if (cancelBlogEditBtn) cancelBlogEditBtn.style.display = "inline-block";
    };
  });

  // Bind Delete buttons
  articlesTableBody.querySelectorAll(".delete-art-btn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = +e.currentTarget.dataset.index;
      if (confirm("Delete this article forever?")) {
        const list = JSON.parse(localStorage.getItem("oban-blog-articles")) || [];
        list.splice(idx, 1);
        localStorage.setItem("oban-blog-articles", JSON.stringify(list));
        renderBlogFeed();
      }
    };
  });

  // Bind Copy Link buttons
  // Articles that have their own page on the site keep that address; articles
  // written in the dashboard are shown by /article?id=...
  const STATIC_ARTICLE_PAGES = new Set([
    "accessorizing-traditional-wear.html", "agbada-elegance.html", "art-of-bespoke-tailoring.html",
    "caring-velvet-brocade.html", "choosing-right-outfit.html", "contemporary-menswear-global.html",
    "corporate-kaftans-executive.html", "fabric-selection-kaftans.html", "father-son-matching.html",
    "modern-groom-agbada.html", "suits-vs-kaftans.html", "why-kaftan.html"
  ]);
  articlesTableBody.querySelectorAll(".copy-art-link-btn").forEach(btn => {
    btn.onclick = (e) => {
      const { filename, id } = e.currentTarget.dataset;
      const site = window.location.origin.replace("//dashboard.", "//");
      const fullUrl = STATIC_ARTICLE_PAGES.has(filename)
        ? `${site}/${filename.replace(/\.html$/, "")}`
        : `${site}/article?id=${encodeURIComponent(id)}`;
      const done = () => (window.obanToast ? window.obanToast(`Link copied: ${fullUrl}`) : alert(`Link copied:\n${fullUrl}`));
      navigator.clipboard.writeText(fullUrl).then(done).catch(() => {
        const el = document.createElement("textarea");
        el.value = fullUrl;
        document.body.appendChild(el);
        el.select();
        document.execCommand("copy");
        el.remove();
        done();
      });
    };
  });
}

if (blogArticleForm) {
  blogArticleForm.onsubmit = (e) => {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem("oban-blog-articles")) || [];
    const editId = document.querySelector("#articleEditId").value;
    
    const title = document.querySelector("#artTitle").value.trim();
    const category = document.querySelector("#artCategory").value.trim();
    const excerpt = document.querySelector("#artExcerpt").value.trim();
    const author = document.querySelector("#artAuthor").value.trim();
    const content = document.querySelector("#artContent").value;
    const image = document.querySelector("#artImageBase64").value;
    
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateStr = `${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
    const filename = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '.html';

    if (editId !== "") {
      const idx = +editId;
      list[idx].title = title;
      list[idx].category = category;
      list[idx].excerpt = excerpt;
      list[idx].author = author;
      list[idx].content = content;
      list[idx].image = image;
      list[idx].filename = filename;
      alert("Article updated successfully!");
    } else {
      const newArt = {
        id: "art-" + Date.now(),
        title,
        category,
        excerpt,
        author,
        date: dateStr,
        content,
        image,
        filename
      };
      list.unshift(newArt);
      alert("New article posted successfully!");
    }
    
    localStorage.setItem("oban-blog-articles", JSON.stringify(list));
    resetBlogForm();
    renderBlogFeed();
  };
}

if (cancelBlogEditBtn) {
  cancelBlogEditBtn.onclick = () => resetBlogForm();
}

function resetBlogForm() {
  if (blogArticleForm) blogArticleForm.reset();
  document.querySelector("#articleEditId").value = "";
  document.querySelector("#artImageBase64").value = "";
  if (blogFormTitle) blogFormTitle.textContent = "Write New Article";
  if (cancelBlogEditBtn) cancelBlogEditBtn.style.display = "none";
}

// -------------------------------------------------------------
// STAFF SETTINGS TAB
// -------------------------------------------------------------
// Staff accounts are managed on the server: see renderStaff in admin-sync.js.

// -------------------------------------------------------------
// PURCHASES MANAGEMENT TAB & DIALOGS
// -------------------------------------------------------------
const vendorsTableBody = document.querySelector("#vendorsTableBody");
const poTableBody = document.querySelector("#poTableBody");
const receivesTableBody = document.querySelector("#receivesTableBody");
const billsTableBody = document.querySelector("#billsTableBody");
const paymentsTableBody = document.querySelector("#paymentsTableBody");

const addVendorDialog = document.querySelector("#addVendorDialog");
const addVendorForm = document.querySelector("#addVendorForm");
const raisePODialog = document.querySelector("#raisePODialog");
const raisePOForm = document.querySelector("#raisePOForm");
const uploadInvoiceDialog = document.querySelector("#uploadInvoiceDialog");
const uploadInvoiceForm = document.querySelector("#uploadInvoiceForm");
const raiseCustomerInvoiceDialog = document.querySelector("#raiseCustomerInvoiceDialog");
const raiseCustomerInvoiceForm = document.querySelector("#raiseCustomerInvoiceForm");

// Subtab: Render Vendors
function renderVendors() {
  if (!vendorsTableBody) return;
  const list = JSON.parse(localStorage.getItem("oban-vendors")) || [];
  
  if (!list.length) {
    vendorsTableBody.innerHTML = `<tr><td colspan="7" class="empty">No vendors registered.</td></tr>`;
    return;
  }

  vendorsTableBody.innerHTML = list.map((v, idx) => {
    return `
      <tr>
        <td><span class="cell-main">${escapeHtml(v.name)}</span></td>
        <td>${escapeHtml(v.contactPerson)}</td>
        <td>${escapeHtml(v.email)}</td>
        <td class="nowrap">${escapeHtml(v.phone)}</td>
        <td><div class="clip">${escapeHtml(v.address)}</div></td>
        <td><span class="badge badge-plain">${escapeHtml(v.currency)}</span></td>
        <td>
          <button type="button" class="act act-danger delete-vendor-btn" data-index="${idx}" title="Remove vendor" aria-label="Remove vendor">${ICON("trash")}</button>
        </td>
      </tr>
    `;
  }).join("");

  vendorsTableBody.querySelectorAll(".delete-vendor-btn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = +e.currentTarget.dataset.index;
      if (confirm("Remove this supplier from registry?")) {
        const list = JSON.parse(localStorage.getItem("oban-vendors")) || [];
        list.splice(idx, 1);
        localStorage.setItem("oban-vendors", JSON.stringify(list));
        renderVendors();
      }
    };
  });
}

// Subtab: Render Purchase Orders
function renderPurchaseOrdersList() {
  if (!poTableBody) return;
  const list = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
  
  if (!list.length) {
    poTableBody.innerHTML = `<tr><td colspan="9" class="empty">No Purchase Orders generated yet.</td></tr>`;
    return;
  }

  poTableBody.innerHTML = list.map((po, idx) => {
    const isReceived = po.status === "Received";
    const amountStr = "\u20A6" + Number(po.amount).toLocaleString();
    const invoiceLink = po.invoiceUrl ? `<a class="act act-text" href="${escapeHtml(po.invoiceUrl)}" target="_blank" rel="noopener">${ICON("external")}View</a>` : `<button type="button" class="act act-text attach-inv-btn" data-id="${escapeHtml(po.id)}">${ICON("upload")}Attach</button>`;
    
    let actions = "";
    if (po.status === "Pending") {
      actions += `<button type="button" class="act act-text receive-po-btn" data-index="${idx}">${ICON("inbox")}Mark received</button>`;
    } else {
      actions += `<span class="badge badge-ok">Completed</span>`;
    }

    return `
      <tr>
        <td><span class="ref">${escapeHtml(po.id)}</span></td>
        <td class="nowrap">${escapeHtml(po.date)}</td>
        <td>${escapeHtml(po.vendorName)}</td>
        <td class="nowrap">${escapeHtml(po.deliveryDate)}</td>
        <td class="num"><strong>${amountStr}</strong></td>
        <td><span class="badge ${po.billed === "Yes" ? "badge-ok" : "st-1"}">${po.billed === "Yes" ? "Billed" : "Not billed"}</span></td>
        <td><span class="badge ${isReceived ? "badge-ok" : "st-1"}">${escapeHtml(po.status)}</span></td>
        <td>${invoiceLink}</td>
        <td>
          <div class="acts">
            <button type="button" class="act act-text print-po-btn" data-id="${escapeHtml(po.id)}">${ICON("print")}Print</button>
            ${actions}
          </div>
        </td>
      </tr>
    `;
  }).join("");

  // Bind Attach invoice
  poTableBody.querySelectorAll(".attach-inv-btn").forEach(btn => {
    btn.onclick = (e) => {
      const id = e.currentTarget.dataset.id;
      document.querySelector("#uploadInvoicePoId").value = id;
      if (uploadInvoiceDialog) uploadInvoiceDialog.showModal();
    };
  });

  // Bind Print PO
  poTableBody.querySelectorAll(".print-po-btn").forEach(btn => {
    btn.onclick = (e) => {
      const id = e.currentTarget.dataset.id;
      const list = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
      const poObj = list.find(x => x.id === id);
      const vendors = JSON.parse(localStorage.getItem("oban-vendors")) || [];
      const vObj = vendors.find(x => x.name === poObj.vendorName) || { name: poObj.vendorName };
      if (poObj && window.generatePOPrint) {
        window.generatePOPrint(poObj, vObj);
      }
    };
  });

  // Bind Acknowledge Receive
  poTableBody.querySelectorAll(".receive-po-btn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = +e.currentTarget.dataset.index;
      const list = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
      const poObj = list[idx];
      
      poObj.status = "Received";
      localStorage.setItem("oban-purchase-orders", JSON.stringify(list));

      // Generate matching Bill Payable automatically
      const bills = JSON.parse(localStorage.getItem("oban-bills")) || [];
      const billId = "BILL-" + poObj.id.replace("PO-", "");
      if (!bills.some(b => b.id === billId)) {
        bills.push({
          id: billId,
          poId: poObj.id,
          vendorName: poObj.vendorName,
          dateCreated: new Date().toISOString().split('T')[0],
          amount: poObj.amount,
          status: "Unpaid"
        });
        localStorage.setItem("oban-bills", JSON.stringify(bills));
      }
      
      renderPurchaseOrdersList();
      alert(`PO ${poObj.id} status marked as Received. Bill payable has been generated.`);
    };
  });
}

// Subtab: Render Purchase Receives
function renderPurchaseReceivesList() {
  if (!receivesTableBody) return;
  const list = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
  const receivedList = list.filter(po => po.status === "Received");
  
  if (!receivedList.length) {
    receivesTableBody.innerHTML = `<tr><td colspan="6" class="empty">No items received in warehouse yet.</td></tr>`;
    return;
  }

  receivesTableBody.innerHTML = receivedList.map(po => {
    const amountStr = "\u20A6" + Number(po.amount).toLocaleString();
    return `
      <tr>
        <td><span class="ref">${escapeHtml(po.id)}</span></td>
        <td class="nowrap">${escapeHtml(po.date)}</td>
        <td>${escapeHtml(po.vendorName)}</td>
        <td class="nowrap">${escapeHtml(po.deliveryDate)}</td>
        <td class="num"><strong>${amountStr}</strong></td>
        <td><span class="badge ${po.billed === "Yes" ? "badge-ok" : "st-1"}">${po.billed === "Yes" ? "Billed" : "Awaiting bill"}</span></td>
      </tr>
    `;
  }).join("");
}

// Subtab: Render Bills Payable
function renderBillsList() {
  if (!billsTableBody) return;
  const list = JSON.parse(localStorage.getItem("oban-bills")) || [];
  
  if (!list.length) {
    billsTableBody.innerHTML = `<tr><td colspan="7" class="empty">No bills registered.</td></tr>`;
    return;
  }

  billsTableBody.innerHTML = list.map((bill, idx) => {
    const isPaid = bill.status === "Paid";
    const amountStr = "\u20A6" + Number(bill.amount).toLocaleString();
    const action = isPaid ? `<span class="badge badge-ok">Settled</span>` : `<button type="button" class="act act-text pay-bill-btn" data-index="${idx}">${ICON("wallet")}Record payment</button>`;

    return `
      <tr>
        <td><span class="ref">${escapeHtml(bill.id)}</span></td>
        <td>${escapeHtml(bill.poId)}</td>
        <td>${escapeHtml(bill.vendorName)}</td>
        <td class="nowrap">${escapeHtml(bill.dateCreated)}</td>
        <td class="num"><strong>${amountStr}</strong></td>
        <td><span class="badge ${isPaid ? "badge-ok" : "st-1"}">${escapeHtml(bill.status)}</span></td>
        <td>${action}</td>
      </tr>
    `;
  }).join("");

  billsTableBody.querySelectorAll(".pay-bill-btn").forEach(btn => {
    btn.onclick = (e) => {
      const idx = +e.currentTarget.dataset.index;
      const list = JSON.parse(localStorage.getItem("oban-bills")) || [];
      const bill = list[idx];
      
      bill.status = "Paid";
      localStorage.setItem("oban-bills", JSON.stringify(list));

      // Append ledger payment
      const payments = JSON.parse(localStorage.getItem("oban-payments")) || [];
      const payId = "PAY-" + bill.id.replace("BILL-", "");
      if (!payments.some(p => p.id === payId)) {
        payments.push({
          id: payId,
          billId: bill.id,
          poId: bill.poId,
          vendorName: bill.vendorName,
          datePaid: new Date().toISOString().split('T')[0],
          amount: bill.amount
        });
        localStorage.setItem("oban-payments", JSON.stringify(payments));
      }

      // Mark PO as billed = Yes
      const poOrders = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
      const poObj = poOrders.find(x => x.id === bill.poId);
      if (poObj) {
        poObj.billed = "Yes";
        localStorage.setItem("oban-purchase-orders", JSON.stringify(poOrders));
      }
      
      renderBillsList();
      alert(`Bill ${bill.id} marked as Paid. Transaction logged in Payments Ledger.`);
    };
  });
}

// Subtab: Render Payments Made Ledger
function renderPaymentsList() {
  if (!paymentsTableBody) return;
  const list = JSON.parse(localStorage.getItem("oban-payments")) || [];
  
  if (!list.length) {
    paymentsTableBody.innerHTML = `<tr><td colspan="7" class="empty">No ledger entries found.</td></tr>`;
    return;
  }

  paymentsTableBody.innerHTML = list.map(pay => {
    const amountStr = "\u20A6" + Number(pay.amount).toLocaleString();
    return `
      <tr>
        <td><span class="ref">${escapeHtml(pay.id)}</span></td>
        <td>${escapeHtml(pay.billId)}</td>
        <td>${escapeHtml(pay.poId)}</td>
        <td>${escapeHtml(pay.vendorName)}</td>
        <td class="nowrap">${escapeHtml(pay.datePaid)}</td>
        <td class="num"><strong>${amountStr}</strong></td>
        <td><button type="button" class="act act-text print-payment-btn" data-id="${escapeHtml(pay.id)}">${ICON("print")}Expense slip</button></td>
      </tr>
    `;
  }).join("");

  paymentsTableBody.querySelectorAll(".print-payment-btn").forEach(btn => {
    btn.onclick = (e) => {
      const id = e.currentTarget.dataset.id;
      const list = JSON.parse(localStorage.getItem("oban-payments")) || [];
      const paymentObj = list.find(x => x.id === id);
      const pos = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
      const poObj = pos.find(x => x.id === paymentObj.poId) || { id: paymentObj.poId };
      const vendors = JSON.parse(localStorage.getItem("oban-vendors")) || [];
      const vObj = vendors.find(x => x.name === paymentObj.vendorName) || { name: paymentObj.vendorName };
      
      if (paymentObj && window.generateExpenseReceiptPrint) {
        window.generateExpenseReceiptPrint(paymentObj, poObj, vObj);
      }
    };
  });
}

function renderPurchases() {
  const activeSubtab = document.querySelector(".purchases-nav-item.active");
  const sub = activeSubtab ? activeSubtab.dataset.subtab : "vendors";
  if (sub === "vendors") renderVendors();
  if (sub === "po") renderPurchaseOrdersList();
  if (sub === "receives") renderPurchaseReceivesList();
  if (sub === "bills") renderBillsList();
  if (sub === "payments") renderPaymentsList();
}

// Bind Vendor Buttons & Form
const btnOpenAddVendor = document.querySelector("#btnOpenAddVendor");
if (btnOpenAddVendor && addVendorDialog) {
  btnOpenAddVendor.onclick = () => addVendorDialog.showModal();
}
const closeAddVendorBtn = document.querySelector("#closeAddVendorBtn");
if (closeAddVendorBtn && addVendorDialog) {
  closeAddVendorBtn.onclick = () => addVendorDialog.close();
}
if (addVendorForm) {
  addVendorForm.onsubmit = (e) => {
    e.preventDefault();
    const list = JSON.parse(localStorage.getItem("oban-vendors")) || [];
    
    const name = document.querySelector("#vendorName").value.trim();
    const contact = document.querySelector("#vendorContactPerson").value.trim();
    const email = document.querySelector("#vendorEmail").value.trim();
    const phone = document.querySelector("#vendorPhone").value.trim();
    const address = document.querySelector("#vendorAddress").value.trim();
    const currency = document.querySelector("#vendorCurrency").value;

    list.push({ name, contactPerson: contact, email, phone, address, currency });
    localStorage.setItem("oban-vendors", JSON.stringify(list));
    
    addVendorForm.reset();
    if (addVendorDialog) addVendorDialog.close();
    renderVendors();
    alert(`Vendor ${name} added successfully.`);
  };
}

// Bind PO Buttons, Dynamic Rows & Form
const btnOpenAddPO = document.querySelector("#btnOpenAddPO");
const poVendorSelect = document.querySelector("#poVendor");
const poItemsContainer = document.querySelector("#poItemsContainer");
const btnAddPORow = document.querySelector("#btnAddPORow");

if (btnOpenAddPO && raisePODialog) {
  btnOpenAddPO.onclick = () => {
    // Populate vendors options dropdown
    const vendors = JSON.parse(localStorage.getItem("oban-vendors")) || [];
    if (poVendorSelect) {
      if (!vendors.length) {
        poVendorSelect.innerHTML = `<option value="">-- No vendors registered, add vendor first --</option>`;
      } else {
        poVendorSelect.innerHTML = vendors.map(v => `<option value="${v.name}">${v.name}</option>`).join("");
      }
    }

    // Set default date as today
    const dateInput = document.querySelector("#poDate");
    if (dateInput) dateInput.value = new Date().toISOString().split('T')[0];

    // Clear items row and seed first row
    if (poItemsContainer) {
      poItemsContainer.innerHTML = "";
      addPOItemRow();
    }
    raisePODialog.showModal();
  };
}

const closeRaisePOBtn = document.querySelector("#closeRaisePOBtn");
if (closeRaisePOBtn && raisePODialog) {
  closeRaisePOBtn.onclick = () => raisePODialog.close();
}

function addPOItemRow() {
  if (!poItemsContainer) return;
  const rowId = "po-row-" + Date.now();
  const div = document.createElement("div");
  div.id = rowId;
  div.className = "line-item";
  div.innerHTML = `
    <input type="text" placeholder="Item, e.g. linen fabric" aria-label="Item" required>
    <input type="number" placeholder="Qty" class="row-qty" min="1" value="1" aria-label="Quantity" required>
    <input type="number" placeholder="Unit \u20A6" class="row-price" aria-label="Unit price" required>
    <button type="button" class="act act-danger del-row-btn" aria-label="Remove item">${ICON("close")}</button>
  `;
  
  div.querySelector(".del-row-btn").onclick = () => {
    if (poItemsContainer.children.length > 1) {
      poItemsContainer.removeChild(div);
    } else {
      alert("Must keep at least one line item.");
    }
  };
  poItemsContainer.appendChild(div);
}

if (btnAddPORow) {
  btnAddPORow.onclick = () => addPOItemRow();
}

if (raisePOForm) {
  raisePOForm.onsubmit = (e) => {
    e.preventDefault();
    const vendors = JSON.parse(localStorage.getItem("oban-vendors")) || [];
    if (!vendors.length) {
      alert("Please add a vendor first.");
      return;
    }

    const list = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
    
    const date = document.querySelector("#poDate").value;
    const vendorName = document.querySelector("#poVendor").value;
    const deliveryDate = document.querySelector("#poDeliveryDate").value;
    
    // Parse rows
    const rows = poItemsContainer.querySelectorAll("div");
    const items = [];
    let grandTotal = 0;
    
    rows.forEach(row => {
      const inputs = row.querySelectorAll("input");
      const name = inputs[0].value.trim();
      const qty = +inputs[1].value;
      const price = +inputs[2].value;
      const total = qty * price;
      
      grandTotal += total;
      items.push({ name, qty, price, total });
    });

    const poId = "PO-2026-" + String(list.length + 1).padStart(3, "0");
    list.push({
      id: poId,
      date,
      vendorName,
      deliveryDate,
      amount: grandTotal,
      billed: "No",
      status: "Pending",
      items
    });
    
    localStorage.setItem("oban-purchase-orders", JSON.stringify(list));
    
    raisePOForm.reset();
    if (raisePODialog) raisePODialog.close();
    renderPurchaseOrdersList();
    alert(`Purchase Order ${poId} generated successfully.`);
  };
}

// Bind Attach Invoice Form
const closeUploadInvoiceBtn = document.querySelector("#closeUploadInvoiceBtn");
if (closeUploadInvoiceBtn && uploadInvoiceDialog) {
  closeUploadInvoiceBtn.onclick = () => uploadInvoiceDialog.close();
}
if (uploadInvoiceForm) {
  uploadInvoiceForm.onsubmit = (e) => {
    e.preventDefault();
    const id = document.querySelector("#uploadInvoicePoId").value;
    const fileInput = document.querySelector("#vendorInvoiceFile");
    
    const list = JSON.parse(localStorage.getItem("oban-purchase-orders")) || [];
    const poObj = list.find(x => x.id === id);
    if (poObj && fileInput.files[0]) {
      poObj.invoiceUrl = "assets/invoices/" + fileInput.files[0].name;
      localStorage.setItem("oban-purchase-orders", JSON.stringify(list));
      
      // Auto transition billing status on this PO to Yes
      poObj.billed = "Yes";
      localStorage.setItem("oban-purchase-orders", JSON.stringify(list));

      // Synchronize update to bills list
      const bills = JSON.parse(localStorage.getItem("oban-bills")) || [];
      const billObj = bills.find(x => x.poId === id);
      if (billObj) {
        billObj.status = "Paid"; // invoice loaded implies it has been settled/verified
        localStorage.setItem("oban-bills", JSON.stringify(bills));
      }
      
      uploadInvoiceForm.reset();
      if (uploadInvoiceDialog) uploadInvoiceDialog.close();
      renderPurchaseOrdersList();
      alert(`Invoice attached successfully for PO ${id}!`);
    }
  };
}

// -------------------------------------------------------------
// CUSTOMER INVOICES DIALOG
// -------------------------------------------------------------
const btnOpenRaiseInvoice = document.querySelector("#btnOpenRaiseInvoice");
const closeCustInvoiceBtn = document.querySelector("#closeCustInvoiceBtn");
const btnAddInvoiceRow = document.querySelector("#btnAddInvoiceRow");
const invoiceItemsContainer = document.querySelector("#invoiceItemsContainer");

if (btnOpenRaiseInvoice && raiseCustomerInvoiceDialog) {
  btnOpenRaiseInvoice.onclick = () => {
    if (invoiceItemsContainer) {
      invoiceItemsContainer.innerHTML = "";
      addInvoiceRow();
    }
    raiseCustomerInvoiceDialog.showModal();
  };
}
if (closeCustInvoiceBtn && raiseCustomerInvoiceDialog) {
  closeCustInvoiceBtn.onclick = () => raiseCustomerInvoiceDialog.close();
}
if (btnAddInvoiceRow) {
  btnAddInvoiceRow.onclick = () => addInvoiceRow();
}

function addInvoiceRow() {
  if (!invoiceItemsContainer) return;
  const rowId = "inv-row-" + Date.now();
  const div = document.createElement("div");
  div.id = rowId;
  div.className = "line-item";
  div.innerHTML = `
    <input type="text" placeholder="Description, e.g. cashmere kaftan" aria-label="Description" required>
    <input type="number" placeholder="Qty" min="1" value="1" aria-label="Quantity" required>
    <input type="number" placeholder="Amount \u20A6" aria-label="Amount" required>
    <button type="button" class="act act-danger del-row-btn" aria-label="Remove item">${ICON("close")}</button>
  `;
  div.querySelector(".del-row-btn").onclick = () => {
    if (invoiceItemsContainer.children.length > 1) {
      invoiceItemsContainer.removeChild(div);
    } else {
      alert("Must keep at least one line item.");
    }
  };
  invoiceItemsContainer.appendChild(div);
}

if (raiseCustomerInvoiceForm) {
  raiseCustomerInvoiceForm.onsubmit = (e) => {
    e.preventDefault();
    const allOrders = JSON.parse(localStorage.getItem("oban-orders")) || [];
    
    const name = document.querySelector("#custInvName").value.trim();
    const rawEmail = document.querySelector("#custInvEmail").value.trim();
    const email = rawEmail || (name.toLowerCase().replace(/[^a-z0-9]/g, "") + "@walkin.obanwears.com");
    const phone = document.querySelector("#custInvPhone").value.trim();
    const address = document.querySelector("#custInvAddress").value.trim();
    
    // Parse items
    const rows = invoiceItemsContainer.querySelectorAll("div");
    let description = "";
    let grandTotal = 0;
    
    rows.forEach((row, rIdx) => {
      const inputs = row.querySelectorAll("input");
      const desc = inputs[0].value.trim();
      const qty = +inputs[1].value;
      const amount = +inputs[2].value;
      
      grandTotal += (qty * amount);
      if (rIdx > 0) description += " + ";
      description += `${qty}x ${desc}`;
    });

    const ref = newOrderRef(allOrders);
    const today = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dateStr = `${months[today.getMonth()]} ${today.getDate()} ${today.getFullYear()}`;
    
    const payPctSelect = document.querySelector("#custInvPaymentPercentage");
    const paymentPercentage = payPctSelect ? +payPctSelect.value : 100;

    const fabricSelect = document.querySelector("#custInvFabric");
    const fabricSource = fabricSelect ? fabricSelect.value : "oban";

    const newOrder = {
      ref: ref,
      name: name,
      email: email,
      whatsapp: phone,
      piece: description,
      total: grandTotal,
      currentStage: 1, // Waiting for payment
      paymentPercentage: paymentPercentage,
      fabricSource: fabricSource,
      date: dateStr,
      notes: `Location: Custom invoice created. Billed Address: ${address}`
    };

    allOrders.unshift(newOrder);
    localStorage.setItem("oban-orders", JSON.stringify(allOrders));

    // Register customer spend profile
    const profiles = JSON.parse(localStorage.getItem("oban-client-profiles") || "{}");
    if (!profiles[email.toLowerCase()]) {
      profiles[email.toLowerCase()] = {
        email: email,
        name: name,
        whatsapp: phone,
        pin: "1234"
      };
      localStorage.setItem("oban-client-profiles", JSON.stringify(profiles));
    }
    
    raiseCustomerInvoiceForm.reset();
    if (raiseCustomerInvoiceDialog) raiseCustomerInvoiceDialog.close();
    renderDashboard();
    
    // Trigger direct print layout immediately
    if (window.generateDocumentPrint) {
      window.generateDocumentPrint(newOrder, "invoice");
    }
  };
}

// Sign-in and the first data load start from admin-sync.js.

// Newsletter Subscribers Management
function renderSubscribers() {
  const tableBody = document.querySelector("#subscribersTableBody");
  if (!tableBody) return;
  
  const subscribers = JSON.parse(localStorage.getItem("oban-subscribers") || "{}");
  const subList = Object.values(subscribers).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  if (subList.length === 0) {
    tableBody.innerHTML = `<tr><td colspan="3" class="empty">No subscribers yet.</td></tr>`;
    return;
  }
  
  tableBody.innerHTML = subList.map(sub => {
    const formattedDate = new Date(sub.timestamp).toLocaleString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    });
    return `
      <tr>
        <td><span class="cell-main">${escapeHtml(sub.email)}</span></td>
        <td>${formattedDate}</td>
        <td class="num"><button type="button" class="act act-danger delete-subscriber-btn" data-email="${escapeHtml(sub.email)}" title="Remove subscriber" aria-label="Remove ${escapeHtml(sub.email)}">${ICON("trash")}</button></td>
      </tr>
    `;
  }).join("");
  tableBody.querySelectorAll(".delete-subscriber-btn").forEach(btn => {
    btn.onclick = () => deleteSubscriber(btn.dataset.email);
  });
}

function deleteSubscriber(email) {
  if (!confirm(`Are you sure you want to delete subscriber "${email}"?`)) return;
  
  const subscribers = JSON.parse(localStorage.getItem("oban-subscribers") || "{}");
  delete subscribers[email];
  localStorage.setItem("oban-subscribers", JSON.stringify(subscribers));
  
  renderSubscribers();
}

function exportSubscribersToCSV() {
  const subscribers = JSON.parse(localStorage.getItem("oban-subscribers") || "{}");
  const subList = Object.values(subscribers).sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp));
  
  if (subList.length === 0) {
    alert("No subscribers to export.");
    return;
  }
  
  let csvContent = "Email Address,Subscription Date\n";
  subList.forEach(sub => {
    const cleanEmail = `"${sub.email.replace(/"/g, '""')}"`;
    const cleanDate = `"${sub.timestamp}"`;
    csvContent += `${cleanEmail},${cleanDate}\n`;
  });
  
  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.setAttribute("href", url);
  link.setAttribute("download", `oban_newsletter_subscribers_${Date.now()}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Bind Subscribers Export Button
const exportSubscribersBtn = document.querySelector("#exportSubscribersBtn");
if (exportSubscribersBtn) {
  exportSubscribersBtn.onclick = () => {
    exportSubscribersToCSV();
  };
}

// Expose deleteSubscriber to global scope explicitly just in case
window.deleteSubscriber = deleteSubscriber;

// Mobile menu collapsible sub-menus
(function() {
  function initCollapsibleMobileNav() {
    const mobileNav = document.querySelector("#mobileNav");
    if (!mobileNav) return;

    const normalizePath = (path) => path.replace(/\.html$/, "").replace(/^\//, "").split("/").pop() || "index";
    const currentClean = normalizePath(window.location.pathname);

    const menuData = [
      { type: "link", label: "Home", href: "/" },
      { type: "link", label: "About", href: "about" },
      {
        type: "submenu",
        label: "Shop",
        items: [
          { label: "Shop All", href: "shop" },
          { label: "Kaftans", href: "kaftans" },
          { label: "Agbada", href: "agbada" },
          { label: "Suits", href: "suits" },
          { label: "Father & Son", href: "father-son" }
        ]
      },
      { type: "link", label: "Blog", href: "blog" },
      { type: "link", label: "Contact", href: "contact" },
      { type: "link", label: "FAQ", href: "faq" },
      {
        type: "submenu",
        label: "My Profile",
        items: [
          { label: "My Profile", href: "profile" },
          { label: "Track Order", href: "tracker" }
        ]
      }
    ];

    let html = "";
    menuData.forEach((item, index) => {
      if (item.type === "link") {
        const isActive = normalizePath(item.href) === currentClean ? 'class="active-page"' : '';
        html += `<a href="${item.href}" ${isActive}>${item.label}</a>`;
      } else if (item.type === "submenu") {
        const hasActiveChild = item.items.some(child => normalizePath(child.href) === currentClean);
        const activeClass = hasActiveChild ? "active-page" : "";
        
        let submenuHtml = "";
        item.items.forEach(child => {
          const isChildActive = normalizePath(child.href) === currentClean ? 'class="active-page"' : '';
          submenuHtml += `<a href="${child.href}" ${isChildActive} style="padding-left: 20px; font-size: 11px; opacity: 0.85; display: block; margin: 5px 0;">${child.label}</a>`;
        });

        html += `
          <div class="mobile-nav-group" style="display: flex; flex-direction: column; gap: 8px; width: 100%;">
            <button class="mobile-nav-trigger ${activeClass}" data-group-index="${index}" style="background: transparent; border: none; text-align: left; padding: 0; font-size: 12px; font-weight: 500; cursor: pointer; color: inherit; display: flex; justify-content: space-between; align-items: center; width: 100%;">
              <span>${item.label}</span>
              <span class="trigger-icon" style="transition: transform 0.25s; font-size: 12px; font-weight: bold; margin-left: 5px;">${hasActiveChild ? "-" : "+"}</span>
            </button>
            <div class="mobile-nav-submenu" style="display: ${hasActiveChild ? "flex" : "none"}; flex-direction: column; gap: 8px; margin-top: 5px; border-left: 1px solid var(--line); padding-left: 10px; width: 100%;">
              ${submenuHtml}
            </div>
          </div>
        `;
      }
    });

    mobileNav.innerHTML = html;

    // Bind triggers
    mobileNav.querySelectorAll(".mobile-nav-trigger").forEach(btn => {
      btn.onclick = (e) => {
        e.preventDefault();
        e.stopPropagation();
        const group = btn.closest(".mobile-nav-group");
        const submenu = group.querySelector(".mobile-nav-submenu");
        const icon = btn.querySelector(".trigger-icon");
        const isVisible = submenu.style.display === "flex";
        
        submenu.style.display = isVisible ? "none" : "flex";
        icon.textContent = isVisible ? "+" : "-";
      };
    });

    // Close menu on sub-link click
    mobileNav.querySelectorAll("a").forEach(a => {
      a.addEventListener("click", () => {
        const menuButton = document.querySelector("#menuButton");
        mobileNav.classList.remove("open");
        if (menuButton) menuButton.setAttribute("aria-expanded", "false");
      });
    });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCollapsibleMobileNav);
  } else {
    initCollapsibleMobileNav();
  }
})();

// Saving and loading data is handled by admin-sync.js (per-record server sync).
